const glossarySearch = document.getElementById("glossary-search");
const glossaryFilters = document.getElementById("glossary-filters");
const glossaryCount = document.getElementById("glossary-count");
const glossaryGrid = document.getElementById("glossary-grid");

const params = new URLSearchParams(location.search);
const organParam = params.get("organ");
const validInitialOrgan = ORGANS.find(o => o.id === organParam);

let selectedOrganId = validInitialOrgan ? validInitialOrgan.id : "all";
let activeSpeakingId = null;
let activeSpeakButton = null;
const filterBtnMap = {};
const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

function stopGlossarySpeech() {
  if (canSpeak && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  if (activeSpeakButton) {
    activeSpeakButton.textContent = t("glossarySpeak");
    activeSpeakButton.classList.remove("is-speaking");
    activeSpeakButton.setAttribute("aria-pressed", "false");
    activeSpeakButton = null;
  }
  activeSpeakingId = null;
}

function speakGlossaryItem(itemText, btn) {
  if (!canSpeak) {
    return;
  }
  if (activeSpeakingId === itemText.id && window.speechSynthesis.speaking) {
    stopGlossarySpeech();
    return;
  }

  stopGlossarySpeech();

  const utterance = new SpeechSynthesisUtterance(
    `${itemText.istilah}. ${itemText.definisi}`
  );
  utterance.lang = getCurrentLang() === "en" ? "en-US" : "id-ID";
  utterance.onend = () => {
    if (activeSpeakingId === itemText.id) {
      stopGlossarySpeech();
    }
  };
  utterance.onerror = () => {
    if (activeSpeakingId === itemText.id) {
      stopGlossarySpeech();
    }
  };

  activeSpeakingId = itemText.id;
  activeSpeakButton = btn;
  btn.textContent = t("glossaryStop");
  btn.classList.add("is-speaking");
  btn.setAttribute("aria-pressed", "true");
  window.speechSynthesis.speak(utterance);
}

function updateUrlParam() {
  const nextUrl =
    selectedOrganId === "all"
      ? location.pathname
      : `${location.pathname}?organ=${encodeURIComponent(selectedOrganId)}`;
  try {
    history.replaceState(null, "", nextUrl);
  } catch (err) {
    // Abaikan jika history.replaceState dibatasi
  }
}

function renderFilterChips() {
  if (!glossaryFilters) {
    return;
  }
  glossaryFilters.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "glossary-filter-btn";
  allBtn.addEventListener("click", () => {
    selectedOrganId = "all";
    updateUrlParam();
    updateFilterButtonStates();
    renderGlossary();
  });
  glossaryFilters.appendChild(allBtn);
  filterBtnMap.all = allBtn;

  ORGANS.forEach(organ => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "glossary-filter-btn";
    btn.addEventListener("click", () => {
      selectedOrganId = organ.id;
      updateUrlParam();
      updateFilterButtonStates();
      renderGlossary();
    });
    glossaryFilters.appendChild(btn);
    filterBtnMap[organ.id] = btn;
  });

  updateFilterChipLabels();
  updateFilterButtonStates();
}

function updateFilterChipLabels() {
  if (filterBtnMap.all) {
    filterBtnMap.all.textContent = `${t("glossaryFilterAll")} (${GLOSSARY.length})`;
  }
  ORGANS.forEach(organ => {
    const btn = filterBtnMap[organ.id];
    if (btn) {
      const organText = getOrganText(organ);
      const count = GLOSSARY.filter(item => item.organId === organ.id).length;
      btn.textContent = `${organText.nama} (${count})`;
    }
  });
}

function updateFilterButtonStates() {
  Object.keys(filterBtnMap).forEach(key => {
    const isCurrent = key === selectedOrganId;
    filterBtnMap[key].classList.toggle("is-active", isCurrent);
    filterBtnMap[key].setAttribute("aria-pressed", String(isCurrent));
  });
}

function getFilteredGlossary() {
  const query = glossarySearch ? glossarySearch.value.toLowerCase().trim() : "";
  const activeLang = getCurrentLang();

  const matched = GLOSSARY.filter(item => {
    if (selectedOrganId !== "all" && item.organId !== selectedOrganId) {
      return false;
    }
    if (!query) {
      return true;
    }
    const idTerm = item.istilah.toLowerCase();
    const idDef = item.definisi.toLowerCase();
    const enTerm = item.en && item.en.istilah ? item.en.istilah.toLowerCase() : "";
    const enDef = item.en && item.en.definisi ? item.en.definisi.toLowerCase() : "";
    return (
      idTerm.includes(query) ||
      idDef.includes(query) ||
      enTerm.includes(query) ||
      enDef.includes(query)
    );
  });

  return matched.slice().sort((a, b) => {
    const textA = getGlossaryText(a, activeLang);
    const textB = getGlossaryText(b, activeLang);
    return textA.istilah.localeCompare(textB.istilah, activeLang);
  });
}

function renderGlossary() {
  stopGlossarySpeech();
  const filtered = getFilteredGlossary();

  if (glossaryCount) {
    glossaryCount.textContent = t("glossaryCount", {
      shown: filtered.length,
      total: GLOSSARY.length
    });
  }

  if (!glossaryGrid) {
    return;
  }
  glossaryGrid.innerHTML = "";

  if (filtered.length === 0) {
    const emptyBox = document.createElement("div");
    emptyBox.className = "glossary-empty";

    const msg = document.createElement("p");
    msg.textContent = t("glossaryEmpty");

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "btn-quiz";
    resetBtn.textContent = t("glossaryResetBtn");
    resetBtn.addEventListener("click", () => {
      if (glossarySearch) {
        glossarySearch.value = "";
      }
      selectedOrganId = "all";
      updateUrlParam();
      updateFilterButtonStates();
      renderGlossary();
    });

    emptyBox.appendChild(msg);
    emptyBox.appendChild(resetBtn);
    glossaryGrid.appendChild(emptyBox);
    return;
  }

  filtered.forEach(item => {
    const itemText = getGlossaryText(item);
    const organ = ORGANS.find(o => o.id === item.organId);
    const organText = organ ? getOrganText(organ) : { nama: item.organId };

    const card = document.createElement("article");
    card.className = "glossary-card";

    const topRow = document.createElement("div");
    topRow.className = "glossary-card-top";

    const badge = document.createElement("a");
    badge.className = "glossary-organ-badge";
    badge.href = `organ.html?id=${item.organId}`;
    badge.textContent = organText.nama;
    topRow.appendChild(badge);

    if (canSpeak) {
      const speakBtn = document.createElement("button");
      speakBtn.type = "button";
      speakBtn.className = "glossary-speak-btn";
      speakBtn.textContent = t("glossarySpeak");
      speakBtn.setAttribute("aria-pressed", "false");
      speakBtn.setAttribute(
        "aria-label",
        t("glossarySpeakAria", { term: itemText.istilah })
      );
      speakBtn.addEventListener("click", () =>
        speakGlossaryItem(itemText, speakBtn)
      );
      topRow.appendChild(speakBtn);
    }

    const title = document.createElement("h2");
    title.className = "glossary-term";
    title.textContent = itemText.istilah;

    const def = document.createElement("p");
    def.className = "glossary-def";
    def.textContent = itemText.definisi;

    const footer = document.createElement("div");
    footer.className = "glossary-card-footer";

    const openLink = document.createElement("a");
    openLink.className = "glossary-open-link";
    openLink.href = `organ.html?id=${item.organId}`;
    openLink.textContent = t("glossaryOpenOrgan");
    footer.appendChild(openLink);

    card.appendChild(topRow);
    card.appendChild(title);
    card.appendChild(def);
    card.appendChild(footer);
    glossaryGrid.appendChild(card);
  });
}

renderFilterChips();
renderGlossary();

if (glossarySearch) {
  glossarySearch.addEventListener("input", renderGlossary);
}

document.addEventListener("ar-lang-change", () => {
  document.title = t("glossaryTitle");
  updateFilterChipLabels();
  renderGlossary();
});

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", stopGlossarySpeech);
  window.addEventListener("beforeunload", stopGlossarySpeech);

  const readingProgress = document.getElementById("reading-progress");
  if (readingProgress) {
    const updateReadingProgress = () => {
      const docEl = document.documentElement;
      const scrollTop = window.scrollY || docEl.scrollTop || 0;
      const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(100, Math.round((scrollTop / scrollHeight) * 100)) : 0;
      readingProgress.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", updateReadingProgress, { passive: true });
    updateReadingProgress();
  }
}
