# [Fase 9] Dokumentasi Portofolio Lengkap (README.md, Screenshot, GIF AR & QR Code)

**Labels:** `phase-9`, `documentation`  
**Nama Branch Wajib:** `fase-9-dokumentasi`  
**Target PR:** `main`  
**Estimasi Waktu:** 2 jam  
**Prasyarat:** PR Fase 8 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Menyusun dokumentasi akhir proyek di `README.md` sebagai portofolio yang informatif dan menarik pada branch `fase-9-dokumentasi`, dilengkapi link demo publik, QR code untuk akses cepat dari HP, screenshot antarmuka, GIF/video demo AR, serta daftar kredit model 3D.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-9-dokumentasi
   ```
2. Tambahkan aset dokumentasi (screenshot, GIF demo AR, QR code) di `img/` dan lengkapi `README.md`.
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add README.md img/
   git commit -m "docs(fase-9): lengkapi README portofolio dengan screenshot, QR code, dan kredit"
   git push -u origin fase-9-dokumentasi
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review akhir dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-9-dokumentasi` dari `main`.
- [ ] **1. Ambil aset visual dokumentasi**:
  - Ambil minimal **3 screenshot** tampilan web (halaman daftar organ, halaman detail + hotspot 3D, halaman kuis / dark mode).
  - Rekam **GIF atau video pendek** layar HP saat menaruh model organ di ruangan menggunakan mode AR.
  - Buat gambar **QR Code** yang mengarah ke URL demo `*.pages.dev` agar pengunjung di PC bisa langsung scan dengan HP.
- [ ] **2. Lengkapi `README.md`** dengan bagian-bagian berikut:
  - Judul proyek & deskripsi singkat yang jelas.
  - Link Demo langsung + gambar QR Code.
  - GIF Demo AR & minimal 3 screenshot.
  - Daftar fitur utama.
  - Teknologi yang digunakan.
  - Cara menjalankan proyek secara lokal (`npx serve` / Live Server).
  - Struktur folder singkat.
  - Tabel/daftar lengkap kredit seluruh model 3D beserta lisensinya.
  - Lisensi kode proyek.
- [ ] **3. Commit, push branch `fase-9-dokumentasi`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Orang yang baru pertama kali membuka `README.md` dapat memahami tujuan dan fitur proyek ini dalam waktu 30 detik.
- [ ] Link demo, QR code, minimal 3 screenshot, GIF demo AR, struktur folder, cara menjalankan lokal, dan tabel kredit model 3D tampil lengkap tanpa gambar yang rusak (*broken image*).
- [ ] Seluruh **Definition of Done (Bagian 8 `PLAN.md`)** telah terpenuhi 100%.

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-9-dokumentasi.md.
Kerjakan HANYA Fase 9 pada branch `fase-9-dokumentasi` (checkout dari `main`).
Susun README.md portofolio secara lengkap dan rapi sesuai spesifikasi Fase 9.
Setelah selesai, commit, push ke branch `fase-9-dokumentasi`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request akhir pada branch `fase-9-dokumentasi` terhadap spesifikasi di PLAN.md dan issues/fase-9-dokumentasi.md.
Periksa `git diff main...fase-9-dokumentasi`:
1. Pastikan README.md memiliki semua elemen wajib (judul, deskripsi, link demo, QR code, minimal 3 screenshot, GIF demo AR, fitur, teknologi, cara menjalankan lokal, struktur folder, daftar kredit lengkap 6 model 3D, dan lisensi).
2. Pastikan semua path gambar/link di README.md valid dan tidak ada yang broken.
3. Verifikasi checklist "8. Definisi Selesai (Definition of Done)" di PLAN.md.
Jika semua lolos 100%, Approve dan Merge PR ke `main`.
```
