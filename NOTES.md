# Catatan Proyek & Kredit Model 3D (Fase 1)

## Daftar Kredit Model 3D (6 Organ MVP)

1. **Jantung (`models/jantung.glb`)**
   - **Judul:** Realistic Human Heart
   - **Pembuat:** neshallads
   - **Sumber:** https://skfb.ly/oyBCT
   - **Lisensi:** CC-BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

2. **Paru-paru (`models/paru-paru.glb`)**
   - **Judul:** Realistic Human Lungs
   - **Pembuat:** neshallads
   - **Sumber:** https://skfb.ly/oBDWI
   - **Lisensi:** CC-BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

3. **Otak (`models/otak.glb`)**
   - **Judul:** Human Brain
   - **Pembuat:** AH
   - **Sumber:** https://skfb.ly/oqZPW
   - **Lisensi:** CC-BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

4. **Lambung (`models/lambung.glb`)**
   - **Judul:** Stomach - Organ
   - **Pembuat:** Trident.AI
   - **Sumber:** https://sketchfab.com/3d-models/stomach-organ-56ffcd2330ae4b7ea6c7b8a08c82b4b7
   - **Lisensi:** Sketchfab Free Standard

5. **Ginjal (`models/ginjal.glb`)**
   - **Judul:** Kidney
   - **Pembuat:** cgmac
   - **Sumber:** https://skfb.ly/6QUPW
   - **Lisensi:** CC-BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

6. **Hati (`models/hati.glb`)**
   - **Judul:** Human liver and gallbladder
   - **Pembuat:** ElliotSS
   - **Sumber:** https://skfb.ly/6SD8p
   - **Lisensi:** CC-BY 4.0 (http://creativecommons.org/licenses/by/4.0/)

---

## Catatan Deployment & Pengujian Perangkat (Fase 7 & Fase 8)

- **URL Produksi (Cloudflare Pages):** https://ar-ahf.pages.dev/
- **Catatan Pretty URLs Cloudflare Pages:** Cloudflare Pages secara otomatis mengalihkan (308) path `*.html` ke clean URL (misalnya `/organ.html?id=otak` -> `/organ?id=otak`, `/quiz.html` -> `/quiz`), dan parameter query tetap diteruskan dengan benar.
- **Verifikasi HTTP & Cache Headers (`_headers`):**
  - Seluruh halaman utama (`/`, `/organ?id=...`, `/quiz`, `/404`), stylesheet (`/css/style.css`), dan script (`/js/*.js`) aktif (HTTP 200).
  - Seluruh 6 file model `.glb` (`/models/jantung.glb`, `/models/paru-paru.glb`, `/models/otak.glb`, `/models/lambung.glb`, `/models/ginjal.glb`, `/models/hati.glb`) serta gambar `/img/*` mengembalikan HTTP 200 dengan header `Cache-Control: public, max-age=31536000, immutable`.
  - Seluruh aset di `js/data.js` (`model`, `poster`, `kredit`) dan `img/favicon.svg` terverifikasi ada dan valid.

### Checklist Pengujian Fase 8
- [x] **Verifikasi Produksi & Aset:** URL publik `https://ar-ahf.pages.dev/` aktif, seluruh model `.glb` dan poster `.webp` termuat dengan header cache Cloudflare yang sesuai.
- [x] **Validasi Navigasi & Link:** Seluruh link internal (`index.html`, `organ.html?id=...`, `quiz.html`, `quiz.html?organ=...`), fallback `404.html` untuk `id` tidak valid, dan link eksternal kredit terverifikasi.
- [x] **Kelengkapan Kredit:** Seluruh kredit ke-6 model 3D tampil lengkap di halaman detail masing-masing organ.
- [ ] **Android + Chrome (Perangkat Fisik):** Menunggu verifikasi langsung pengguna di HP Android untuk menguji tombol **Lihat di AR** (Scene Viewer / WebXR).
- [ ] **iPhone + Safari (Opsional):** `modelIos` saat ini `null` (file `.usdz` belum disediakan, sehingga tampilan 3D tetap berjalan di iOS tanpa mode Quick Look AR).
- [x] **Desktop Browser:** Diverifikasi berjalan pada URL produksi (`/organ?id=otak`).
- [ ] **Simulasi Slow 4G & Audit Console/Lighthouse:** Untuk dicek pengguna pada Chrome DevTools (`Network > Slow 4G` & `Lighthouse Mobile`).
