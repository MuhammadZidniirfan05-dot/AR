# [Fase 3] Halaman Detail Organ, 3D Model Viewer, Tombol AR & 404 (organ.html)

**Labels:** `phase-3`, `feature`, `ar`, `3d-viewer`  
**Nama Branch Wajib:** `fase-3-detail-ar`  
**Target PR:** `main`  
**Estimasi Waktu:** 3 – 4 jam  
**Prasyarat:** PR Fase 2 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Membangun halaman detail organ (`organ.html` dan `js/viewer.js`) yang memuat model 3D interaktif menggunakan `<model-viewer>` dari CDN, tombol **Lihat di AR**, informasi lengkap organ, blok kredit, serta halaman `404.html` jika parameter `id` tidak valid.

---

## Kerangka HTML Wajib (`organ.html`)
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
...
<a href="index.html">&larr; Kembali</a>
<model-viewer id="mv"
  camera-controls auto-rotate shadow-intensity="1"
  ar ar-modes="webxr scene-viewer quick-look"
  ar-scale="auto" loading="eager" reveal="auto">
  <button slot="ar-button" class="btn-ar">Lihat di AR</button>
  <div slot="progress-bar" class="progress"></div>
</model-viewer>
<h1 id="nama"></h1>
<p id="deskripsi"></p>
<h2>Fungsi</h2><ul id="fungsi"></ul>
<p id="fakta"></p>
<a id="link-kuis" href="#">Ikut kuis organ ini</a>
<section id="kredit"></section>
```

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-3-detail-ar
   ```
2. Kerjakan hanya file cakupan Fase 3 (`organ.html`, `404.html`, `js/viewer.js`, `css/style.css`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add organ.html 404.html js/viewer.js css/style.css
   git commit -m "feat(fase-3): halaman detail organ, model-viewer AR, dan 404"
   git push -u origin fase-3-detail-ar
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-3-detail-ar` dari `main`.
- [ ] **1. Bangun `organ.html`** sesuai kerangka di atas dan tambahkan teks keterangan kecil di dekat viewer: `"Fitur AR tersedia di HP Android/iPhone yang didukung."`
- [ ] **2. Bangun `404.html`** sederhana dengan pesan halaman tidak ditemukan dan tombol kembali ke `index.html`.
- [ ] **3. Bangun `js/viewer.js`**:
  - Ambil parameter `id` dari URL: `new URLSearchParams(location.search).get("id")`.
  - Cari data organ di `ORGANS`. Jika tidak ditemukan, alihkan dengan `location.replace("404.html")`.
  - Set atribut `src`, `poster`, `alt`, dan `ios-src` (hanya jika `modelIos` tidak `null`) pada elemen `<model-viewer id="mv">`.
  - Isi elemen `#nama`, `#deskripsi`, daftar `<li>` pada `#fungsi`, `#fakta`, dan blok `#kredit` (judul model, pembuat, link sumber eksternal, dan lisensi).
  - Set judul tab dokumen: `document.title = "<Nama> | AR Organ Tubuh"`.
- [ ] **4. Tambahkan styling di `css/style.css`**:
  - Tinggi `<model-viewer>` sekitar `60vh` di HP, lebar penuh (`100%`), dengan warna background lembut.
  - Tombol `.btn-ar` tampil jelas, kontras, dan mudah ditekan.
  - Styling indikator loading `.progress`.
- [ ] **5. Commit, push branch `fase-3-detail-ar`, dan buat PR ke `main`**.

---

## Standar Kode
- Indentasi 2 spasi, variabel/fungsi JS `camelCase`, class CSS `kebab-case`.
- Gunakan `textContent` untuk teks biasa; gunakan `innerHTML` hanya untuk data dari `data.js` milik sendiri.
- Tidak ada `console.log` tersisa.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Model 3D tampil di `organ.html?id=jantung` (dan organ lainnya), bisa diputar dan di-zoom.
- [ ] Indikator loading muncul saat model sedang dimuat.
- [ ] Mengakses `organ.html?id=ngawur` (atau tanpa `id`) otomatis mengarah ke `404.html`.
- [ ] Di HP Android yang mendukung AR, tombol **Lihat di AR** muncul dan model organ bisa ditaruh di lantai/meja.
- [ ] Blok kredit tampil lengkap dengan link sumber yang bisa diklik.
- [ ] Belum menyentuh fitur Hotspot (Fase 4) atau Kuis (Fase 5).

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-3-detail-ar.md.
Kerjakan HANYA Fase 3 pada branch `fase-3-detail-ar` (checkout dari `main`).
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, cek Acceptance Criteria Fase 3 satu per satu, commit, push ke branch `fase-3-detail-ar`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-3-detail-ar` terhadap spesifikasi di PLAN.md dan issues/fase-3-detail-ar.md.
Periksa `git diff main...fase-3-detail-ar`:
1. Pastikan `<model-viewer>` dimuat via CDN v4.0.0 dan memiliki atribut AR lengkap sesuai kerangka wajib.
2. Pastikan `js/viewer.js` menangani ID tidak valid dengan `location.replace("404.html")`.
3. Pastikan `src`, `poster`, `alt`, `ios-src` (kondisional), `#nama`, `#deskripsi`, `#fungsi`, `#fakta`, `#kredit`, dan `document.title` terisi dengan benar dan aman (`textContent`).
4. Pastikan mematuhi Standar Kode dan tidak mengubah file di luar cakupan Fase 3.
Jika semua lolos 100%, Approve dan Merge PR ke `main`. Jika ada bug/pelanggaran, berikan instruksi revisi ke Model Pekerja.
```
