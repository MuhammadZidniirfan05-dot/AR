const selectA = document.getElementById("select-a");
const selectB = document.getElementById("select-b");
const btnSwap = document.getElementById("btn-swap");
const relationTitle = document.getElementById("relation-title");
const relationText = document.getElementById("relation-text");

const RELATIONS = {
  "jantung|paru-paru": "Jantung dan paru-paru bekerja sama erat dalam sirkulasi pulmonal: bilik kanan jantung memompa darah miskin oksigen ke paru-paru untuk ditukar dengan oksigen, lalu darah kaya oksigen mengalir kembali ke jantung untuk dipompa ke seluruh tubuh.",
  "jantung|otak": "Jantung memompa sekitar 15\u201320% curah darah beroksigen langsung menuju otak setiap menit, sementara batang otak mengatur irama detak jantung secara otomatis melalui sistem saraf otonom.",
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

const RELATIONS_EN = {
  "jantung|paru-paru": "The heart and lungs work closely together in pulmonary circulation: the right ventricle pumps oxygen-poor blood to the lungs to pick up oxygen, and oxygen-rich blood returns to the heart to be pumped throughout the body.",
  "jantung|otak": "The heart pumps about 15\u201320% of its oxygenated blood output directly to the brain every minute, while the brainstem automatically regulates heart rate through the autonomic nervous system.",
  "jantung|lambung": "After a meal, the heart increases blood flow to the stomach and digestive tract to support the breakdown of food and absorption of nutrients.",
  "ginjal|jantung": "The heart pumps blood through the kidneys to filter out waste, while the kidneys regulate fluid volume and hormones that keep blood pressure within a healthy range.",
  "hati|jantung": "The liver receives nutrient-rich blood from the digestive system and filters it before returning that blood to the heart for circulation.",
  "otak|paru-paru": "The lungs supply the constant oxygen needed by brain neurons, while the respiratory center in the brainstem automatically controls breathing rate and depth.",
  "lambung|paru-paru": "Oxygen absorbed by the lungs is delivered via the bloodstream to the smooth muscle cells of the stomach wall to power food churning and digestion.",
  "ginjal|paru-paru": "The lungs and kidneys work together to maintain the blood's acid-base (pH) balance: the lungs regulate carbon dioxide levels, while the kidneys control acid and mineral excretion in urine.",
  "hati|paru-paru": "The lungs supply oxygen through the bloodstream to the liver so liver cells can carry out hundreds of metabolic and detoxification reactions.",
  "lambung|otak": "The brain and stomach communicate via the vagus nerve: the brain regulates hunger and gastric acid secretion, while the stomach sends fullness signals back to the brain.",
  "ginjal|otak": "The brain releases antidiuretic hormone (ADH) to signal the kidneys how much water to conserve or excrete as urine to prevent dehydration.",
  "hati|otak": "The liver maintains stable blood glucose levels as the brain's primary energy source and filters toxic ammonia so it does not harm brain cells.",
  "ginjal|lambung": "The stomach digests the food and liquids entering the body, while the kidneys later filter metabolic nutrient waste and excess water from the blood.",
  "hati|lambung": "Food broken down by the stomach passes into the small intestine, where it is further digested with the help of bile produced by the liver.",
  "ginjal|hati": "The liver converts toxic waste products (such as ammonia) into safer urea in the bloodstream, and the kidneys filter that urea out of the body in urine."
};

function populateSelects() {
  ORGANS.forEach(organ => {
    const organText = getOrganText(organ);
    const optA = document.createElement("option");
    optA.value = organ.id;
    optA.textContent = organText.nama;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = organ.id;
    optB.textContent = organText.nama;
    selectB.appendChild(optB);
  });
}

function updateSelectOptionLabels() {
  ORGANS.forEach((organ, idx) => {
    const organText = getOrganText(organ);
    if (selectA.options[idx]) {
      selectA.options[idx].textContent = organText.nama;
    }
    if (selectB.options[idx]) {
      selectB.options[idx].textContent = organText.nama;
    }
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
  const organText = getOrganText(organ);
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
  }
  mv.setAttribute("alt", `${t("modelAltPrefix")} ${organText.nama}`);

  document.getElementById(`nama-${suffix}`).textContent = organText.nama;
  document.getElementById(`link-${suffix}`).href = `organ.html?id=${organ.id}`;
  document.getElementById(`ringkas-${suffix}`).textContent = organText.deskripsi;
  document.getElementById(`fakta-${suffix}`).textContent = organText.fakta;

  const fungsiEl = document.getElementById(`fungsi-${suffix}`);
  fungsiEl.innerHTML = "";
  organText.fungsi.forEach((teks, index) => {
    const li = document.createElement("li");
    const num = document.createElement("span");
    num.className = "step-num";
    num.textContent = String(index + 1).padStart(2, "0");
    const spanText = document.createElement("span");
    spanText.className = "step-text";
    spanText.textContent = teks;
    li.appendChild(num);
    li.appendChild(spanText);
    fungsiEl.appendChild(li);
  });

  const penyakitEl = document.getElementById(`penyakit-${suffix}`);
  penyakitEl.innerHTML = "";
  if (Array.isArray(organText.penyakit)) {
    organText.penyakit.forEach(item => {
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
  if (Array.isArray(organText.tipsSehat)) {
    organText.tipsSehat.forEach(teks => {
      const li = document.createElement("li");
      const icon = document.createElement("span");
      icon.className = "check-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "\u2713";
      const spanText = document.createElement("span");
      spanText.className = "check-text";
      spanText.textContent = teks;
      li.appendChild(icon);
      li.appendChild(spanText);
      tipsEl.appendChild(li);
    });
  }
}

function updateRelation(organA, organB) {
  const textA = getOrganText(organA);
  const textB = getOrganText(organB);

  if (organA.id === organB.id) {
    relationTitle.textContent = t("compareSameTitle", { name: textA.nama });
    relationText.textContent = t("compareSameText");
    return;
  }

  const pairKey = [organA.id, organB.id].sort().join("|");
  const relDict = getCurrentLang() === "en" ? RELATIONS_EN : RELATIONS;
  relationTitle.textContent = t("compareRelTitle", { a: textA.nama, b: textB.nama });
  relationText.textContent =
    relDict[pairKey] ||
    t("compareRelFallback", { a: textA.nama, b: textB.nama });
}

function updateComparison() {
  const organA = ORGANS.find(o => o.id === selectA.value) || ORGANS[0];
  const organB = ORGANS.find(o => o.id === selectB.value) || ORGANS[1];
  const textA = getOrganText(organA);
  const textB = getOrganText(organB);

  renderColumn("a", organA);
  renderColumn("b", organB);
  updateRelation(organA, organB);

  document.title = `${textA.nama} vs ${textB.nama} | ${t("brandName")}`;
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

document.addEventListener("ar-lang-change", () => {
  updateSelectOptionLabels();
  updateComparison();
});

updateComparison();
