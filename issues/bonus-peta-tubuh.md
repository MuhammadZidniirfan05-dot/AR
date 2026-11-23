# [Fase Bonus] Peta Tubuh Manusia Interaktif (SVG Human Body Map)

**Labels:** `bonus`, `ui-ux`, `education`, `interactive`  
**Nama Branch Wajib:** `bonus-peta-tubuh`  
**Target PR:** `main`  
**Estimasi Waktu:** 60–75 menit  
**Prasyarat:** PR #39 (`bonus-studio-tebak-3d`) sudah ter-merge ke `main`

---

## Deskripsi
Menambahkan fitur **Peta Tubuh Manusia Interaktif (*SVG Human Body Map*)** di halaman beranda (`index.html`) dengan tombol pengalih tampilan **Kartu | Peta Tubuh**. Pengguna dapat melihat siluet tubuh manusia modern lengkap dengan bentuk ilustrasi dan titik lokasi anatomis asli ke-6 organ (Otak, Paru-paru, Jantung, Hati, Lambung, Ginjal), menyalakan (*highlight/glow*) organ saat diarahkan atau diklik, membaca pratinjau organ, dan langsung membuka halaman 3D & AR atau halaman Bandingkan.

Seluruh antarmuka wajib mendukung penuh **Dual Bahasa (`ID / EN`)**, **Dark Mode**, aksesibilitas keyboard, serta tata letak responsif (`360px`, `768px`, `1280px`).

---

## Poin Perubahan Utama

### 1. Pengalih Tampilan & Kerangka Peta Tubuh pada `index.html`
- Di dalam `.toolbar` pada `index.html`, tambahkan grup tombol pengalih tampilan `.view-switcher` (`role="group"`):
  - **`#btn-view-grid`** (`Tampilan Kartu` / `Card View`, default aktif)
  - **`#btn-view-map`** (`Peta Tubuh` / `Body Map`)
- Tambahkan `<section id="body-map-section" class="body-map-section" hidden>` di bawah `#organ-grid` yang terdiri dari 2 kolom:
  1. **Area Peta Tubuh (`.body-map-card`):**
     - Keterangan singkat di atas peta (`Klik titik pada tubuh untuk melihat lokasi dan info organ` / `Tap any point on the body to explore organ locations and details`).
     - `<div id="body-map-stage" class="body-map-stage">` berisi:
       - SVG siluet tubuh manusia proporsional (`viewBox="0 0 280 480"`, `aria-hidden="true"`) bergaya medis bersih dengan siluet bentuk semi-transparan untuk ke-6 organ (`data-svg-organ="otak"`, `"paru-paru"`, `"jantung"`, `"hati"`, `"lambung"`, `"ginjal"`).
       - Kontainer `<div id="body-map-pins" class="body-map-pins"></div>` tempat tombol-tombol pin interaktif dirender secara dinamis lewat JS (jangan hardcode nama/data organ di HTML!).
  2. **Panel Pratinjau Organ (`.body-map-preview`):**
     - Bar pintasan cepat `<div id="body-map-quicklist" class="body-map-quicklist"></div>` (6 tombol organ yang dirender dari `ORGANS`, sinkron dua arah dengan pin di peta).
     - Kartu pratinjau organ aktif (`aria-live="polite"`):
       - Gambar poster `<img id="map-preview-img">`
       - Badge lokasi anatomis `<span id="map-preview-location">`
       - Nama organ `<h2 id="map-preview-name">`
       - Deskripsi `<p id="map-preview-desc">`
       - Kotak Fakta Menarik singkat `<p id="map-preview-fact">`
       - Tombol aksi: `<a id="map-preview-open" class="btn-quiz">` (**Lihat 3D & AR**) dan `<a id="map-preview-compare" class="btn-secondary">` (**Bandingkan**).

### 2. Logika Interaktif Peta Tubuh pada `js/app.js`
- Definisikan peta posisi anatomis (`BODY_MAP_COORDS`) untuk ke-6 organ (dalam persentase `x`, `y` sesuai orientasi anatomi menghadap depan — sisi kanan anatomi di kiri layar, sisi kiri anatomi seperti jantung & lambung sedikit ke kanan layar):
  - `otak`: `{ x: 50, y: 10, locKey: "locBrain" }`
  - `paru-paru`: `{ x: 40, y: 31, locKey: "locLungs" }`
  - `jantung`: `{ x: 54, y: 34, locKey: "locHeart" }`
  - `hati`: `{ x: 41, y: 45, locKey: "locLiver" }`
  - `lambung`: `{ x: 57, y: 47, locKey: "locStomach" }`
  - `ginjal`: `{ x: 47, y: 56, locKey: "locKidneys" }`
- **Render Pin & Quicklist Dinamis:**
  - Buat tombol `.body-pin` (sentuh minimal `34px x 34px`, memiliki label tooltip `.body-pin-label`, atribut `aria-label`, dan `aria-pressed`) untuk setiap organ di `ORGANS` berdasarkan `BODY_MAP_COORDS`.
  - Buat tombol `.body-quick-btn` di `#body-map-quicklist` yang tersinkronisasi dua arah dengan `.body-pin` dan bentuk organ SVG (`[data-svg-organ="..."]`).
  - Saat sebuah organ dipilih (melalui klik pin, klik quicklist, atau `Tab` + `Enter` / `focus`), jalankan `selectMapOrgan(organId)`:
    - Tandai `.is-active` pada `.body-pin`, `.body-quick-btn`, dan elemen SVG `[data-svg-organ="<id>"]` terkait.
    - Perbarui `#map-preview-img`, `#map-preview-location`, `#map-preview-name`, `#map-preview-desc`, `#map-preview-fact`, `#map-preview-open` (`organ.html?id=<id>`), dan `#map-preview-compare` (`compare.html?a=<id>`).
- **Toggle Tampilan & Persistensi `localStorage`:**
  - Simpan preferensi tampilan (`"grid"` atau `"map"`) ke `localStorage` (`ar-organ-home-view`) di dalam `try / catch`, dengan state in-memory `let activeView = readSavedView();` agar tetap bisa berganti tampilan meski `localStorage` terblokir.
- **Sinkronisasi Pencarian & Dual Bahasa:**
  - Ketika pengguna mengetik di `#search` saat mode Peta Tubuh aktif: sorot pin & tombol quicklist yang cocok (nama ID atau EN) dan tambahkan kelas `.is-dimmed` pada organ yang tidak cocok; jika hanya 1 organ cocok (atau organ aktif saat ini tidak cocok), otomatis pilih organ pertama yang cocok di pratinjau!
  - Ketika event `"ar-lang-change"` dipicu: perbarui label seluruh pin, quicklist, lokasi anatomis, serta kartu pratinjau organ aktif secara instan tanpa mereset organ yang sedang dipilih maupun tampilan aktif (`grid` / `map`).

### 3. Terjemahan Dual Bahasa `ID / EN` (`js/i18n.js`)
- Tambahkan kunci terjemahan lengkap pada `I18N.id` dan `I18N.en` di `js/i18n.js`:
  - `viewSwitcherAria`, `viewGrid`, `viewMap`
  - `bodyMapHint`, `bodyMapOpen3d`, `bodyMapCompare`, `bodyMapPinAria`
  - Lokasi anatomis ke-6 organ: `locBrain`, `locLungs`, `locHeart`, `locLiver`, `locStomach`, `locKidneys`

### 4. Styling Siluet SVG, Pin & Responsivitas (`css/style.css`)
- Tambahkan gaya rapi untuk `.view-switcher`, `.view-btn`, `.body-map-section`, `.body-map-card`, `.body-map-stage`, `.body-silhouette`, `.svg-organ`, `.svg-organ.is-active`, `.body-pin`, `.body-pin.is-active`, `.body-pin.is-dimmed`, `.body-pin-label`, `.body-map-preview`, `.body-map-quicklist`, `.body-quick-btn`, `.map-preview-card`, `.map-preview-location`, dan `.map-preview-actions`.
- Pastikan siluet & warna organ terlihat kontras, estetik, dan menyala jelas baik di **Light Mode** maupun **Dark Mode**, serta responsif mulus di `360px` (1 kolom vertikal) dan `>= 768px` (2 kolom berdampingan).

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-peta-tubuh
   ```
2. Kerjakan file cakupan (`index.html`, `js/app.js`, `js/i18n.js`, `css/style.css`, `issues/bonus-peta-tubuh.md`).
3. Validasi sintaks JS dengan `node --check`, pastikan seluruh kunci `I18N.id` dan `I18N.en` cocok 1:1, dan pastikan 0 `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Terdapat tombol pengalih tampilan **Tampilan Kartu | Peta Tubuh** di halaman beranda (`index.html`) yang berpindah mulus, menyimpan preferensi di `localStorage` (`ar-organ-home-view`) dengan `try / catch`, dan tetap bekerja via state in-memory bila `localStorage` terblokir.
- [ ] Peta Tubuh SVG menampilkan siluet tubuh manusia dan 6 organ interaktif (Otak, Paru-paru, Jantung, Hati, Lambung, Ginjal) pada posisi anatomis yang tepat; tidak ada data organ yang di-hardcode di HTML.
- [ ] Klik atau fokus keyboard pada pin peta maupun daftar pintasan menyalakan bentuk organ SVG terkait, memperbarui panel pratinjau (poster, lokasi anatomis, nama, deskripsi, fakta, link 3D & AR, link Bandingkan), dan tetap sinkron dengan pencarian `#search`.
- [ ] Pergantian bahasa (`ID / EN`) memperbarui seluruh label Peta Tubuh, lokasi anatomis, dan pratinjau organ secara instan tanpa mereset organ yang sedang dipilih.
- [ ] Responsif (`360px`, `768px`, `1280px`), mendukung Dark Mode, dan mematuhi Standar Kode di `PLAN.md` (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 JS `var`, 0 `console.log`).
