# [Fase Bonus] Perbaikan Layout, Keseimbangan Tata Letak Tulisan & Judul/Subjudul Terpusat

**Labels:** `bonus`, `ui-ux`, `design`, `layout`  
**Nama Branch Wajib:** `bonus-perbaikan-layout`  
**Target PR:** `main`  
**Estimasi Waktu:** 35–45 menit  
**Prasyarat:** PR #45 (`bonus-ui-nyaman-belajar`) sudah ter-merge ke `main`

---

## Deskripsi
Memperbaiki tata letak layout dan posisi tulisan di seluruh halaman aplikasi **AR Organ Tubuh** agar terlihat jauh lebih rapi, simetris, proporsional, dan pas di layar mobile (`360px`), tablet (`768px`), maupun desktop (`1280px`):
1. **Judul & Subjudul Rata Tengah (Centered Display Hierarchy)** — seluruh hero, judul halaman, subjudul bagian, judul kartu beranda, judul soal kuis, dan judul halaman Bandingkan & Glosarium dibuat rata tengah (`text-align: center`) dengan pembatasan lebar baris ideal (`max-width: ...ch`) dan `text-wrap: balance`.
2. **Teks Bacaan Panjang Tetap Rata Kiri & Lega** — paragraf deskripsi (`.detail-desc`), daftar poin (`.numbered-list`, `.check-list`), kartu penyakit (`.disease-item`), serta definisi glosarium (`.glossary-def`) tetap rata kiri (`text-align: left`) agar tetap nyaman dibaca tanpa melelahkan mata.
3. **Kerangka Layout Kokoh (Sticky Footer)** — menggunakan `display: flex; flex-direction: column; min-height: 100vh;` pada `body` dan `main { flex: 1 0 auto; }` agar `.site-footer` selalu berada rapi di bagian bawah layar meskipun konten halaman singkat (seperti `quiz.html`, `404.html`, atau hasil filter pencarian kosong).
4. **Header Halaman Bandingkan (`compare.html`)** — menambahkan hero judul & subjudul terpusat pada `compare.html` (mendukung `ID / EN`) agar konsisten dengan beranda dan halaman glosarium.

Seluruh perubahan tetap 100% HTML, CSS, dan Vanilla JS murni, mendukung penuh **Dual Bahasa (`ID / EN`)** dan **3 Mode Tema (`Terang`, `Sepia`, `Gelap`)**.

---

## Poin Perubahan Utama

### 1. Kerangka Sticky Footer & Ruang Napas Global (`css/style.css`)
- Perbarui `body`:
  - Tambahkan `display: flex; flex-direction: column; min-height: 100vh;`
- Tambahkan aturan `main { flex: 1 0 auto; width: 100%; }` agar footer tidak pernah menggantung di tengah layar saat konten pendek.

### 2. Beranda (`index.html`, `css/style.css`)
- **Hero Beranda (`.study-hero`):**
  - Ubah menjadi rata tengah penuh: `display: flex; flex-direction: column; align-items: center; text-align: center; padding: 2rem 1.5rem; margin-bottom: 2rem;`
  - Ganti aksen kiri menjadi aksen atas yang simetris: `border: 1px solid var(--border); border-top: 4px solid var(--primary);` (hapus `border-left: 4px solid var(--primary);`).
  - `.study-hero-title`: `font-size: clamp(1.5rem, 3.2vw, 2.15rem); line-height: 1.25; max-width: 24ch; margin: 0 auto 0.65rem; text-wrap: balance;`
  - `.study-hero-desc`: `max-width: 60ch; margin: 0 auto 1.2rem; line-height: 1.7;`
  - `.study-hero-pills`: `justify-content: center; gap: 0.55rem;`
  - Di `@media (min-width: 768px)`: beri padding lebih lega `.study-hero { padding: 2.4rem 2rem; }`.
- **Bagian Judul & Filter Katalog (`.toolbar`):**
  - `.toolbar`: `display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; margin-bottom: 2rem;`
  - `.toolbar-heading`: `display: flex; flex-direction: column; align-items: center; gap: 0.25rem; text-align: center;`
  - `.toolbar-controls`: `display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.75rem; width: 100%;`
  - **PENTING (Periksa Cascade di `@media (min-width: 768px)`):** Hapus aturan `.toolbar { flex-direction: row; justify-content: space-between; }` dan `.toolbar-controls { justify-content: flex-end; }` yang ada di sekitar baris 1976–1992 agar judul `"Pilih Organ"`, subjudul `"6 Model 3D & AR"`, tombol switcher, dan kotak pencarian tetap tersusun rapi di tengah pada layar tablet/desktop. Untuk `.search-wrap` di `@media (min-width: 768px)`, atur `width: 300px; flex: 0 1 300px;`.
- **Kartu Organ (`.card`) & Peta Tubuh (`.body-map-section`):**
  - `.card-meta`: `justify-content: center; text-align: center;`
  - `.card-body p`: `text-align: center; line-height: 1.65;` (teks ringkas 1 kalimat terlihat simetris di bawah gambar 3D organ).
  - `.card-footer`: tetap `justify-content: space-between; align-items: center;` (`4 Titik 3D` di kiri, `Pelajari →` di kanan).
  - `.body-map-quicklist`: tambahkan `justify-content: center;`.

### 3. Halaman Detail Organ (`organ.html`, `css/style.css`)
- **Judul Organ & Alat Bantu (`.detail-title-row`):**
  - Ubah `.detail-title-row` menjadi terpusat vertikal agar tidak canggung saat nama organ dan tombol sejajar:
    - `flex-direction: column; align-items: center; text-align: center; gap: 0.85rem; padding-bottom: 1.15rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border);`
  - `.detail-heading-group`: `align-items: center; text-align: center; gap: 0.4rem;`
  - `.organ-system-badge`: `align-self: center;`
  - `.detail-title-tools`: `justify-content: center;`
- **Subjudul & Penataan Konten Materi:**
  - `.detail-info h2`, `.chips-block h2`, `.fact-box h2`, `.tips-box h2`, `.credit-box h2`: `text-align: center;`
  - `.hotspot-chips`: `justify-content: center;`
  - `.tab-intro`: `text-align: center; max-width: 56ch; margin: 0 auto 1.15rem;`
  - `.detail-desc`: ubah `max-width: 100%;` agar kotak kartu deskripsi mengisi lebar kolom dengan rapi tanpa ruang kosong jomplang di kanan, sementara teksnya tetap `text-align: left;` agar nyaman dibaca.
  - `.detail-actions`: `justify-content: center;`
  - `.credit-box`: `text-align: center;`
  - `.ar-note`: pastikan `text-align: center;` dan `.sim-controls { justify-content: center; }`, `.sim-status { text-align: center; }`.

### 4. Halaman Glosarium (`glossary.html`, `css/style.css`)
- **Hero Glosarium (`.glossary-hero`):**
  - Buat terpusat seragam dengan beranda di **semua ukuran layar**:
    - `display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; padding: 2rem 1.5rem; margin-bottom: 1.25rem; border-top: 4px solid var(--primary); background-image: var(--hero-bg);`
  - `.glossary-hero-text h1`: `font-size: clamp(1.45rem, 3vw, 2rem); line-height: 1.25; text-wrap: balance; margin: 0 0 0.45rem;`
  - `.glossary-hero-text p`: `max-width: 58ch; margin: 0 auto; line-height: 1.65;`
  - `.glossary-search-wrap`: `width: 100%; max-width: 480px; margin-top: 0.25rem;`
  - **PENTING (Periksa Cascade di `@media (min-width: 768px)`):** Hapus aturan `.glossary-hero { flex-direction: row; justify-content: space-between; }` dan `.glossary-search-wrap { width: 320px; }` di sekitar baris 2656–2664 agar hero glosarium tetap terpusat rapi di desktop!
- **Filter & Jumlah Istilah:**
  - `.glossary-filters`: `justify-content: center;`
  - `.glossary-meta-bar`: `text-align: center;`
  - Kartu istilah `.glossary-card` tetap rata kiri pada definisinya (`.glossary-def`) agar mudah dibaca.

### 5. Halaman Bandingkan Organ (`compare.html`, `js/i18n.js`, `css/style.css`)
- Tambahkan `<section class="study-hero compare-hero">` di atas `.compare-controls` dalam `compare.html`:
  ```html
  <section class="study-hero compare-hero">
    <span class="study-hero-badge" data-i18n="compareHeroBadge">Perbandingan 3D Interaktif</span>
    <h1 class="study-hero-title" data-i18n="compareHeroTitle">Bandingkan Dua Organ</h1>
    <p class="study-hero-desc" data-i18n="compareHeroDesc">Amati dua model 3D secara berdampingan beserta hubungan, fungsi utama, gangguan umum, dan tips kesehatannya.</p>
  </section>
  ```
- Tambahkan 3 kunci terjemahan baru (`compareHeroBadge`, `compareHeroTitle`, `compareHeroDesc`) di `I18N.id` dan `I18N.en` dalam `js/i18n.js`:
  - `id`:
    - `compareHeroBadge`: `"Perbandingan 3D Interaktif"`
    - `compareHeroTitle`: `"Bandingkan Dua Organ"`
    - `compareHeroDesc`: `"Amati dua model 3D secara berdampingan beserta hubungan, fungsi utama, gangguan umum, dan tips kesehatannya."`
  - `en`:
    - `compareHeroBadge`: `"Interactive 3D Comparison"`
    - `compareHeroTitle`: `"Compare Two Organs"`
    - `compareHeroDesc`: `"Inspect two 3D models side by side along with their relationship, key functions, common disorders, and health tips."`
- Perbaiki tata letak di `css/style.css`:
  - `.compare-hero`: `margin-bottom: 1.5rem;` (dengan `.compare-hero .study-hero-desc { margin-bottom: 0; }` karena tanpa pil bawah).
  - `.compare-relation`: `text-align: center; border-left: 1px solid var(--border); border-top: 4px solid var(--primary); padding: 1.15rem 1.35rem;` dan `.compare-relation p { max-width: 68ch; margin: 0 auto; line-height: 1.65; }`.
  - `.compare-card-header`: `flex-direction: column; align-items: center; text-align: center; gap: 0.3rem; margin-bottom: 0.9rem;`.
  - `.compare-summary`: `text-align: center; line-height: 1.65;`.
  - `.compare-card h3`: `text-align: center;`.

### 6. Halaman Kuis (`quiz.html`, `css/style.css`)
- Perbaiki tata letak kartu kuis:
  - `.quiz-card`: tambahkan `border-top: 4px solid var(--primary); padding: 1.85rem 1.5rem;` (dan di `@media (min-width: 768px)`, `padding: 2.25rem 2rem;`).
  - `.quiz-question`: `text-align: center; text-wrap: balance; font-size: clamp(1.2rem, 2.5vw, 1.45rem); line-height: 1.45; max-width: 34ch; margin: 0.25rem auto 1.5rem;`
  - `.quiz-feedback`: `text-align: center;` dengan `.quiz-explanation { max-width: 54ch; margin: 0 auto 1.15rem; line-height: 1.65; }`.
  - `.quiz-option` tetap rata kiri di dalam tombol karena diawali badge huruf `A/B/C/D`.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-perbaikan-layout
   ```
2. Kerjakan file cakupan (`css/style.css`, `compare.html`, `js/i18n.js`, `issues/bonus-perbaikan-layout.md` — tanpa hardcode data organ di HTML).
3. Validasi sintaks seluruh 7 file JS dengan `node --check`, pastikan seluruh kunci `I18N.id` & `I18N.en` cocok 1:1 (177 kunci), pastikan 0 JS `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Seluruh judul & subjudul utama pada `index.html` (`.study-hero`, `.toolbar-heading`, judul & ringkasan kartu), `organ.html` (`.detail-title-row`, subjudul bagian `.detail-info h2`, `.chips-block h2`, `.tab-intro`, `.detail-actions`), `compare.html` (`.compare-hero`, `.compare-relation`, `.compare-card-header`, `.compare-card h3`), `glossary.html` (`.glossary-hero`, `.glossary-filters`, `.glossary-count`), dan `quiz.html` (`.quiz-question`, `.quiz-feedback`) rata tengah dengan rapi di layar `360px`, `768px`, dan `1280px`.
- [ ] Tidak ada bentrok cascade CSS pada `@media (min-width: 768px)` untuk `.toolbar` dan `.glossary-hero` (tetap rata tengah di desktop).
- [ ] Teks bacaan panjang (`.detail-desc`, `.numbered-list li`, `.check-list li`, `.disease-item`, `.glossary-def`) tetap rata kiri dan nyaman dibaca.
- [ ] Sticky footer (`body` flex column + `main { flex: 1 0 auto; }`) berfungsi di seluruh 6 halaman HTML.
- [ ] Kunci terjemahan baru `compareHeroBadge`, `compareHeroTitle`, dan `compareHeroDesc` cocok 1:1 di `I18N.id` dan `I18N.en`, seluruh 7 file JS lolos `node --check`, 0 JS `var`, 0 `console.log`.
