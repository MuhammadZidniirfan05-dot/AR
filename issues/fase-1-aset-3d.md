# [Fase 1] Kurasi, Kompresi Aset 3D (.glb) & Pembuatan Poster (.webp)

**Labels:** `phase-1`, `assets`, `3d-models`  
**Nama Branch Wajib:** `fase-1-aset-3d`  
**Target PR:** `main`  
**Estimasi Waktu:** 1 – 2 jam (atau 2 – 4 jam dengan kompresi & poster)  
**Prasyarat:** PR Fase 0 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Mencari, mengonversi, dan mengompresi 6 model 3D organ manusia berformat `.glb` beserta gambar thumbnail/poster `.webp` dan pencatatan lisensi/kreditnya di branch `fase-1-aset-3d`, lalu mengajukan PR untuk diverifikasi ukuran dan kelengkapannya oleh **Model Reviewer (Model Mahal)**.

> **Catatan:** Kurasi dan pengunduhan model 3D dikerjakan oleh pemilik proyek (manusia), namun pengecekan ukuran file (< 5 MB), penamaan, dan kelengkapan kredit di `NOTES.md` tetap melewati PR review.

---

## Daftar 6 Organ Wajib (MVP)
| `id` | Nama Organ | File Model | File Poster |
| :--- | :--- | :--- | :--- |
| `jantung` | Jantung | `models/jantung.glb` | `img/jantung.webp` |
| `paru-paru` | Paru-paru | `models/paru-paru.glb` | `img/paru-paru.webp` |
| `otak` | Otak | `models/otak.glb` | `img/otak.webp` |
| `lambung` | Lambung | `models/lambung.glb` | `img/lambung.webp` |
| `ginjal` | Ginjal | `models/ginjal.glb` | `img/ginjal.webp` |
| `hati` | Hati | `models/hati.glb` | `img/hati.webp` |

---

## Alur Git & Pull Request (Wajib)
1. Pastikan branch `main` sudah terbaru, lalu buat branch `fase-1-aset-3d`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-1-aset-3d
   ```
2. Masukkan ke-6 model `.glb`, ke-6 poster `.webp`, dan catat kredit di `NOTES.md`.
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add models/ img/ NOTES.md
   git commit -m "feat(fase-1): tambah aset 3d glb, poster webp, dan kredit 6 organ"
   git push -u origin fase-1-aset-3d
   ```
4. **STOP — Jangan merge sendiri!** Biarkan **Model Reviewer (Model Mahal)** memverifikasi ukuran file, penamaan, dan kelengkapan kredit.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-1-aset-3d` dari `main`.
- [ ] Cari model 3D untuk ke-6 organ di atas dari sumber resmi/terbuka:
  - Sketchfab (filter *Downloadable*, lisensi **CC-BY** atau **CC0**, hindari lisensi NC jika akan dipakai promosi jasa)
  - NIH 3D (`https://3d.nih.gov`)
  - Poly Pizza / Free3D (cadangan)
- [ ] Download dalam format glTF/GLB. Jika format lain, konversi menggunakan Blender (`File > Import`, lalu `Export > glTF Binary (.glb)`).
- [ ] Kompres setiap model hingga berukuran **maksimal 5 MB** per file dengan perintah:
  ```bash
  npx @gltf-transform/cli optimize input.glb models/jantung.glb --compress draco --texture-compress webp --texture-size 1024
  ```
- [ ] Simpan ke-6 file di folder `models/` dengan nama persis sesuai `id`:
  - [ ] `models/jantung.glb`
  - [ ] `models/paru-paru.glb`
  - [ ] `models/otak.glb`
  - [ ] `models/lambung.glb`
  - [ ] `models/ginjal.glb`
  - [ ] `models/hati.glb`
- [ ] Catat kredit lengkap (judul asli model, nama pembuat, URL sumber, jenis lisensi) untuk masing-masing model di `NOTES.md`.
- [ ] Buat gambar poster/thumbnail untuk tiap organ (screenshot model, ukuran `600x600` px, format `.webp`) dan simpan di `img/`:
  - [ ] `img/jantung.webp`
  - [ ] `img/paru-paru.webp`
  - [ ] `img/otak.webp`
  - [ ] `img/lambung.webp`
  - [ ] `img/ginjal.webp`
  - [ ] `img/hati.webp`
- [ ] Commit, push branch `fase-1-aset-3d`, dan buat PR ke `main`.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Tersedia 6 file `.glb` di `models/` dengan nama persis sesuai `id`, masing-masing berukuran di bawah 5 MB.
- [ ] Tersedia 6 file poster `.webp` (`600x600`) di `img/` dengan nama persis sesuai `id`.
- [ ] Setiap model `.glb` valid (header magic `glTF` benar dan bisa dibuka di https://modelviewer.dev/editor/ tanpa error).
- [ ] Semua kredit model (judul, pembuat, URL sumber, lisensi CC0/CC-BY) tercatat lengkap di `NOTES.md`.

---

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-1-aset-3d` terhadap spesifikasi di PLAN.md dan issues/fase-1-aset-3d.md.
1. Cek keberadaan dan ukuran ke-6 file `.glb` di `models/` (pastikan semua < 5 MB dan penamaan huruf kecil sesuai id).
2. Cek keberadaan ke-6 file `.webp` di `img/`.
3. Cek kelengkapan kredit ke-6 model (judul, pembuat, sumber URL, lisensi) di `NOTES.md`.
Jika semua Acceptance Criteria lolos 100%, Approve dan Merge PR ke `main`. Jika ada file yang melebihi 5 MB atau kredit belum lengkap, minta revisi.
```
