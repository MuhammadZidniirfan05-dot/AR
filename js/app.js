const grid = document.getElementById("organ-grid");
const searchInput = document.getElementById("search");
const aboutOpen = document.getElementById("about-open");
const aboutModal = document.getElementById("about-modal");
const aboutClose = document.getElementById("about-close");
const aboutOk = document.getElementById("about-ok");

function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => `
      <a class="card" href="organ.html?id=${o.id}">
        <div class="card-media">
          <img class="card-img" src="${o.poster}" alt="${o.nama}" loading="lazy" width="300" height="300">
        </div>
        <div class="card-body">
          <div class="card-meta">
            <h2>${o.nama}</h2>
            <span class="card-arrow" aria-hidden="true">&rarr;</span>
          </div>
          <p>${o.ringkas}</p>
        </div>
      </a>`).join("")
    : '<p class="empty-state">Organ tidak ditemukan.</p>';
}

render(ORGANS);

searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase().trim();
  render(ORGANS.filter(o => o.nama.toLowerCase().includes(query)));
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
