const grid = document.getElementById("organ-grid");
const searchInput = document.getElementById("search");
const aboutOpen = document.getElementById("about-open");
const aboutModal = document.getElementById("about-modal");
const aboutClose = document.getElementById("about-close");
const aboutOk = document.getElementById("about-ok");

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

function filterAndRender() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  if (!query) {
    render(ORGANS);
    return;
  }
  const filtered = ORGANS.filter(o => {
    const idName = o.nama.toLowerCase();
    const enName = o.en && o.en.nama ? o.en.nama.toLowerCase() : "";
    return idName.includes(query) || enName.includes(query);
  });
  render(filtered);
}

filterAndRender();

if (searchInput) {
  searchInput.addEventListener("input", filterAndRender);
}

document.addEventListener("ar-lang-change", () => {
  if (typeof t === "function") {
    document.title = t("homeTitle");
  }
  filterAndRender();
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
