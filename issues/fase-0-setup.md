# [Fase 0] Setup Proyek, Struktur Folder & Inisialisasi Git

**Labels:** `phase-0`, `chore`, `setup`  
**Nama Branch Wajib:** `fase-0-setup`  
**Target PR:** `main`  
**Estimasi Waktu:** 30 menit  
**Prasyarat:** Tidak ada

---

## Deskripsi
Menyiapkan struktur direktori dan file awal proyek **AR Organ Tubuh** sesuai spesifikasi di `PLAN.md` bagian 3, menginisialisasi repository Git, dan membuat Pull Request (PR) pertama untuk di-review oleh **Model Reviewer (Model Mahal)**.

---

## Struktur Folder Wajib
Struktur folder dan nama file harus persis seperti berikut:

```text
ar-organ/
├── index.html            # daftar organ
├── organ.html            # detail organ (id lewat query: organ.html?id=jantung)
├── quiz.html             # kuis (fase 5)
├── 404.html              # halaman tidak ditemukan
├── css/
│   └── style.css
├── js/
│   ├── data.js           # data semua organ + kuis
│   ├── app.js            # logika index.html
│   ├── viewer.js         # logika organ.html
│   └── quiz.js           # logika quiz.html (fase 5)
├── models/               # file .glb (maks 5 MB per file)
├── img/                  # thumbnail/poster organ (.webp) + favicon
├── _headers              # aturan cache Cloudflare
├── manifest.json         # PWA (fase bonus)
├── sw.js                 # service worker (fase bonus)
├── NOTES.md              # catatan masalah/keputusan
└── README.md
```

---

## Alur Git & Pull Request (Wajib)
1. Buat branch `fase-0-setup`:
   ```bash
   git checkout -b fase-0-setup
   ```
2. Kerjakan seluruh tugas Fase 0 di bawah.
3. Commit dengan pesan yang jelas:
   ```bash
   git add .
   git commit -m "chore(fase-0): setup struktur folder awal proyek"
   git push -u origin fase-0-setup
   ```
4. Buat **Pull Request (PR)** dari `fase-0-setup` ke `main` dengan menyertakan `Closes #<nomor-issue>`.
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-0-setup`.
- [ ] Buat seluruh folder (`css/`, `js/`, `models/`, `img/`) dan file kosong sesuai struktur di atas (gunakan `.gitkeep` di dalam folder kosong `models/` dan `img/` agar folder ter-track oleh Git).
- [ ] Buat file `.gitignore` yang berisi:
  ```gitignore
  node_modules
  .DS_Store
  ```
- [ ] Buat `README.md` awal yang berisi judul proyek (`# AR Organ Tubuh`).
- [ ] Commit, push branch `fase-0-setup`, dan buat PR ke `main`.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Struktur folder dan nama file sama persis dengan spesifikasi bagian 3 di `PLAN.md`.
- [ ] File `.gitignore` dan `README.md` sudah ada dan sesuai.
- [ ] Tidak ada kode fitur dari fase lain yang dicuri start.
- [ ] PR dari branch `fase-0-setup` ke `main` sudah terbuka dan bersih.

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-0-setup.md.
Kerjakan HANYA Fase 0 pada branch `fase-0-setup`.
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, commit, push ke branch `fase-0-setup`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pengecekan Acceptance Criteria untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-0-setup` terhadap spesifikasi di PLAN.md dan issues/fase-0-setup.md.
Periksa `git diff main...fase-0-setup`:
1. Pastikan seluruh struktur folder dan file sesuai bagian 3 PLAN.md.
2. Pastikan `.gitignore` dan `README.md` sudah benar.
3. Pastikan tidak ada perubahan di luar cakupan Fase 0.
Jika semua Acceptance Criteria lolos 100%, Approve dan Merge PR ke `main`. Jika ada kekurangan, berikan daftar revisi untuk Model Pekerja.
```
