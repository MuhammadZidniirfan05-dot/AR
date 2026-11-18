# [Fase Bonus] Info Penyakit Umum, Cara Menjaga Kesehatan Organ & Lencana Progres Belajar

**Labels:** `bonus`, `enhancement`, `education`, `ui-ux`  
**Nama Branch Wajib:** `bonus-kesehatan-penyakit`  
**Target PR:** `main`  
**Estimasi Waktu:** 45 menit  
**Prasyarat:** Fase MVP & Simulasi Fisiologi selesai

---

## Deskripsi
Menambahkan informasi edukasi medis tingkat SMP berupa **Gangguan/Penyakit Umum** dan **Cara Menjaga Kesehatan** untuk keenam organ di `js/data.js` dan menampilkannya di `organ.html`, serta menambahkan **Pelacak Progres Belajar (Progress Badge)** di halaman utama (`index.html`) menggunakan `localStorage`.

---

## Skema Data Tambahan di `js/data.js`
Setiap objek organ di dalam `ORGANS` wajib memiliki 2 properti tambahan berikut:
```javascript
penyakit: [
  {
    nama: "Penyakit Jantung Koroner",
    info: "Penyempitan pembuluh darah arteri koroner akibat penumpukan lemak/kolesterol."
  },
  // minimal 2 penyakit per organ
],
tipsSehat: [
  "Rutin berolahraga minimal 30 menit setiap hari",
  "Kurangi makanan tinggi lemak jenuh dan garam berlebih",
  "Hindari merokok dan kelola stres dengan baik"
]
```

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-kesehatan-penyakit
   ```
2. Kerjakan hanya file cakupan fitur ini (`js/data.js`, `organ.html`, `js/viewer.js`, `index.html`, `js/app.js`, `css/style.css`, dan `issues/bonus-kesehatan-penyakit.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add js/data.js organ.html js/viewer.js index.html js/app.js css/style.css issues/bonus-kesehatan-penyakit.md
   git commit -m "feat(bonus): tambah info penyakit umum, tips kesehatan organ, dan progres belajar"
   git push -u origin bonus-kesehatan-penyakit
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `bonus-kesehatan-penyakit` dari `main`.
- [ ] **1. Lengkapi `js/data.js`**:
  - Tambahkan array `penyakit` (minimal 2 penyakit per organ dengan `{ nama, info }`) dan array `tipsSehat` (minimal 3 tips per organ) untuk ke-6 organ.
- [ ] **2. Tampilkan di `organ.html` & `js/viewer.js`**:
  - Tambahkan bagian **Gangguan & Penyakit Umum** (`#penyakit`) dan **Cara Menjaga Kesehatan** (`#tips-sehat`) di `organ.html`.
  - Render data `organ.penyakit` dan `organ.tipsSehat` di `js/viewer.js`.
  - Sertakan juga pembacaan penyakit & tips sehat pada teks narasi suara (`#btn-tts`).
  - Simpan `organ.id` yang sudah dikunjungi ke `localStorage` (`ar-organ-learned`, dibungkus `try/catch`).
- [ ] **3. Tambahkan Progres Belajar di `index.html` & `js/app.js`**:
  - Tampilkan bar/teks progres belajar di `index.html` (contoh: `"Progres Eksplorasi: 2 / 6 organ dipelajari"`).
  - Tampilkan lencana **"Sudah Dipelajari"** pada kartu organ yang sudah pernah dibuka.
- [ ] **4. Tambahkan styling di `css/style.css`** (mendukung mode terang & gelap).
- [ ] **5. Commit, push branch `bonus-kesehatan-penyakit`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Keenam organ di `js/data.js` memiliki data `penyakit` (minimal 2) dan `tipsSehat` (minimal 3) yang akurat.
- [ ] Halaman detail (`organ.html`) menampilkan daftar penyakit umum dan tips menjaga kesehatan organ tanpa hardcode di HTML.
- [ ] Halaman utama (`index.html`) menampilkan progres jumlah organ yang sudah dipelajari dan lencana pada kartu organ (dengan `localStorage` terbungkus `try/catch`).
- [ ] Mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 `var`, 0 `console.log`).
