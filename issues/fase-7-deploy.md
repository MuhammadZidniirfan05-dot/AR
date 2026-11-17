# [Fase 7] Konfigurasi Cache (_headers) & Deploy ke Cloudflare Pages

**Labels:** `phase-7`, `deployment`, `cloudflare`  
**Nama Branch Wajib:** `fase-7-deploy`  
**Target PR:** `main`  
**Estimasi Waktu:** 1 jam  
**Prasyarat:** PR Fase 6 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Menyiapkan konfigurasi HTTP headers (`_headers`) untuk *caching* aset 3D/gambar dan keamanan di Cloudflare Pages pada branch `fase-7-deploy`, me-review dan me-merge ke `main`, lalu menghubungkan repository GitHub ke Cloudflare Pages untuk *auto-deploy*.

---

## Isi File `_headers` Wajib (di root repo)
```text
/models/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```
> *Catatan: Karena file di `/models/*` dan `/img/*` di-cache selama 1 tahun (`immutable`), jika di kemudian hari mengganti isi file model, ganti juga nama filenya (contoh: `jantung-v2.glb`).*

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-7-deploy
   ```
2. Isi file `_headers` sesuai spesifikasi di atas.
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add _headers
   git commit -m "chore(fase-7): tambah aturan cache dan security headers cloudflare"
   git push -u origin fase-7-deploy
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)** sebelum di-merge dan di-deploy ke produksi.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-7-deploy` dari `main`.
- [ ] **1. Isi file `_headers`** di root proyek sesuai konfigurasi di atas, lalu commit, push, dan buat PR ke `main`.
- [ ] **2. Hubungkan GitHub ke Cloudflare Pages** (setelah PR di-merge ke `main`):
  - Buka Cloudflare Dashboard > **Workers & Pages** > **Create** > **Pages** > **Connect to Git** > pilih repository GitHub.
  - Atur konfigurasi build:
    - **Framework preset:** `None`
    - **Build command:** *(kosongkan)*
    - **Build output directory:** `/` (atau `.`)
  - Klik **Deploy**.
- [ ] **3. (Opsional)** Hubungkan custom domain melalui tab *Custom domains* di project Cloudflare Pages.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] File `_headers` di root proyek persis sesuai spesifikasi bagian 5 (Fase 7) di `PLAN.md`.
- [ ] URL publik `*.pages.dev` aktif dan seluruh halaman (`index.html`, `organ.html`, `quiz.html`, `404.html`) berfungsi normal.
- [ ] Seluruh model `.glb` termuat dari URL publik tanpa error di browser console.
- [ ] Tombol **Lihat di AR** muncul ketika URL publik dibuka dari HP Android asli yang mendukung ARCore.

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-7-deploy.md.
Kerjakan HANYA Fase 7 (bagian kode/konfigurasi `_headers`) pada branch `fase-7-deploy` (checkout dari `main`).
Setelah selesai, commit, push ke branch `fase-7-deploy`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-7-deploy` terhadap spesifikasi di PLAN.md dan issues/fase-7-deploy.md.
Periksa `git diff main...fase-7-deploy`:
1. Pastikan isi file `_headers` valid untuk Cloudflare Pages dan persis sesuai spesifikasi.
2. Pastikan tidak ada file lain di luar cakupan Fase 7 yang diubah.
Jika lolos 100%, Approve dan Merge PR ke `main` agar Cloudflare Pages men-deploy versi terbaru.
```
