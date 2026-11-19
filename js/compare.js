const selectA = document.getElementById("select-a");
const selectB = document.getElementById("select-b");
const btnSwap = document.getElementById("btn-swap");
const relationTitle = document.getElementById("relation-title");
const relationText = document.getElementById("relation-text");

const RELATIONS = {
  "jantung|paru-paru": "Jantung dan paru-paru bekerja sama erat dalam sirkulasi pulmonal: bilik kanan jantung memompa darah miskin oksigen ke paru-paru untuk ditukar dengan oksigen, lalu darah kaya oksigen mengalir kembali ke jantung untuk dipompa ke seluruh tubuh.",
  "jantung|otak": "Jantung memompa sekitar 15–20% curah darah beroksigen langsung menuju otak setiap menit, sementara batang otak mengatur irama detak jantung secara otomatis melalui sistem saraf otonom.",
  "jantung|lambung": "Saat lambung mencerna makanan, jantung meningkatkan aliran darah menuju saluran pencernaan untuk membantu proses pemecahan dan penyerapan nutrisi.",
  "ginjal|jantung": "Jantung memompa darah melewati ginjal agar kotoran tersaring, sementara ginjal mengatur volume cairan dan hormon yang menjaga tekanan darah jantung tetap normal.",
  "hati|jantung": "Hati menerima darah yang telah menyerap nutrisi dari saluran pencernaan dan menyaringnya terlebih dahulu sebelum darah tersebut dialirkan kembali menuju jantung.",
  "otak|paru-paru": "Paru-paru menyuplai oksigen yang sangat dibutuhkan sel saraf otak, sedangkan pusat pernapasan di batang otak mengatur cepat-lambatnya tarikan napas secara otomatis.",
  "lambung|paru-paru": "Oksigen yang diserap paru-paru digunakan oleh sel-sel otot dinding lambung untuk menghasilkan energi saat mengaduk dan mencerna makanan.",
  "ginjal|paru-paru": "Paru-paru dan ginjal bekerja sama menjaga keseimbangan asam-basa (pH) darah: paru-paru mengatur pembuangan gas karbon dioksida, sedangkan ginjal mengatur kadar asam dan mineral dalam urine.",
  "hati|paru-paru": "Paru-paru menyuplai oksigen melalui peredaran darah ke hati agar sel-sel hati dapat melakukan ratusan proses metabolisme dan detoksifikasi racun.",
  "lambung|otak": "Otak dan lambung terhubung melalui saraf vagus: otak mengatur produksi asam lambung dan rasa lapar, sementara kondisi lambung juga mengirim sinyal kenyang ke otak.",
  "ginjal|otak": "Otak mengeluarkan hormon antidiuretik (ADH) untuk memberi tahu ginjal berapa banyak air yang harus disimpan atau dikeluarkan sebagai urine agar tubuh tidak dehidrasi.",
  "hati|otak": "Hati menjaga kadar gula darah (glukosa) tetap stabil sebagai sumber energi utama bagi otak serta menyaring racun amonia agar tidak merusak sel saraf otak.",
  "ginjal|lambung": "Lambung mencerna makanan dan minuman yang masuk ke tubuh, sedangkan ginjal menyaring sisa metabolisme nutrisi serta kelebihan air tersebut dari darah.",
  "hati|lambung": "Makanan yang telah dihaluskan oleh lambung masuk ke usus halus dan dicerna lebih lanjut dengan bantuan cairan empedu yang diproduksi oleh hati.",
  "ginjal|hati": "Hati mengubah zat sisa beracun (seperti amonia) menjadi urea yang lebih aman di dalam darah, lalu ginjal menyaring urea tersebut dan membuangnya bersama urine."
};

function populateSelects() {
  ORGANS.forEach(organ => {
    const optA = document.createElement("option");
    optA.value = organ.id;
    optA.textContent = organ.nama;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = organ.id;
    optB.textContent = organ.nama;
    selectB.appendChild(optB);
  });
}

function attachProgressListener(mv) {
  const progressBar = mv.querySelector(".progress");
  const progressFill = mv.querySelector(".progress-fill");
  mv.addEventListener("progress", event => {
    const percent = Math.round(event.detail.totalProgress * 100);
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }
    if (progressBar) {
      if (event.detail.totalProgress >= 1) {
        progressBar.classList.add("hide");
      } else {
        progressBar.classList.remove("hide");
      }
    }
  });
}

function renderColumn(suffix, organ) {
  const mv = document.getElementById(`mv-${suffix}`);
  if (mv.getAttribute("src") !== organ.model) {
    const progressBar = mv.querySelector(".progress");
    const progressFill = mv.querySelector(".progress-fill");
    if (progressFill) {
      progressFill.style.width = "0%";
    }
    if (progressBar) {
      progressBar.classList.remove("hide");
    }
    mv.setAttribute("src", organ.model);
    mv.setAttribute("poster", organ.poster);
    mv.setAttribute("alt", `Model 3D ${organ.nama}`);
  }

  document.getElementById(`nama-${suffix}`).textContent = organ.nama;
  document.getElementById(`link-${suffix}`).href = `organ.html?id=${organ.id}`;
  document.getElementById(`ringkas-${suffix}`).textContent = organ.deskripsi;
  document.getElementById(`fakta-${suffix}`).textContent = organ.fakta;

  const fungsiEl = document.getElementById(`fungsi-${suffix}`);
  fungsiEl.innerHTML = "";
  organ.fungsi.forEach(teks => {
    const li = document.createElement("li");
    li.textContent = teks;
    fungsiEl.appendChild(li);
  });

  const penyakitEl = document.getElementById(`penyakit-${suffix}`);
  penyakitEl.innerHTML = "";
  if (Array.isArray(organ.penyakit)) {
    organ.penyakit.forEach(item => {
      const card = document.createElement("div");
      card.className = "disease-item";
      const title = document.createElement("strong");
      title.textContent = item.nama;
      const desc = document.createElement("p");
      desc.textContent = item.info;
      card.appendChild(title);
      card.appendChild(desc);
      penyakitEl.appendChild(card);
    });
  }

  const tipsEl = document.getElementById(`tips-${suffix}`);
  tipsEl.innerHTML = "";
  if (Array.isArray(organ.tipsSehat)) {
    organ.tipsSehat.forEach(teks => {
      const li = document.createElement("li");
      li.textContent = teks;
      tipsEl.appendChild(li);
    });
  }
}

function updateRelation(organA, organB) {
  if (organA.id === organB.id) {
    relationTitle.textContent = `Perbandingan: ${organA.nama}`;
    relationText.textContent = "Kamu sedang memilih organ yang sama di kedua kolom. Pilih organ yang berbeda pada salah satu menu di atas untuk melihat perbandingan dan hubungan kerja samanya.";
    return;
  }

  const pairKey = [organA.id, organB.id].sort().join("|");
  relationTitle.textContent = `Hubungan Kerja Sama: ${organA.nama} & ${organB.nama}`;
  relationText.textContent =
    RELATIONS[pairKey] ||
    `${organA.nama} dan ${organB.nama} saling mendukung dalam menjaga keseimbangan sistem organ tubuh manusia.`;
}

function updateComparison() {
  const organA = ORGANS.find(o => o.id === selectA.value) || ORGANS[0];
  const organB = ORGANS.find(o => o.id === selectB.value) || ORGANS[1];

  renderColumn("a", organA);
  renderColumn("b", organB);
  updateRelation(organA, organB);

  document.title = `${organA.nama} vs ${organB.nama} | AR Organ Tubuh`;
  const nextUrl = `${location.pathname}?a=${encodeURIComponent(organA.id)}&b=${encodeURIComponent(organB.id)}`;
  try {
    history.replaceState(null, "", nextUrl);
  } catch (err) {
    // Abaikan jika history.replaceState dibatasi
  }
}

populateSelects();
attachProgressListener(document.getElementById("mv-a"));
attachProgressListener(document.getElementById("mv-b"));

const params = new URLSearchParams(location.search);
const paramA = params.get("a");
const paramB = params.get("b");

const validA = ORGANS.find(o => o.id === paramA);
const initialA = validA ? validA.id : ORGANS[0].id;

const validB = ORGANS.find(o => o.id === paramB);
let initialB = validB ? validB.id : "";
if (!initialB) {
  const fallbackB = ORGANS.find(o => o.id !== initialA) || ORGANS[0];
  initialB = fallbackB.id;
}

selectA.value = initialA;
selectB.value = initialB;

selectA.addEventListener("change", updateComparison);
selectB.addEventListener("change", updateComparison);

btnSwap.addEventListener("click", () => {
  const temp = selectA.value;
  selectA.value = selectB.value;
  selectB.value = temp;
  updateComparison();
});

updateComparison();
