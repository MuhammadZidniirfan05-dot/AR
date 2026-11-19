# [Fase Bonus B3] Dual Bahasa Indonesia / Inggris (ID / EN)

**Labels:** `bonus`, `i18n`, `enhancement`, `accessibility`  
**Nama Branch Wajib:** `bonus-b3-i18n`  
**Target PR:** `main`  
**Estimasi Waktu:** 60–90 menit  
**Prasyarat:** PR #35 sudah ter-merge ke `main`

---

## Deskripsi
Menambahkan dukungan **Dual Bahasa (Bahasa Indonesia `id` & Bahasa Inggris `en`)** sesuai rencana **Fase Bonus B3** di `PLAN.md`. Pengguna dapat mengganti bahasa secara instan lewat tombol di header pada seluruh halaman (`index.html`, `organ.html`, `quiz.html`, `compare.html`, `404.html`), preferensi disimpan di `localStorage` (`ar-organ-lang`), dan seluruh teks UI, materi organ, hotspot, kuis, perbandingan organ, simulasi, hingga bahasa narasi suara (`speechSynthesis`) ikut berganti otomatis tanpa perlu reload halaman.

---

## Poin Perubahan Utama

### 1. Data Terjemahan Bahasa Inggris pada `js/data.js`
- Pada setiap objek di `ORGANS`, tambahkan properti `en` yang berisi terjemahan lengkap Bahasa Inggris:
  - `nama`, `ringkas`, `deskripsi`, `fungsi` (array 3 string), `fakta`
  - `hotspots`: peta/objek berdasarkan `hotspot.id` (atau field `en: { label, info }` langsung di tiap objek hotspot) untuk semua 24 hotspot (4 per organ)
  - `penyakit`: array berisi `{ nama, info }` dalam Bahasa Inggris (atau field `en: { nama, info }` di tiap item penyakit)
  - `tipsSehat`: array 3 string dalam Bahasa Inggris
- Pada setiap objek di `QUIZ` (semua 12 soal), tambahkan properti `en`:
  - `pertanyaan`, `pilihan` (array 4 string dengan urutan jawaban benar yang sama persis), `penjelasan`
- Tetap pertahankan semua field Bahasa Indonesia (`nama`, `ringkas`, `deskripsi`, `fungsi`, `fakta`, `hotspots`, `penyakit`, `tipsSehat`, `pertanyaan`, `pilihan`, `penjelasan`) tanpa mengubah skema aslinya agar 100% *backward compatible*.
- Perbarui fungsi `applyTheme(theme)` di `js/data.js` agar label & `aria-label` tombol `#theme-toggle` mengikuti bahasa aktif (`Gelap`/`Terang` saat `id`, `Dark`/`Light` saat `en`).

### 2. Modul Terjemahan & Engine Bahasa (`js/i18n.js`)
Buat file baru `js/i18n.js` (dimuat tepat setelah `js/data.js` di seluruh 5 file HTML) yang berisi:
- Objek `I18N` dengan 2 kamus lengkap (`id` dan `en`) untuk seluruh teks antarmuka statis maupun dinamis di ke-5 halaman:
  - Header & navigasi (`AR Organ Tubuh` / `AR Human Organs`, `Tentang` / `About`, `Bandingkan` / `Compare`, `Kuis` / `Quiz`, `Kembali` / `Back`, `Kembali ke Daftar` / `Back to List`, tombol tema `Gelap`/`Terang` <-> `Dark`/`Light`)
  - `index.html`: judul toolbar, jumlah model, placeholder & label pencarian, pesan kosong, seluruh isi modal Tentang (`#about-modal`), dan footer
  - `organ.html`: tombol AR (`Lihat di AR` / `View in AR`), catatan AR, judul 3 tab belajar (`Ringkasan & Fungsi`, `Gangguan & Penyakit`, `Jaga Kesehatan`), heading & teks pengantar tab, chip anatomi heading, tombol ukuran teks (`Teks: Normal`/`Besar` <-> `Text: Normal`/`Large`), tombol TTS (`Bacakan`/`Berhenti` <-> `Read Aloud`/`Stop`), tombol aksi (`Ikut kuis organ ini`, `Bandingkan organ ini`), label kredit (`Kredit Model 3D`, `Judul`, `Pembuat`, `Lisensi`, `Sumber`), serta seluruh label/status simulasi detak jantung & pernapasan (`Mulai Simulasi`, `Hentikan`, `Istirahat`, `Normal`, `Olahraga`, `Suara: Aktif/Bisu`, `Getar: Aktif/Mati`, teks status Sistol/Diastol/Inspirasi/Ekspirasi)
  - `compare.html`: label pemilih organ pertama/kedua, tombol Tukar, judul & pesan hubungan kedua organ, tombol `Detail & AR`, heading `Fungsi Utama`, `Fakta Menarik`, `Gangguan Umum`, `Tips Menjaga Kesehatan`
  - `quiz.html`: mode kuis (`Mode: Semua Organ` / `Mode: All Organs`), progress (`Soal X dari Y` / `Question X of Y`), status jawaban (`Benar!` / `Correct!`, `Kurang tepat.` / `Not quite.`), tombol `Lanjut` / `Next` & `Lihat Hasil` / `View Results`, halaman hasil (`Hasil Kuis`, `Skor kamu`, `Skor tertinggi`, `Ulangi`, `Kembali ke daftar`)
  - `404.html`: judul, pesan, dan tombol kembali ke daftar
- Fungsi helper yang bersih (`camelCase`, `const`/`let`):
  - `getCurrentLang()`: membaca `localStorage.getItem("ar-organ-lang")` di dalam `try / catch`, fallback `"id"`.
  - `t(key, vars)`: mengambil teks terjemahan untuk bahasa aktif dan mengganti placeholder sederhana (misal `{current}`, `{total}`, `{score}`, `{name}`).
  - `getOrganText(organ, lang)`: mengembalikan objek teks organ sesuai bahasa (`id` atau `en`) dengan fallback aman ke `id`.
  - `getQuizText(item, lang)`: mengembalikan objek teks soal kuis sesuai bahasa (`id` atau `en`) dengan fallback aman ke `id`.
  - `applyTranslations(lang)`: mengubah `document.documentElement.lang = lang`, memperbarui seluruh elemen ber-atribut `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label`, memperbarui tombol `#lang-toggle` dan `#theme-toggle`, menyimpan pilihan ke `localStorage` (`try / catch`), serta memicu event `document.dispatchEvent(new CustomEvent("ar-lang-change", { detail: { lang } }))`.

### 3. Tombol Switch Bahasa (`#lang-toggle`) di Semua Halaman HTML
- Tambahkan tombol `<button id="lang-toggle" class="btn-lang" type="button" aria-label="Ganti ke Bahasa Inggris">EN</button>` di header (sebelah `#theme-toggle`) pada:
  - `index.html`
  - `organ.html`
  - `quiz.html`
  - `compare.html`
  - `404.html`
- Tambahkan atribut `data-i18n` (serta `data-i18n-placeholder` / `data-i18n-aria-label` bila perlu) pada elemen teks statis di ke-5 halaman HTML, dan muat `<script src="js/i18n.js"></script>` tepat setelah `<script src="js/data.js"></script>`.

### 4. Sinkronisasi Instan pada Skrip Halaman (`app.js`, `viewer.js`, `compare.js`, `quiz.js`)
Dengarkan event `"ar-lang-change"` pada `document` agar pergantian bahasa langsung memperbarui konten tanpa reload:
- **`js/app.js`**:
  - Render kartu organ memakai nama & ringkasan sesuai bahasa aktif (`getOrganText(o)`).
  - Pencarian (`#search`) mencocokkan kueri terhadap nama organ Bahasa Indonesia **maupun** Bahasa Inggris sehingga pencarian tetap ramah di kedua bahasa.
  - Memperbarui `document.title` saat bahasa berganti.
- **`js/viewer.js`**:
  - Fungsi render konten teks organ (judul, `document.title`, deskripsi, fungsi, fakta, penyakit, tips, blok kredit, label hotspot 3D, chip `#hotspot-chips`, dan panel `#info` jika sedang terbuka) agar dapat dipanggil ulang saat bahasa berubah **tanpa memuat ulang `<model-viewer>`**.
  - Tombol `#btn-font-size` mengikuti bahasa aktif (`Teks: Normal`/`Besar` <-> `Text: Normal`/`Large`).
  - Narasi suara `#btn-tts`: otomatis menyesuaikan `utterance.lang` (`"id-ID"` saat `id`, `"en-US"` saat `en`), membangun ulang teks narasi dalam bahasa aktif, dan menghentikan ucapan yang sedang berjalan bila bahasa diubah.
  - Simulasi `#sim-panel`: memperbarui judul, tombol kontrol, dan teks status ke bahasa aktif.
- **`js/compare.js`**:
  - Tambahkan kamus `RELATIONS_EN` untuk ke-15 pasangan organ (dengan kunci alfabetis yang sama persis dengan `RELATIONS`).
  - Perbarui label `<option>` pada `#select-a` & `#select-b` (mempertahankan `value` yang sedang dipilih), render ulang teks kolom perbandingan tanpa mereload `<model-viewer>`, dan perbarui teks hubungan kedua organ serta `document.title`.
- **`js/quiz.js`**:
  - Render soal, pilihan, progress, mode kuis, tombol lanjut, penjelasan, dan hasil kuis sesuai bahasa aktif.
  - Jika bahasa diganti di tengah kuis (baik sebelum maupun sesudah menjawab soal saat ini), perbarui teks soal/pilihan/feedback/hasil secara langsung tanpa mereset progres atau skor kuis.

### 5. Styling (`css/style.css`)
- Tambahkan gaya `.btn-lang` yang serasi dengan `.btn-theme`, mendukung Light Mode, Dark Mode, aksesibilitas fokus (`:focus-visible`), dan tetap rapi di layar mobile `360px` tanpa scroll horizontal.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-b3-i18n
   ```
2. Kerjakan file cakupan (`js/data.js`, `js/i18n.js`, `js/app.js`, `js/viewer.js`, `js/compare.js`, `js/quiz.js`, `index.html`, `organ.html`, `compare.html`, `quiz.html`, `404.html`, `css/style.css`, `issues/bonus-b3-i18n.md`).
3. Validasi sintaks seluruh file JS dengan `node --check` dan pastikan 0 `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Tombol `#lang-toggle` tersedia di header seluruh 5 halaman (`index.html`, `organ.html`, `compare.html`, `quiz.html`, `404.html`), dapat diklik untuk berganti antara `id` dan `en` secara instan tanpa reload, dan preferensi tersimpan di `localStorage` (`ar-organ-lang`) dengan `try / catch`.
- [ ] Atribut `document.documentElement.lang` berubah sesuai bahasa aktif (`"id"` atau `"en"`), dan tombol `#theme-toggle` ikut menyesuaikan bahasanya (`Gelap`/`Terang` <-> `Dark`/`Light`).
- [ ] Seluruh data 6 organ (nama, ringkas, deskripsi, fungsi, fakta, 24 hotspot, penyakit, tips sehat), 12 soal kuis, dan 15 hubungan pasangan organ di `compare.js` memiliki terjemahan Bahasa Inggris yang lengkap dan akurat tanpa hardcode data organ di HTML.
- [ ] Fitur di `organ.html` tetap berjalan normal di kedua bahasa: 3 tab belajar, chip hotspot sinkron dengan 3D, pengatur ukuran teks, simulasi jantung/paru-paru, serta TTS (`utterance.lang = "id-ID"` / `"en-US"`).
- [ ] Pergantian bahasa di `organ.html` dan `compare.html` tidak memuat ulang `<model-viewer>`, dan di `quiz.html` tidak mereset skor/progres kuis yang sedang berlangsung.
- [ ] Responsif (`360px`, `768px`, `1280px`), mendukung Dark Mode, dan mematuhi Standar Kode di `PLAN.md` (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 JS `var`, 0 `console.log`, `textContent` untuk teks biasa).
