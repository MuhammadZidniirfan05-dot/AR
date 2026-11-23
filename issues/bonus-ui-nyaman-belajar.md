# [Fase Bonus] Perombakan UI Modern & Kenyamanan Membaca Belajar (Mode Sepia, Warna Aksen Organ & Progress Visual)

**Labels:** `bonus`, `ui-ux`, `design`, `accessibility`  
**Nama Branch Wajib:** `bonus-ui-nyaman-belajar`  
**Target PR:** `main`  
**Estimasi Waktu:** 60–75 menit  
**Prasyarat:** PR #43 (`bonus-glosarium`) sudah ter-merge ke `main`

---

## Deskripsi
Mempercantik tampilan antarmuka di seluruh halaman aplikasi **AR Organ Tubuh** agar terasa lebih modern, hidup, tidak kaku, dan jauh lebih nyaman di mata saat membaca materi dalam waktu lama. Fokus utama:
1. **3 Mode Tema Nyaman Belajar (`Terang` / `Sepia Baca` / `Gelap`)** — menambahkan mode **Sepia** bernuansa kertas hangat agar mata tidak cepat lelah saat membaca penjelasan panjang.
2. **Identitas Warna & Badge Sistem Organ** — setiap dari 6 organ memiliki aksen warna harmonis dan badge sistem tubuh (Peredaran Darah, Pernapasan, Saraf, Pencernaan, Ekskresi, Metabolisme) pada kartu beranda dan halaman detail.
3. **Tipografi & Tata Letak Bacaan Lebih Lega** — paragraf pengantar bergaya kartu bacaan, perbaikan konsistensi spasi kartu poin (`.numbered-list` & `.check-list`), animasi transisi lembut saat berpindah tab belajar, serta garis indikator progres baca tipis di bawah header pada halaman materi.
4. **Upgrade Visual Kuis & Kartu** — menambahkan *progress bar* visual serta badge huruf pilihan (`A`, `B`, `C`, `D`) pada `quiz.html`, plus hero banner ringkas nan menarik di `index.html`.

Seluruh perubahan tetap 100% HTML, CSS, dan Vanilla JS murni tanpa framework/library tambahan, mendukung penuh **Dual Bahasa (`ID / EN`)**, **3 Mode Tema**, serta responsif (`360px`, `768px`, `1280px`).

---

## Poin Perubahan Utama

### 1. Mode Tema 3 Pilihan: Terang, Sepia (Baca Nyaman), & Gelap (`js/data.js`, `css/style.css`, seluruh HTML)
- Tambahkan definisi variabel CSS `[data-theme="sepia"]` di `css/style.css` dengan nuansa kertas hangat ramah mata:
  - `--bg: #f4ecdc`, `--surface: #fdf9f0`, `--surface-glass: rgba(253, 249, 240, 0.9)`, `--surface-alt: #f0e6d2`
  - `--border: #dfd3bc`, `--border-strong: #c9b99b`
  - `--text: #2e241b`, `--text-body: #433528`, `--text-muted: #6b5947`
  - `--primary: #0f766e`, `--primary-hover: #115e59`
  - `--fact-bg: #eef4ec`, `--fact-title: #1b5e4a`, `--fact-text: #224a3e`
  - `--viewer-bg: radial-gradient(circle at center, #fffdf7 0%, #e7dcc5 100%)`
- Perbarui skrip inline anti-FOUC pada `<head>` di seluruh 6 halaman HTML (`index.html`, `organ.html`, `compare.html`, `quiz.html`, `glossary.html`, `404.html`) agar mengenali nilai `"sepia"` selain `"dark"` dan `"light"`.
- Perbarui `getPreferredTheme()`, `getThemeButtonLabels()`, dan `initTheme()` di `js/data.js`:
  - Siklus klik `#theme-toggle`: `"light"` → `"sepia"` → `"dark"` → `"light"`.
  - Label tombol `#theme-toggle` menampilkan tema berikutnya (atau tema aktif yang jelas) dalam `ID` & `EN`:
    - Saat `light`: tampilkan `"Sepia"` (`aria-label`: `"Ubah ke mode baca sepia"` / `"Switch to sepia reading mode"`).
    - Saat `sepia`: tampilkan `"Gelap"` / `"Dark"` (`aria-label`: `"Ubah ke mode gelap"` / `"Switch to dark mode"`).
    - Saat `dark`: tampilkan `"Terang"` / `"Light"` (`aria-label`: `"Ubah ke mode terang"` / `"Switch to light mode"`).

### 2. Identitas Sistem Organ & Upgrade Beranda (`js/data.js`, `js/i18n.js`, `index.html`, `js/app.js`, `css/style.css`)
- Pada setiap organ di `ORGANS` (`js/data.js`), tambahkan properti `sistem` (Bahasa Indonesia) dan `en.sistem` (Bahasa Inggris) serta `warna` (aksen lembut):
  - `jantung`: `"Sistem Peredaran Darah"` / `"Circulatory System"`
  - `paru-paru`: `"Sistem Pernapasan"` / `"Respiratory System"`
  - `otak`: `"Sistem Saraf"` / `"Nervous System"`
  - `lambung`: `"Sistem Pencernaan"` / `"Digestive System"`
  - `ginjal`: `"Sistem Ekskresi"` / `"Excretory System"`
  - `hati`: `"Sistem Metabolisme"` / `"Metabolic System"`
- Perbarui `getOrganText()` di `js/i18n.js` agar mengembalikan field `sistem`.
- Pada `index.html`, tambahkan **banner pengantar belajar ringkas** (`.study-hero`) di atas `.toolbar` dengan latar gradien lembut (`--hero-bg`), judul hangat, deskripsi singkat 1 kalimat, serta 3 pil keunggulan (*3D & AR Interaktif*, *24 Hotspot Anatomi*, *Kuis & Glosarium*) — semua memakai `data-i18n`.
- Pada `js/app.js`:
  - Render kartu organ di `#organ-grid` dengan atribut `data-organ="${o.id}"`, badge kategori sistem (`.card-system`), dan tag meta bawah (misal `"4 Titik 3D"` / `"4 3D Points"`).
  - Tidak hardcode data organ di HTML.

### 3. Peningkatan Kenyamanan Baca di Halaman Detail (`organ.html`, `js/viewer.js`, `css/style.css`)
- Tambahkan elemen tipis `<div id="reading-progress" class="reading-progress" aria-hidden="true"></div>` tepat di dalam/bawah `.site-header` pada `organ.html` (dan `glossary.html`) yang memanjang halus mengikuti persentase scroll halaman (`window.addEventListener("scroll", ...)` dengan `{ passive: true }`).
- Di `organ.html` & `js/viewer.js`:
  - Tampilkan badge sistem organ (`<span id="organ-system" class="organ-system-badge"></span>`) di atas `<h1 id="nama">`, dan set `detailArticle.dataset.organ = organ.id` untuk garis aksen halus khas organ.
- Di `css/style.css`:
  - Beri gaya *reading card* yang lebih lega pada `.detail-desc` (latar `--surface-alt`, garis aksen kiri lembut, padding nyaman, `line-height: 1.85`, `max-width: 68ch`).
  - Perbaiki spesifisitas `.numbered-list li + li, .check-list li + li { margin-top: 0; }` agar jarak antar kartu fungsi & tips seragam rapi (`gap: 0.65rem`).
  - Tambahkan animasi halus `panelFadeIn` (`0.22s ease-out`) saat berpindah `.tab-panel`, dan matikan semua animasi pada `@media (prefers-reduced-motion: reduce)`.
  - Tambahkan *ambient background* lembut pada `body` (`background-image: var(--hero-bg);`) agar keseluruhan halaman terasa segar dan berdimensi.

### 4. Upgrade Visual Kuis Interaktif (`quiz.html`, `js/quiz.js`, `css/style.css`)
- Di `quiz.html`, tambahkan visual *progress bar* di bawah `.quiz-top`:
  ```html
  <div class="quiz-bar" aria-hidden="true">
    <div id="quiz-bar-fill" class="quiz-bar-fill"></div>
  </div>
  ```
- Di `js/quiz.js`:
  - Perbarui lebar `#quiz-bar-fill` pada setiap soal (`((currentIndex + 1) / questions.length) * 100 + "%"`) dan `100%` saat hasil.
  - Render tombol pilihan jawaban `.quiz-option` dengan badge huruf bulat `<span class="quiz-opt-letter" aria-hidden="true">A/B/C/D</span>` dan `<span class="quiz-opt-text">...</span>` menggunakan `document.createElement` + `textContent` (pastikan `refreshQuizTranslation()` memperbarui `.quiz-opt-text` sehingga badge huruf `A/B/C/D` tidak hilang saat berganti bahasa!).

### 5. Kunci Terjemahan Baru (`js/i18n.js`)
- Tambahkan kunci terjemahan `id` dan `en` untuk hero beranda, tag jumlah hotspot di kartu (`cardHotspots`: `"{count} Titik 3D"` / `"{count} 3D Points"`), dan pastikan semua kunci 1:1 di `I18N.id` dan `I18N.en`.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-ui-nyaman-belajar
   ```
2. Kerjakan file cakupan (`css/style.css`, `js/data.js`, `js/i18n.js`, `js/app.js`, `js/viewer.js`, `js/quiz.js`, `js/glossary.js`, `index.html`, `organ.html`, `compare.html`, `quiz.html`, `glossary.html`, `404.html`, `issues/bonus-ui-nyaman-belajar.md`).
3. Validasi sintaks seluruh 7 file JS dengan `node --check`, pastikan seluruh kunci `I18N.id` & `I18N.en` cocok 1:1, pastikan 0 `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Mode tema 3 pilihan (**Terang → Sepia → Gelap**) berfungsi di seluruh 6 halaman HTML, tersimpan di `localStorage` (`ar-organ-theme` dengan `try / catch`), tanpa FOUC, dan tombol `#theme-toggle` mengikuti bahasa aktif (`ID / EN`).
- [ ] Beranda (`index.html`) memiliki banner belajar ringkas dan kartu organ menampilkan badge sistem tubuh (`sistem`) + aksen warna organ + indikator jumlah titik 3D tanpa hardcode data organ di HTML.
- [ ] Halaman detail (`organ.html`) menampilkan badge sistem organ, kartu deskripsi bacaan lega, spasi `.numbered-list` / `.check-list` seragam (`margin-top: 0` menang atas `.detail-list li + li`), transisi lembut antar tab, serta bar progres baca di bawah header.
- [ ] Halaman kuis (`quiz.html`) menampilkan *progress bar* visual dan badge huruf `A/B/C/D` yang tetap utuh saat bahasa diganti di tengah kuis.
- [ ] Mendukung `@media (prefers-reduced-motion: reduce)`, responsif (`360px`, `768px`, `1280px`), Dual Bahasa `ID / EN`, serta mematuhi Standar Kode di `PLAN.md` (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 JS `var`, 0 `console.log`).
