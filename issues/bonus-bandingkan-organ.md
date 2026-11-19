# [Fase Bonus] Mode Bandingkan 2 Organ Berdampingan (compare.html)

**Labels:** `bonus`, `feature`, `3d-viewer`, `education`  
**Nama Branch Wajib:** `bonus-bandingkan-organ`  
**Target PR:** `main`  
**Estimasi Waktu:** 45 – 60 menit  
**Prasyarat:** PR #31 sudah ter-merge ke `main`

---

## Deskripsi
Menambahkan fitur **Bandingkan 2 Organ Berdampingan** (`compare.html` dan `js/compare.js`) agar pengguna dapat memilih dua organ manusia sekaligus dalam satu layar (misalnya **Jantung vs Paru-paru**), memutar kedua model 3D secara bersamaan, membandingkan fungsi, fakta menarik, gangguan umum, serta membaca **keterkaitan kerja sama** antara kedua organ tersebut.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-bandingkan-organ
   ```
2. Kerjakan file cakupan (`compare.html`, `js/compare.js`, `index.html`, `organ.html`, `js/viewer.js`, `css/style.css`, `issues/bonus-bandingkan-organ.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add compare.html js/compare.js index.html organ.html js/viewer.js css/style.css issues/bonus-bandingkan-organ.md
   git commit -m "feat(bonus): tambah halaman bandingkan 2 organ 3d berdampingan"
   git push -u origin bonus-bandingkan-organ
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `bonus-bandingkan-organ` dari `main`.
- [ ] **1. Bangun `compare.html`**:
  - Header *sticky glassmorphism* dengan tombol kembali ke `index.html` dan tombol Dark Mode (`#theme-toggle`).
  - Lengkapi meta SEO, Open Graph, `img/favicon.svg`, script anti-FOUC tema, dan CDN `<model-viewer>` v4.0.0.
  - Sediakan bar kontrol pemilih **Organ A** (`#select-a`), tombol **Tukar (`#btn-swap`)**, dan **Organ B** (`#select-b`).
  - Sediakan kotak info **Hubungan Kedua Organ** (`#compare-relation`).
  - Sediakan grid 2 kolom (`#compare-grid`) berisi dua panel organ (masing-masing memiliki `<model-viewer>`, indikator loading, link ke halaman detail & AR, daftar fungsi, fakta, gangguan umum, dan tips sehat).
- [ ] **2. Bangun `js/compare.js`**:
  - Isi opsi `<select>` secara dinamis dari `ORGANS` di `js/data.js` (jangan hardcode di HTML).
  - Baca query URL `?a=<id>&b=<id>` (default `jantung` dan `paru-paru`; fallback aman jika parameter tidak valid).
  - Perbarui URL lewat `history.replaceState` saat user mengganti pilihan atau menekan tombol **Tukar**.
  - Render `<model-viewer>` dan informasi perbandingan secara aman menggunakan `textContent` / `createElement`.
  - Tampilkan penjelasan hubungan kerja sama antar pasangan organ di `#compare-relation` (mendukung seluruh kombinasi 6 organ, serta pesan khusus jika Organ A dan Organ B sama).
- [ ] **3. Hubungkan navigasi dari halaman lain**:
  - Tambahkan link **`Bandingkan`** (`compare.html`) di header `index.html`.
  - Tambahkan link **`Bandingkan organ ini`** (`compare.html?a=<id>`) di `.detail-actions` pada `organ.html` & `js/viewer.js`.
- [ ] **4. Tambahkan styling di `css/style.css`**:
  - Responsif: 1 kolom di HP (`360px`), 2 kolom berdampingan di tablet/desktop (`>= 768px`) tanpa *horizontal scroll*.
  - Mendukung mode terang dan mode gelap (`[data-theme="dark"]`).
- [ ] **5. Commit, push branch `bonus-bandingkan-organ`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Halaman `compare.html` dapat membandingkan 2 organ sekaligus lengkap dengan 2 `<model-viewer>` 3D interaktif dan teks perbandingan terstruktur.
- [ ] Dropdown pemilih organ diisi dinamis dari `js/data.js` (tidak hardcode di HTML) dan mendukung parameter URL `?a=...&b=...` serta tombol **Tukar**.
- [ ] Kotak **Hubungan Kedua Organ** menampilkan penjelasan yang relevan untuk kombinasi organ yang dipilih.
- [ ] Navigasi dari `index.html` dan `organ.html?id=...` mengarah dengan benar ke `compare.html`.
- [ ] Responsif (1 kolom HP, 2 kolom tablet/desktop, tanpa horizontal scroll), mendukung Dark Mode, dan mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 `var`, 0 `console.log`).
