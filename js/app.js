const grid = document.getElementById("organ-grid");
const searchInput = document.getElementById("search");

function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => `
      <a class="card" href="organ.html?id=${o.id}">
        <img class="card-img" src="${o.poster}" alt="${o.nama}" loading="lazy" width="300" height="300">
        <div class="card-body">
          <h2>${o.nama}</h2>
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
