# [Fase Bonus] Glosarium Istilah Medis & Anatomi Interaktif (ID / EN)

**Labels:** `bonus`, `education`, `i18n`, `ui-ux`  
**Nama Branch Wajib:** `bonus-glosarium`  
**Target PR:** `main`  
**Estimasi Waktu:** 60 menit  
**Prasyarat:** PR #41 (`bonus-peta-tubuh`) sudah ter-merge ke `main`

---

## Deskripsi
Menambahkan halaman **Glosarium Anatomi (`glossary.html`)** — kamus mini istilah medis dan anatomi yang digunakan di seluruh aplikasi **AR Organ Tubuh** (seperti *Aorta, Sistol & Diastol, Alveolus, Serebelum, Pepsin, Nefron, Empedu, Glikogen*, dll.). Dilengkapi pencarian instan bilingual (`ID` & `EN`), filter berdasarkan organ (termasuk dukungan parameter URL `?organ=<id>`), pengurutan alfabetis A–Z, tombol narasi suara pengucapan/definisi (`speechSynthesis`), dan tautan langsung ke model 3D organ terkait.

Seluruh halaman dan fitur wajib mendukung penuh **Dual Bahasa (`ID / EN`)**, **Dark Mode**, serta tata letak responsif (`360px`, `768px`, `1280px`).

---

## Poin Perubahan Utama

### 1. Data Glosarium Terpusat pada `js/data.js`
- Tambahkan konstanta `GLOSSARY` di `js/data.js` berisi **24 istilah anatomi & medis akurat (4 istilah per organ)** lengkap dengan terjemahan Bahasa Inggris (`en`):
  - **Jantung (`jantung`):** `Aorta`, `Atrium (Serambi)`, `Ventrikel (Bilik)`, `Sistol & Diastol`
  - **Paru-paru (`paru-paru`):** `Trakea`, `Bronkus`, `Alveolus`, `Inspirasi & Ekspirasi`
  - **Otak (`otak`):** `Serebrum (Otak Besar)`, `Serebelum (Otak Kecil)`, `Lobus Frontal`, `Batang Otak`
  - **Lambung (`lambung`):** `Esofagus (Kerongkongan)`, `Enzim Pepsin`, `Lapisan Mukus (Lendir)`, `Duodenum (Usus 12 Jari)`
  - **Ginjal (`ginjal`):** `Nefron`, `Korteks Ginjal`, `Hilum`, `Ureter`
  - **Hati (`hati`):** `Cairan Empedu`, `Glikogen`, `Detoksifikasi`, `Regenerasi Hati`
- Struktur wajib setiap item:
  ```javascript
  {
    id: "alveolus",
    organId: "paru-paru",
    istilah: "Alveolus",
    definisi: "Kantung udara mikroskopis di ujung saluran paru-paru tempat berlangsungnya pertukaran oksigen dan karbon dioksida dengan darah.",
    en: {
      istilah: "Alveoli",
      definisi: "Microscopic air sacs at the end of the lung airways where oxygen and carbon dioxide are exchanged with the bloodstream."
    }
  }
  ```

### 2. Helper & Terjemahan Dual Bahasa pada `js/i18n.js`
- Tambahkan fungsi helper `getGlossaryText(item, lang)` di `js/i18n.js` yang mengembalikan `{ id, organId, istilah, definisi }` sesuai bahasa aktif dengan fallback aman ke Bahasa Indonesia.
- Tambahkan seluruh kunci terjemahan baru pada `I18N.id` dan `I18N.en`:
  - `navGlossary`, `brandGlossary`, `glossaryTitle`, `glossaryHeading`, `glossaryLead`
  - `glossarySearchLabel`, `glossarySearchPlaceholder`, `glossaryFilterAll`, `glossaryFilterAria`
  - `glossaryCount` (`Menampilkan {shown} dari {total} istilah` / `Showing {shown} of {total} terms`)
  - `glossaryEmpty`, `glossaryResetBtn`, `glossaryOpenOrgan`, `glossarySpeak`, `glossaryStop`, `glossarySpeakAria`, `btnGlossaryOrgan`

### 3. Halaman Glosarium (`glossary.html`) & Logika (`js/glossary.js`)
- Buat `glossary.html` dengan kerangka bersih (tanpa hardcode data glosarium di HTML):
  - Header konsisten dengan `compare.html` / `quiz.html`: tautan Kembali ke Daftar, judul `Glosarium Anatomi`, tombol `#lang-toggle`, dan tombol `#theme-toggle`.
  - Anti-FOUC script tema, favicon, meta description & Open Graph.
  - Konten utama (`<main class="container glossary-main">`):
    - Hero/header ringkas: judul, penjelasan singkat, dan input pencarian `#glossary-search`.
    - Deretan filter chip `#glossary-filters` (`role="group"`): tombol **Semua** + 6 tombol organ (dirender dinamis dari `ORGANS`).
    - Bar informasi jumlah hasil `#glossary-count` (`aria-live="polite"`).
    - Grid kartu istilah `<section id="glossary-grid" class="glossary-grid"></section>`.
  - Urutan `<script>`: `js/data.js` -> `js/i18n.js` -> `js/glossary.js`.
- Buat `js/glossary.js`:
  - Membaca parameter URL `?organ=<id>` untuk memilih filter awal jika valid, dan memperbarui URL saat filter berubah menggunakan `history.replaceState` berbasis `${location.pathname}` di dalam `try / catch`.
  - Pencarian `#glossary-search` mencocokkan kueri terhadap `istilah` dan `definisi` baik versi **Indonesia maupun Inggris** (case-insensitive).
  - Mengurutkan hasil secara alfabetis (`localeCompare`) sesuai bahasa aktif (`id` / `en`).
  - Merender setiap kartu memakai `document.createElement` + `textContent` (aman & patuh Standar Kode) yang memuat:
    - Badge nama organ + tautan `organ.html?id=<organId>`
    - Judul istilah & definisi
    - Tombol **Dengar** (`speechSynthesis` dengan `lang = "id-ID"` / `"en-US"`, otomatis disembunyikan bila `!(\"speechSynthesis\" in window)`, berhenti otomatis saat `pagehide`/`beforeunload` atau saat bahasa berganti).
  - Saat hasil kosong, tampilkan pesan kosong beserta tombol **Reset Filter** untuk mengosongkan pencarian & kembali ke "Semua".
  - Dengarkan event `"ar-lang-change"` untuk memperbarui `document.title`, label chip filter, pengurutan A–Z, dan seluruh kartu secara instan tanpa reload halaman (mempertahankan filter & kata kunci pencarian aktif).

### 4. Tautan Navigasi dari `index.html`, `organ.html`, dan `js/viewer.js`
- **`index.html`:** Tambahkan `<a class="btn-ghost" href="glossary.html" data-i18n="navGlossary">Glosarium</a>` di dalam `.nav-actions` pada header.
- **`organ.html` & `js/viewer.js`:** Tambahkan `<a id="link-glossary" class="btn-secondary" href="glossary.html" data-i18n="btnGlossaryOrgan">Glosarium Organ</a>` di dalam `.detail-actions`, dan di `js/viewer.js` arahkan `href` ke `glossary.html?organ=${organ.id}`.

### 5. Styling Responsif & Dark Mode (`css/style.css`)
- Tambahkan gaya rapi untuk `.glossary-main`, `.glossary-hero`, `.glossary-filters`, `.glossary-filter-btn`, `.glossary-meta-bar`, `.glossary-grid` (1 kolom di HP `360px`, 2 kolom di tablet `>= 768px`, 3 kolom di desktop `>= 1024px`), `.glossary-card`, `.glossary-card-top`, `.glossary-organ-badge`, `.glossary-speak-btn`, `.glossary-card-footer`, dan `.glossary-empty`.
- Gunakan variabel CSS tema agar kontras sempurna di Light Mode maupun Dark Mode.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-glosarium
   ```
2. Kerjakan file cakupan (`js/data.js`, `js/i18n.js`, `glossary.html`, `js/glossary.js`, `index.html`, `organ.html`, `js/viewer.js`, `css/style.css`, `issues/bonus-glosarium.md`).
3. Validasi sintaks seluruh file JS dengan `node --check`, pastikan seluruh kunci `I18N.id` dan `I18N.en` cocok 1:1 serta seluruh 24 item `GLOSSARY` valid & terjemahan `en`-nya lengkap, dan pastikan 0 `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Konstanta `GLOSSARY` di `js/data.js` berisi 24 istilah (4 per organ) yang akurat dengan terjemahan Bahasa Inggris (`en`) lengkap, dan tidak ada data glosarium yang di-hardcode di `glossary.html`.
- [ ] Halaman `glossary.html` dapat diakses dari header `index.html` maupun tombol di `organ.html` (`glossary.html?organ=<id>`), menampilkan daftar istilah terurut A–Z, filter per organ, pencarian bilingual (`ID` & `EN`), tombol Reset Filter saat kosong, dan link langsung ke `organ.html?id=<organId>`.
- [ ] Tombol dengar suara (`speechSynthesis`) di kartu glosarium berjalan aman (disembunyikan jika tidak didukung, menyesuaikan `id-ID` / `en-US`, berhenti saat ganti bahasa atau keluar halaman).
- [ ] Pergantian bahasa (`ID / EN`) memperbarui seluruh label, judul, filter, pengurutan A–Z, dan kartu glosarium secara instan tanpa reload dan tanpa mereset filter/pencarian aktif.
- [ ] Responsif (`360px`, `768px`, `1280px`), mendukung Dark Mode, dan mematuhi Standar Kode di `PLAN.md` (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, `textContent` untuk teks biasa, 0 JS `var`, 0 `console.log`).
