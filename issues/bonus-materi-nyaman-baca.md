# [Fase Bonus] Desain Materi Belajar Interaktif & Nyaman Dibaca (Tab Belajar, Kartu Poin & Pengatur Ukuran Teks)

**Labels:** `bonus`, `ui-ux`, `education`, `accessibility`  
**Nama Branch Wajib:** `bonus-materi-nyaman-baca`  
**Target PR:** `main`  
**Estimasi Waktu:** 45 menit  
**Prasyarat:** PR #33 sudah ter-merge ke `main`

---

## Deskripsi
Menata ulang penyajian teks penjelasan pada halaman detail organ (`organ.html`) dan halaman perbandingan (`compare.html`) agar materi edukasi yang lengkap tetap utuh 100%, namun terasa jauh lebih ringan, visual, terstruktur, dan nyaman dibaca tanpa melelahkan mata (*anti wall-of-text*).

---

## Poin Perubahan Utama
1. **Tab Belajar Interaktif pada `organ.html` (`role="tablist"`):**
   - Membagi materi lengkap ke dalam 3 tab yang mudah diganti (dan mendukung navigasi keyboard):
     - **Tab 1 — Ringkasan & Fungsi:** Deskripsi dengan tipografi lega, **kartu poin fungsi bernomor (`01`, `02`, `03`)**, kotak **Fakta Menarik** berikon, serta daftar **chip bagian anatomi** dari `organ.hotspots` yang saat diklik langsung membuka panel info hotspot.
     - **Tab 2 — Gangguan & Penyakit:** Kartu penyakit umum dengan ikon/badge visual yang terpisah rapi.
     - **Tab 3 — Jaga Kesehatan:** Daftar tips menjaga kesehatan dengan ikon centang (`✓`) yang nyaman dipindai mata.
2. **Pengatur Ukuran Teks Baca (`A-` / `A+`) pada `organ.html`:**
   - Tombol pengubah ukuran teks materi (Normal / Besar) di sebelah tombol **Bacakan** (`#btn-tts`) dan disimpan di `localStorage` (dengan `try/catch`) agar nyaman dibaca di HP maupun layar lebar.
3. **Keterbacaan Lebih Lega pada `compare.html`:**
   - Poin fungsi memakai tampilan bernomor halus, tips sehat memakai ikon centang, serta bagian **Gangguan Umum** dan **Tips Menjaga Kesehatan** memakai `<details class="compare-accordion">` agar layar perbandingan 2 organ tetap ringkas dan tidak melelahkan saat di-scroll.
4. **Blok Kredit Tetap Tampil Jelas:**
   - Blok `#kredit` tetap terlihat di bagian bawah kartu materi `organ.html` (mematuhi aturan kredit wajib tampil).

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-materi-nyaman-baca
   ```
2. Kerjakan file cakupan (`organ.html`, `js/viewer.js`, `compare.html`, `js/compare.js`, `css/style.css`, `issues/bonus-materi-nyaman-baca.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add organ.html js/viewer.js compare.html js/compare.js css/style.css issues/bonus-materi-nyaman-baca.md
   git commit -m "style(ux): tata materi belajar dengan tab interaktif, kartu poin, dan pengatur ukuran teks"
   git push -u origin bonus-materi-nyaman-baca
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Seluruh materi penjelasan (deskripsi, fungsi, fakta menarik, gangguan & penyakit, tips menjaga kesehatan, dan kredit) tetap utuh 100% tanpa pengurangan konten.
- [ ] Tab belajar di `organ.html` bekerja dengan klik maupun keyboard (`aria-selected`, `hidden` pada panel non-aktif) serta dilengkapi chip bagian organ yang sinkron dengan hotspot.
- [ ] Tombol pengatur ukuran teks (`#btn-font-size`) memperbesar/mengembalikan ukuran teks baca dan menyimpan preferensi di `localStorage` dengan `try/catch`.
- [ ] Kartu perbandingan di `compare.html` tampil lebih ringkas dengan accordion `<details>` untuk Gangguan Umum & Tips Kesehatan.
- [ ] Responsif (`360px`, `768px`, `1280px`), mendukung Dark Mode, dan mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 JS `var`, 0 `console.log`).
