# [Fase 5] Fitur Kuis Interaktif (quiz.html, js/quiz.js) & Skor Tertinggi

**Labels:** `phase-5`, `feature`, `quiz`  
**Nama Branch Wajib:** `fase-5-kuis`  
**Target PR:** `main`  
**Estimasi Waktu:** 2 – 3 jam  
**Prasyarat:** PR Fase 4 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Membangun halaman kuis interaktif (`quiz.html` dan `js/quiz.js`) yang mendukung mode semua organ maupun per organ (`quiz.html?organ=<id>`), pengacakan soal dengan algoritma Fisher-Yates, umpan balik jawaban beserta penjelasan, dan penyimpanan skor tertinggi di `localStorage`.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-5-kuis
   ```
2. Kerjakan hanya file cakupan Fase 5 (`js/data.js`, `quiz.html`, `js/quiz.js`, `index.html`, `organ.html`, `js/viewer.js`, `css/style.css`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add js/data.js quiz.html js/quiz.js index.html organ.html js/viewer.js css/style.css
   git commit -m "feat(fase-5): halaman kuis interaktif fisher-yates dan skor tertinggi"
   git push -u origin fase-5-kuis
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-5-kuis` dari `main`.
- [ ] **1. Lengkapi data `QUIZ` di `js/data.js`**:
  - Pastikan terdapat minimal **12 soal kuis** secara total (minimal 2 soal untuk masing-masing dari 6 organ).
- [ ] **2. Bangun `quiz.html` & `js/quiz.js`**:
  - Dukung 2 mode URL:
    - `quiz.html`: menampilkan soal dari semua organ secara acak.
    - `quiz.html?organ=<id>`: memfilter soal khusus untuk organ dengan `organId === id`.
  - Acak urutan soal menggunakan algoritma **Fisher-Yates shuffle** (dilarang menggunakan `.sort(() => Math.random() - 0.5)`).
  - Tampilkan 1 soal per layar yang memuat:
    - Teks progress (contoh: `"Soal 2 dari 6"`).
    - Teks pertanyaan.
    - 4 tombol pilihan jawaban.
  - Saat user memilih salah satu jawaban:
    - Kunci seluruh tombol pilihan agar jawaban tidak bisa diubah lagi.
    - Tandai pilihan yang benar dan salah secara visual.
    - Tampilkan teks `penjelasan` dari soal tersebut.
    - Tampilkan tombol **"Lanjut"** untuk menuju soal berikutnya.
  - Pada layar hasil akhir:
    - Tampilkan skor akhir dan skor tertinggi (*High Score*).
    - Simpan skor tertinggi ke `localStorage` (wajib dibungkus dengan blok `try / catch`).
    - Tampilkan tombol **"Ulangi"** dan **"Kembali ke daftar"** (`index.html`).
- [ ] **3. Hubungkan navigasi kuis di halaman lain**:
  - Di `organ.html` / `js/viewer.js`: pastikan `#link-kuis` ("Ikut kuis organ ini") mengarah ke `quiz.html?organ=<id>`.
  - Di `index.html`: tambahkan link navigasi **"Kuis"** di dalam `<header>` yang mengarah ke `quiz.html`.
- [ ] **4. Tambahkan styling halaman kuis di `css/style.css`**.
- [ ] **5. Commit, push branch `fase-5-kuis`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Kuis dapat dimainkan dari soal pertama hingga layar skor akhir tanpa error di mode semua organ (`quiz.html`) maupun mode per organ (`quiz.html?organ=jantung`).
- [ ] Pengacakan soal benar-benar menggunakan algoritma Fisher-Yates (bukan `.sort()`).
- [ ] Jawaban yang sudah dipilih langsung terkunci dan tidak bisa diubah.
- [ ] Total soal di `js/data.js` minimal 12 soal (minimal 2 soal per organ).
- [ ] Skor tertinggi tersimpan di `localStorage` (dibungkus `try/catch`) dan tampil di halaman akhir.

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-5-kuis.md.
Kerjakan HANYA Fase 5 pada branch `fase-5-kuis` (checkout dari `main`).
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, cek Acceptance Criteria Fase 5 satu per satu, commit, push ke branch `fase-5-kuis`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-5-kuis` terhadap spesifikasi di PLAN.md dan issues/fase-5-kuis.md.
Periksa `git diff main...fase-5-kuis`:
1. Pastikan `QUIZ` di `js/data.js` memiliki minimal 12 soal (minimal 2 per organ).
2. Pastikan fungsi pengacak soal di `js/quiz.js` menggunakan algoritma Fisher-Yates murni, BUKAN `.sort(() => Math.random() - 0.5)`.
3. Pastikan akses `localStorage` dibungkus `try / catch`.
4. Pastikan tombol pilihan dikunci setelah user memilih jawaban, penjelasan tampil, dan navigasi dari `index.html` serta `organ.html?id=...` bekerja.
Jika semua lolos 100%, Approve dan Merge PR ke `main`. Jika ada bug/pelanggaran, berikan instruksi revisi ke Model Pekerja.
```
