const params = new URLSearchParams(location.search);
const organId = params.get("id");
const organ = ORGANS.find(item => item.id === organId);

if (!organ) {
  location.replace("404.html");
} else {
  const mv = document.getElementById("mv");
  const progressBar = mv.querySelector(".progress");
  const progressFill = mv.querySelector(".progress-fill");

  mv.setAttribute("src", organ.model);
  mv.setAttribute("poster", organ.poster);
  mv.setAttribute("alt", `Model 3D ${organ.nama}`);
  if (organ.modelIos) {
    mv.setAttribute("ios-src", organ.modelIos);
  }

  mv.addEventListener("progress", event => {
    const percent = Math.round(event.detail.totalProgress * 100);
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }
    if (progressBar && event.detail.totalProgress >= 1) {
      progressBar.classList.add("hide");
    }
  });

  document.title = `${organ.nama} | AR Organ Tubuh`;
  document.getElementById("nama").textContent = organ.nama;
  document.getElementById("deskripsi").textContent = organ.deskripsi;
  document.getElementById("fakta").textContent = organ.fakta;

  const fungsiList = document.getElementById("fungsi");
  organ.fungsi.forEach(teks => {
    const li = document.createElement("li");
    li.textContent = teks;
    fungsiList.appendChild(li);
  });

  const kreditSection = document.getElementById("kredit");
  kreditSection.innerHTML = `
    <h2>Kredit Model 3D</h2>
    <p><strong>Judul:</strong> ${organ.kredit.judul}</p>
    <p><strong>Pembuat:</strong> ${organ.kredit.pembuat}</p>
    <p><strong>Lisensi:</strong> ${organ.kredit.lisensi}</p>
    <p><strong>Sumber:</strong> <a href="${organ.kredit.sumber}" target="_blank" rel="noopener noreferrer">${organ.kredit.sumber}</a></p>
  `;

  const infoPanel = document.getElementById("info");
  const infoTitle = document.getElementById("info-title");
  const infoText = document.getElementById("info-text");
  const infoClose = document.getElementById("info-close");
  let activeButton = null;

  function hideInfo() {
    infoPanel.hidden = true;
    if (activeButton) {
      activeButton.classList.remove("active");
      activeButton = null;
    }
  }

  function showInfo(hotspot, button) {
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    activeButton = button;
    activeButton.classList.add("active");
    infoTitle.textContent = hotspot.label;
    infoText.textContent = hotspot.info;
    infoPanel.hidden = false;
  }

  infoClose.addEventListener("click", () => {
    const lastButton = activeButton;
    hideInfo();
    if (lastButton) {
      lastButton.focus();
    }
  });

  organ.hotspots.forEach(h => {
    const b = document.createElement("button");
    b.type = "button";
    b.slot = `hotspot-${h.id}`;
    b.className = "hotspot";
    b.dataset.position = h.position;
    b.dataset.normal = h.normal;
    b.setAttribute("aria-label", h.label);

    const label = document.createElement("span");
    label.className = "hotspot-label";
    label.textContent = h.label;
    b.appendChild(label);

    b.addEventListener("click", () => showInfo(h, b));
    mv.appendChild(b);
  });
}
