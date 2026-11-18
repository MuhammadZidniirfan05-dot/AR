const grid = document.getElementById("organ-grid");
const searchInput = document.getElementById("search");
const progressBanner = document.getElementById("progress-banner");

function getLearnedOrgans() {
  try {
    const saved = JSON.parse(localStorage.getItem("ar-organ-learned") || "[]");
    if (!Array.isArray(saved)) {
      return [];
    }
    return saved.filter(id => ORGANS.some(o => o.id === id));
  } catch (err) {
    return [];
  }
}

const learnedIds = getLearnedOrgans();

function renderProgress() {
  if (!progressBanner) {
    return;
  }
  const total = ORGANS.length;
  const done = learnedIds.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  progressBanner.innerHTML = `
    <div class="progress-banner-top">
      <span>Progres Eksplorasi: <strong>${done} / ${total} organ</strong> dipelajari</span>
      <span>${percent}%</span>
    </div>
    <div class="progress-track" aria-hidden="true">
      <div class="progress-fill-bar" style="width: ${percent}%"></div>
    </div>
  `;
}

function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => {
      const isLearned = learnedIds.includes(o.id);
      const badge = isLearned
        ? '<span class="badge-learned">Sudah Dipelajari</span>'
        : "";
      return `
      <a class="card" href="organ.html?id=${o.id}">
        <img class="card-img" src="${o.poster}" alt="${o.nama}" loading="lazy" width="300" height="300">
        <div class="card-body">
          <div class="card-title-row">
            <h2>${o.nama}</h2>
            ${badge}
          </div>
          <p>${o.ringkas}</p>
        </div>
      </a>`;
    }).join("")
    : '<p class="empty-state">Organ tidak ditemukan.</p>';
}

renderProgress();
render(ORGANS);

searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase().trim();
  render(ORGANS.filter(o => o.nama.toLowerCase().includes(query)));
});
