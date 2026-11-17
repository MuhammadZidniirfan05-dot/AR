# [Fase 8] Pengujian Lintas Perangkat Asli (Android AR, iOS, Desktop & Slow 4G)

**Labels:** `phase-8`, `testing`, `qa`  
**Nama Branch Wajib:** `fase-8-tes-perangkat`  
**Target PR:** `main`  
**Estimasi Waktu:** 1 – 2 jam  
**Prasyarat:** PR Fase 7 sudah di-merge ke `main` dan URL publik `*.pages.dev` aktif

---

## Deskripsi
Melakukan pengujian menyeluruh terhadap aplikasi yang sudah ter-deploy di URL publik pada perangkat fisik asli (HP Android, iPhone, dan Desktop) serta simulasi jaringan lambat. Hasil pengujian dan perbaikan bug kecil (bila ditemukan) dicatat di branch `fase-8-tes-perangkat` dan diajukan lewat PR untuk diverifikasi oleh **Model Reviewer (Model Mahal)**.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-8-tes-perangkat
   ```
2. Lakukan pengujian pada seluruh poin checklist di bawah dan dokumentasikan hasil uji / catatan perangkat di `NOTES.md` (serta perbaiki bug kecil jika ditemukan).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add .
   git commit -m "test(fase-8): laporan hasil pengujian lintas perangkat di NOTES.md"
   git push -u origin fase-8-tes-perangkat
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Checklist Pengujian (Centang Satu per Satu)
- [ ] **Android + Chrome:** Model 3D tampil lancar, tombol AR muncul, dan fitur AR bekerja (Scene Viewer / WebXR) untuk menaruh organ di lantai/meja.
- [ ] **iPhone + Safari:** Model 3D tampil lancar, fitur AR via Quick Look bekerja (jika file `.usdz` disediakan di `modelIos`).
- [ ] **Desktop (Chrome, Firefox, Edge):** Model 3D tampil, bisa diputar/zoom, dan seluruh titik hotspot bekerja dengan baik.
- [ ] **Koneksi Lambat (Chrome DevTools > Network > Slow 4G):** Indikator loading (`progress-bar`) terlihat jelas saat model dimuat, halaman tidak blank/rusak.
- [ ] **Validasi Navigasi & Link:** Semua link internal dan eksternal bekerja, tidak ada halaman 404 tersembunyi, dan URL `organ.html?id=ngawur` mengarah dengan benar ke `404.html`.
- [ ] **Kebersihan Console:** Console browser bersih dari pesan error merah di semua halaman.
- [ ] **Kelengkapan Kredit:** Seluruh kredit model 3D tampil lengkap di halaman detail setiap organ.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Semua poin pada checklist pengujian di atas telah diuji dan dicatat hasilnya di `NOTES.md`.
- [ ] Jika ada bug yang diperbaiki pada branch ini, kode perbaikan tetap mematuhi seluruh Standar Kode di `PLAN.md`.

---

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-8-tes-perangkat` terhadap spesifikasi di PLAN.md dan issues/fase-8-tes-perangkat.md.
Periksa laporan hasil uji di `NOTES.md` dan `git diff main...fase-8-tes-perangkat`.
Pastikan seluruh 7 checklist pengujian perangkat sudah terverifikasi dan tidak ada regresi pada kode.
Jika semua lolos 100%, Approve dan Merge PR ke `main`.
```
