const grid = document.getElementById("organ-grid");
const searchInput = document.getElementById("search");
const aboutOpen = document.getElementById("about-open");
const aboutModal = document.getElementById("about-modal");
const aboutClose = document.getElementById("about-close");
const aboutOk = document.getElementById("about-ok");

const btnViewGrid = document.getElementById("btn-view-grid");
const btnViewMap = document.getElementById("btn-view-map");
const bodyMapSection = document.getElementById("body-map-section");
const bodyMapPins = document.getElementById("body-map-pins");
const bodyMapQuicklist = document.getElementById("body-map-quicklist");
const mapPreviewImg = document.getElementById("map-preview-img");
const mapPreviewLocation = document.getElementById("map-preview-location");
const mapPreviewName = document.getElementById("map-preview-name");
const mapPreviewDesc = document.getElementById("map-preview-desc");
const mapPreviewFact = document.getElementById("map-preview-fact");
const mapPreviewOpen = document.getElementById("map-preview-open");
const mapPreviewCompare = document.getElementById("map-preview-compare");

const BODY_MAP_COORDS = {
  otak: { x: 50, y: 10, locKey: "locBrain" },
  "paru-paru": { x: 40, y: 31, locKey: "locLungs" },
  jantung: { x: 54, y: 34, locKey: "locHeart" },
  hati: { x: 41, y: 45, locKey: "locLiver" },
  lambung: { x: 57, y: 47, locKey: "locStomach" },
  ginjal: { x: 47, y: 56, locKey: "locKidneys" }
};

function readSavedView() {
  try {
    const saved = localStorage.getItem("ar-organ-home-view");
    if (saved === "map" || saved === "grid") {
      return saved;
    }
  } catch (err) {
    // Abaikan jika localStorage tidak tersedia
  }
  return "grid";
}

let activeView = readSavedView();
let selectedMapOrganId = ORGANS[0] ? ORGANS[0].id : "jantung";
const pinBtnMap = {};
const quickBtnMap = {};

function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => {
        const text = typeof getOrganText === "function" ? getOrganText(o) : o;
        return `
      <a class="card" href="organ.html?id=${o.id}">
        <div class="card-media">
          <img class="card-img" src="${o.poster}" alt="${text.nama}" loading="lazy" width="300" height="300">
        </div>
        <div class="card-body">
          <div class="card-meta">
            <h2>${text.nama}</h2>
            <span class="card-arrow" aria-hidden="true">&rarr;</span>
          </div>
          <p>${text.ringkas}</p>
        </div>
      </a>`;
      }).join("")
    : `<p class="empty-state">${typeof t === "function" ? t("emptyOrgan") : "Organ tidak ditemukan."}</p>`;
}

function selectMapOrgan(organId) {
  const target = ORGANS.find(o => o.id === organId) || ORGANS[0];
  if (!target) {
    return;
  }
  selectedMapOrganId = target.id;
  const text = typeof getOrganText === "function" ? getOrganText(target) : target;
  const coord = BODY_MAP_COORDS[target.id];

  Object.keys(pinBtnMap).forEach(id => {
    const isCurrent = id === target.id;
    pinBtnMap[id].btn.classList.toggle("is-active", isCurrent);
    pinBtnMap[id].btn.setAttribute("aria-pressed", String(isCurrent));
  });

  Object.keys(quickBtnMap).forEach(id => {
    const isCurrent = id === target.id;
    quickBtnMap[id].classList.toggle("is-active", isCurrent);
    quickBtnMap[id].setAttribute("aria-pressed", String(isCurrent));
  });

  const svgOrgans = document.querySelectorAll(".svg-organ");
  svgOrgans.forEach(el => {
    const isCurrent = el.getAttribute("data-svg-organ") === target.id;
    el.classList.toggle("is-active", isCurrent);
  });

  if (mapPreviewImg) {
    mapPreviewImg.src = target.poster;
    mapPreviewImg.alt = text.nama;
  }
  if (mapPreviewLocation) {
    mapPreviewLocation.textContent =
      coord && typeof t === "function" ? t(coord.locKey) : "";
  }
  if (mapPreviewName) {
    mapPreviewName.textContent = text.nama;
  }
  if (mapPreviewDesc) {
    mapPreviewDesc.textContent = text.deskripsi;
  }
  if (mapPreviewFact) {
    mapPreviewFact.textContent = text.fakta;
  }
  if (mapPreviewOpen) {
    mapPreviewOpen.href = `organ.html?id=${target.id}`;
  }
  if (mapPreviewCompare) {
    mapPreviewCompare.href = `compare.html?a=${target.id}`;
  }
}

function initBodyMap() {
  if (!bodyMapPins || !bodyMapQuicklist) {
    return;
  }
  bodyMapPins.innerHTML = "";
  bodyMapQuicklist.innerHTML = "";

  ORGANS.forEach(organ => {
    const coord = BODY_MAP_COORDS[organ.id] || { x: 50, y: 50, locKey: "" };
    const text = typeof getOrganText === "function" ? getOrganText(organ) : organ;

    const pin = document.createElement("button");
    pin.type = "button";
    pin.className = "body-pin";
    pin.style.left = `${coord.x}%`;
    pin.style.top = `${coord.y}%`;
    pin.dataset.organId = organ.id;
    pin.setAttribute(
      "aria-label",
      typeof t === "function" ? t("bodyMapPinAria", { name: text.nama }) : text.nama
    );
    pin.setAttribute("aria-pressed", "false");

    const dot = document.createElement("span");
    dot.className = "body-pin-dot";
    dot.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "body-pin-label";
    label.textContent = text.nama;

    pin.appendChild(dot);
    pin.appendChild(label);
    pin.addEventListener("click", () => selectMapOrgan(organ.id));
    pin.addEventListener("focus", () => selectMapOrgan(organ.id));
    bodyMapPins.appendChild(pin);
    pinBtnMap[organ.id] = { btn: pin, labelEl: label };

    const quickBtn = document.createElement("button");
    quickBtn.type = "button";
    quickBtn.className = "body-quick-btn";
    quickBtn.textContent = text.nama;
    quickBtn.setAttribute("aria-pressed", "false");
    quickBtn.addEventListener("click", () => selectMapOrgan(organ.id));
    quickBtn.addEventListener("focus", () => selectMapOrgan(organ.id));
    bodyMapQuicklist.appendChild(quickBtn);
    quickBtnMap[organ.id] = quickBtn;
  });

  const svgOrgans = document.querySelectorAll(".svg-organ");
  svgOrgans.forEach(el => {
    const organId = el.getAttribute("data-svg-organ");
    if (organId) {
      el.addEventListener("click", () => selectMapOrgan(organId));
    }
  });

  selectMapOrgan(selectedMapOrganId);
}

function refreshBodyMapTranslations() {
  ORGANS.forEach(organ => {
    const text = typeof getOrganText === "function" ? getOrganText(organ) : organ;
    if (pinBtnMap[organ.id]) {
      pinBtnMap[organ.id].labelEl.textContent = text.nama;
      pinBtnMap[organ.id].btn.setAttribute(
        "aria-label",
        typeof t === "function" ? t("bodyMapPinAria", { name: text.nama }) : text.nama
      );
    }
    if (quickBtnMap[organ.id]) {
      quickBtnMap[organ.id].textContent = text.nama;
    }
  });
  selectMapOrgan(selectedMapOrganId);
}

function applyViewMode(mode, persist = true) {
  activeView = mode === "map" ? "map" : "grid";
  if (persist) {
    try {
      localStorage.setItem("ar-organ-home-view", activeView);
    } catch (err) {
      // Abaikan jika localStorage tidak tersedia
    }
  }
  const isMap = activeView === "map";
  if (grid) {
    grid.hidden = isMap;
  }
  if (bodyMapSection) {
    bodyMapSection.hidden = !isMap;
  }
  if (btnViewGrid) {
    btnViewGrid.classList.toggle("is-active", !isMap);
    btnViewGrid.setAttribute("aria-pressed", String(!isMap));
  }
  if (btnViewMap) {
    btnViewMap.classList.toggle("is-active", isMap);
    btnViewMap.setAttribute("aria-pressed", String(isMap));
  }
}

function filterAndRender() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const filtered = !query
    ? ORGANS
    : ORGANS.filter(o => {
        const idName = o.nama.toLowerCase();
        const enName = o.en && o.en.nama ? o.en.nama.toLowerCase() : "";
        return idName.includes(query) || enName.includes(query);
      });

  render(filtered);

  const matchedIds = new Set(filtered.map(o => o.id));
  ORGANS.forEach(o => {
    const isDimmed = Boolean(query) && !matchedIds.has(o.id);
    if (pinBtnMap[o.id]) {
      pinBtnMap[o.id].btn.classList.toggle("is-dimmed", isDimmed);
    }
    if (quickBtnMap[o.id]) {
      quickBtnMap[o.id].classList.toggle("is-dimmed", isDimmed);
    }
  });

  if (query && filtered.length > 0 && !matchedIds.has(selectedMapOrganId)) {
    selectMapOrgan(filtered[0].id);
  }
}

initBodyMap();
applyViewMode(activeView, false);
filterAndRender();

if (btnViewGrid) {
  btnViewGrid.addEventListener("click", () => applyViewMode("grid", true));
}
if (btnViewMap) {
  btnViewMap.addEventListener("click", () => applyViewMode("map", true));
}

if (searchInput) {
  searchInput.addEventListener("input", filterAndRender);
}

document.addEventListener("ar-lang-change", () => {
  if (typeof t === "function") {
    document.title = t("homeTitle");
  }
  filterAndRender();
  refreshBodyMapTranslations();
});

function openAboutModal() {
  if (!aboutModal) {
    return;
  }
  aboutModal.hidden = false;
  if (aboutClose) {
    aboutClose.focus();
  }
}

function closeAboutModal() {
  if (!aboutModal || aboutModal.hidden) {
    return;
  }
  aboutModal.hidden = true;
  if (aboutOpen) {
    aboutOpen.focus();
  }
}

if (aboutOpen && aboutModal) {
  aboutOpen.addEventListener("click", openAboutModal);
  if (aboutClose) {
    aboutClose.addEventListener("click", closeAboutModal);
  }
  if (aboutOk) {
    aboutOk.addEventListener("click", closeAboutModal);
  }
  aboutModal.addEventListener("click", e => {
    if (e.target.dataset.closeModal === "true") {
      closeAboutModal();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !aboutModal.hidden) {
      closeAboutModal();
    }
  });
}
