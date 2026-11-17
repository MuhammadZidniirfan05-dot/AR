# [Fase 6] Polish UI, Dark Mode, Aksesibilitas, SEO & Optimasi Lighthouse 90+

**Labels:** `phase-6`, `enhancement`, `ui-ux`, `accessibility`, `performance`, `seo`  
**Nama Branch Wajib:** `fase-6-polish`  
**Target PR:** `main`  
**Estimasi Waktu:** 3 – 4 jam  
**Prasyarat:** PR Fase 5 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Menyempurnakan tampilan visual, menambahkan fitur *Dark Mode*, memastikan aksesibilitas keyboard dan kontras warna, melengkapi tag SEO/Open Graph serta favicon, dan mengoptimalkan performa hingga mencapai skor **Lighthouse Mobile 90+** di semua kategori.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-6-polish
   ```
2. Kerjakan tugas Fase 6 pada file HTML, CSS, JS, dan favicon di `img/`.
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add .
   git commit -m "style(fase-6): dark mode, aksesibilitas, seo, dan optimasi performa"
   git push -u origin fase-6-polish
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-6-polish` dari `main`.
- [ ] **1. Dark Mode**:
  - Gunakan CSS Custom Properties (variabel CSS) pada `:root` dan `[data-theme="dark"]` di `css/style.css`.
  - Tambahkan tombol toggle tema di `<header>` pada semua halaman.
  - Simpan preferensi tema user di `localStorage` (dengan `try/catch`), dan gunakan `prefers-color-scheme` sebagai nilai default jika belum ada preferensi tersimpan.
- [ ] **2. Responsivitas**:
  - Uji tampilan semua halaman (`index.html`, `organ.html`, `quiz.html`, `404.html`) pada lebar viewport `360px`, `768px`, dan `1280px`.
  - Pastikan tidak ada *horizontal scroll* di ukuran layar mana pun.
- [ ] **3. Aksesibilitas (a11y)**:
  - Semua elemen `<img>` memiliki atribut `alt` yang deskriptif.
  - Semua tombol dan input memiliki label yang jelas (`aria-label` bila perlu).
  - Rasio kontras warna teks dan latar belakang memenuhi standar WCAG AA baik di mode terang maupun gelap.
  - Indikator `:focus-visible` untuk navigasi keyboard terlihat jelas di semua elemen interaktif.
- [ ] **4. SEO Dasar & Open Graph**:
  - Lengkapi `<title>`, `<meta name="description">`, `<meta name="viewport">`, serta tag Open Graph (`og:title`, `og:description`, `og:image`) di setiap halaman HTML.
- [ ] **5. Favicon & Optimasi Performa**:
  - Tambahkan favicon di `img/` dan pasang tag `<link rel="icon">` di semua halaman.
  - Pastikan gambar menggunakan format `.webp` dan atribut `loading="lazy"`.
  - Pastikan tidak ada CSS/JS berlebih dan tidak ada `console.log` yang tertinggal di seluruh file `.js`.
  - Jalankan audit **Lighthouse (mode Mobile)** dan pastikan skor **Performance, Accessibility, Best Practices, dan SEO >= 90** (jika Performance di bawah 90 karena ukuran model 3D, catat penyebabnya di `NOTES.md`).
- [ ] **6. Commit, push branch `fase-6-polish`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Dark mode berfungsi di semua halaman, mengikuti `prefers-color-scheme` secara default, dan pilihan user tersimpan di `localStorage` (dengan `try/catch`).
- [ ] Tidak ada *horizontal scroll* pada lebar layar `360px`, `768px`, dan `1280px`.
- [ ] Seluruh tag SEO, Open Graph, dan Favicon terpasang di semua halaman HTML.
- [ ] Tidak ada satu pun `console.log` atau `var` di seluruh file JS.
- [ ] Skor Lighthouse Mobile mencapai **90 atau lebih** di semua kategori (atau alasan tercatat jelas di `NOTES.md` jika Performance dipengaruhi ukuran model).

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-6-polish.md.
Kerjakan HANYA Fase 6 pada branch `fase-6-polish` (checkout dari `main`).
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, cek Acceptance Criteria Fase 6 satu per satu, commit, push ke branch `fase-6-polish`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-6-polish` terhadap spesifikasi di PLAN.md dan issues/fase-6-polish.md.
Periksa `git diff main...fase-6-polish`:
1. Pastikan Dark Mode memakai variabel CSS (`:root` dan `[data-theme="dark"]`), default `prefers-color-scheme`, dan penyimpanan `localStorage` dibungkus `try/catch`.
2. Pastikan tidak ada horizontal overflow pada 360px, 768px, dan 1280px.
3. Pastikan meta SEO, Open Graph, atribut `alt`, `aria-label`, `:focus-visible`, dan favicon sudah lengkap di seluruh halaman.
4. Pastikan 0 `console.log` dan 0 `var` di seluruh repositori.
Jika semua lolos 100%, Approve dan Merge PR ke `main`. Jika ada kekurangan, berikan instruksi revisi ke Model Pekerja.
```
