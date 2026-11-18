# [Fase Bonus] Perombakan UI Modern (Redesign) & Penghapusan Bar Progres Eksplorasi

**Labels:** `bonus`, `ui-ux`, `enhancement`, `style`  
**Nama Branch Wajib:** `bonus-ui-redesign`  
**Target PR:** `main`  
**Estimasi Waktu:** 45 menit  
**Prasyarat:** PR #26 sudah ter-merge ke `main`

---

## Deskripsi
Menghapus fitur **Bar Progres Eksplorasi** (`#progress-banner` dan lencana `Sudah Dipelajari`) agar halaman utama lebih bersih, sekaligus merombak tampilan antarmuka (**UI Redesign**) di seluruh halaman (`index.html`, `organ.html`, `quiz.html`, `404.html`, `css/style.css`, `js/app.js`) menjadi jauh lebih modern, interaktif, dan menarik.

---

## Poin Perubahan Utama
1. **Hapus Progres Eksplorasi:**
   - Hapus `#progress-banner` dari `index.html`.
   - Hapus pembacaan/penulisan `ar-organ-learned` dan lencana `.badge-learned` dari `js/app.js`, `js/viewer.js`, dan `css/style.css`.
2. **Header Sticky Glassmorphism & Hero Section (`index.html`):**
   - Header navigasi *sticky* dengan efek blur (*glassmorphism*) dan brand dengan ikon.
   - Hero section menarik di halaman utama dengan badge *"Eksplorasi Anatomi 3D & Augmented Reality"*, judul gradien modern, dan kotak pencarian berikon.
3. **Kartu Organ Lebih Hidup (`js/app.js` & `css/style.css`):**
   - Efek *smooth zoom* pada gambar poster saat kartu di-*hover*.
   - Footer kartu menampilkan jumlah titik hotspot (`4 Titik Hotspot`) dan teks aksi **`Lihat 3D & AR →`**.
4. **Penyempurnaan Halaman Detail (`organ.html`) & Kuis (`quiz.html`):**
   - Efek *pulse ring* halus pada titik `.hotspot` 3D agar langsung terlihat interaktif.
   - Desain kartu informasi, kotak fakta, penyakit umum, tips sehat, dan halaman kuis yang lebih modern dengan bayangan halus dan gradien aksen di mode terang maupun gelap.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-ui-redesign
   ```
2. Kerjakan file cakupan (`index.html`, `organ.html`, `quiz.html`, `404.html`, `js/app.js`, `js/viewer.js`, `css/style.css`, `issues/bonus-ui-redesign.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add index.html organ.html quiz.html 404.html js/app.js js/viewer.js css/style.css issues/bonus-ui-redesign.md
   git commit -m "style(ui): hapus bar progres dan redesign tampilan ui lebih modern"
   git push -u origin bonus-ui-redesign
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Bar Progres Eksplorasi (`#progress-banner`), lencana `Sudah Dipelajari`, dan logika `ar-organ-learned` sudah terhapus bersih.
- [ ] Tampilan halaman utama, kartu organ, halaman detail 3D, dan halaman kuis tampil lebih modern dan menarik di mode terang maupun gelap.
- [ ] Responsif tanpa *horizontal scroll* pada lebar `360px`, `768px`, dan `1280px`.
- [ ] Mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 `var`, 0 `console.log`).
