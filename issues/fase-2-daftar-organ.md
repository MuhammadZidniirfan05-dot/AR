# [Fase 2] Skema Data Organ (js/data.js) & Halaman Daftar Organ (index.html)

**Labels:** `phase-2`, `feature`, `frontend`  
**Nama Branch Wajib:** `fase-2-daftar-organ`  
**Target PR:** `main`  
**Estimasi Waktu:** 2 – 3 jam  
**Prasyarat:** PR Fase 1 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Mengisi data 6 organ di `js/data.js` sesuai skema wajib dan membangun halaman utama daftar organ (`index.html`, `js/app.js`, `css/style.css`) lengkap dengan fitur pencarian *real-time* dan *grid* responsif di branch `fase-2-daftar-organ`.

---

## Skema Data Wajib (`js/data.js`)
```javascript
const ORGANS = [
  {
    id: "jantung",
    nama: "Jantung",
    ringkas: "Memompa darah ke seluruh tubuh.",
    deskripsi: "Jantung adalah organ otot berongga yang ...",
    fungsi: [
      "Memompa darah kaya oksigen ke seluruh tubuh",
      "Menerima darah miskin oksigen dari tubuh"
    ],
    fakta: "Jantung manusia berdetak sekitar 100.000 kali per hari.",
    model: "models/jantung.glb",
    modelIos: null,                 // "models/jantung.usdz" atau null
    poster: "img/jantung.webp",
    hotspots: [
      {
        id: "atrium-kanan",
        label: "Atrium Kanan",
        info: "Menerima darah dari seluruh tubuh.",
        position: "0.1 0.2 0.05",   // koordinat x y z di model
        normal: "0 1 0"
      }
    ],
    kredit: {
      judul: "Human Heart",
      pembuat: "Nama Pembuat",
      sumber: "https://sketchfab.com/...",
      lisensi: "CC-BY 4.0"
    }
  }
  // ... 5 organ lainnya (paru-paru, otak, lambung, ginjal, hati)
];

const QUIZ = [
  {
    organId: "jantung",
    pertanyaan: "Organ apa yang memompa darah?",
    pilihan: ["Jantung", "Paru-paru", "Hati", "Ginjal"],
    jawaban: 0,                      // index jawaban benar
    penjelasan: "Jantung memompa darah ke seluruh tubuh."
  }
];
```

**Aturan Data:**
- `id` huruf kecil, tanpa spasi, sama dengan nama file model.
- Minimal 2 hotspot per organ (boleh dummy dulu di Fase 2, nanti disesuaikan di Fase 4), minimal 2 soal kuis per organ.
- Isi teks (`deskripsi`, `fungsi`, `fakta`) akurat dan sederhana (level SMP).
- `kredit` wajib terisi untuk setiap model (ambil dari catatan `NOTES.md`).

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-2-daftar-organ
   ```
2. Kerjakan hanya file cakupan Fase 2 (`js/data.js`, `index.html`, `js/app.js`, `css/style.css`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add js/data.js index.html js/app.js css/style.css
   git commit -m "feat(fase-2): halaman daftar organ dan skema data awal"
   git push -u origin fase-2-daftar-organ
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-2-daftar-organ` dari `main`.
- [ ] **1. Isi `js/data.js`** untuk ke-6 organ (`jantung`, `paru-paru`, `otak`, `lambung`, `ginjal`, `hati`) sesuai skema di atas.
- [ ] **2. Bangun `index.html`**:
  - `<header>` berisi judul proyek dan input pencarian (`<input id="search">`).
  - `<main>` berisi `<section id="organ-grid">` (dikosongkan di HTML, diisi lewat JS).
  - `<footer>` berisi teks `"Model 3D: lihat halaman tiap organ untuk kredit"`.
  - Muat `<script src="js/data.js"></script>` lalu `<script src="js/app.js"></script>` (urutan wajib).
- [ ] **3. Bangun `js/app.js`**:
  - Render kartu untuk setiap organ (poster, nama, ringkas, link ke `organ.html?id=<id>`).
  - Fitur pencarian: filter kartu berdasarkan nama organ saat user mengetik (*case-insensitive*).
  - Jika hasil pencarian kosong, tampilkan `<p>Organ tidak ditemukan.</p>`.
- [ ] **4. Bangun `css/style.css`**:
  - Layout grid responsif: 1 kolom di HP, 2 kolom di tablet, 3 kolom di desktop.
  - Styling kartu dengan efek hover yang rapi.
- [ ] **5. Commit, push branch `fase-2-daftar-organ`, dan buat PR ke `main`**.

**Referensi Implementasi `js/app.js`:**
```javascript
const grid = document.getElementById("organ-grid");
function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => `
      <a class="card" href="organ.html?id=${o.id}">
        <img src="${o.poster}" alt="${o.nama}" loading="lazy" width="300" height="300">
        <h2>${o.nama}</h2>
        <p>${o.ringkas}</p>
      </a>`).join("")
    : "<p>Organ tidak ditemukan.</p>";
}
render(ORGANS);
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  render(ORGANS.filter(o => o.nama.toLowerCase().includes(q)));
});
```

---

## Standar Kode
- Indentasi 2 spasi, variabel/fungsi JS `camelCase`, class CSS `kebab-case`.
- Gunakan `const`/`let`, jangan `var`.
- Jangan hardcode data organ di `index.html`.
- Tidak ada `console.log` tersisa.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] 6 kartu organ tampil lengkap dengan gambar poster, nama, dan ringkasan dari `js/data.js` (tidak di-hardcode di HTML).
- [ ] Klik kartu mengarahkan ke `organ.html?id=<id-organ>`.
- [ ] Input pencarian memfilter daftar organ secara *case-insensitive*, dan menampilkan `"Organ tidak ditemukan."` saat tidak ada yang cocok.
- [ ] Tampilan rapi dan responsif pada lebar layar `360px`, `768px`, dan `1280px`.
- [ ] Tidak ada file di luar cakupan Fase 2 yang diubah.

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-2-daftar-organ.md.
Kerjakan HANYA Fase 2 pada branch `fase-2-daftar-organ` (checkout dari `main`).
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, cek Acceptance Criteria Fase 2 satu per satu, commit, push ke branch `fase-2-daftar-organ`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-2-daftar-organ` terhadap spesifikasi di PLAN.md dan issues/fase-2-daftar-organ.md.
Periksa `git diff main...fase-2-daftar-organ`:
1. Pastikan skema `ORGANS` dan `QUIZ` di `js/data.js` lengkap untuk 6 organ dan mematuhi aturan bagian 4 PLAN.md.
2. Pastikan tidak ada data organ yang di-hardcode di `index.html`.
3. Pastikan pencarian bekerja case-insensitive termasuk state kosong ("Organ tidak ditemukan.").
4. Pastikan grid CSS responsif (1 kolom HP, 2 tablet, 3 desktop) dan mematuhi Standar Kode (2 spasi, camelCase JS, kebab-case CSS, tanpa var, tanpa console.log).
Jika semua lolos 100%, Approve dan Merge PR ke `main`. Jika ada bug/pelanggaran, berikan instruksi revisi ke Model Pekerja.
```
