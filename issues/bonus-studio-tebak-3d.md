# [Fase Bonus] Studio Kontrol 3D & Mode Game "Tebak Bagian di 3D"

**Labels:** `bonus`, `3d-ux`, `gamification`, `education`  
**Nama Branch Wajib:** `bonus-studio-tebak-3d`  
**Target PR:** `main`  
**Estimasi Waktu:** 60–90 menit  
**Prasyarat:** PR #37 (`bonus-b3-i18n`) sudah ter-merge ke `main`

---

## Deskripsi
Meningkatkan interaktivitas halaman detail organ (`organ.html`) dengan dua fitur unggulan yang saling melengkapi:
1. **Toolbar Studio 3D:** Kontrol kamera & utilitas 3D lengkap (Auto-Fokus Kamera saat klik hotspot/chip, Putar/Jeda rotasi, Reset Sudut Kamera, Layar Penuh / Fullscreen, dan Simpan Foto 3D dalam format PNG).
2. **Mode Game "Tebak Bagian di 3D":** Latihan interaktif mencari dan mengeklik langsung titik anatomi pada model 3D dengan label tersembunyi, tombol Petunjuk (*Hint*), efek audio benar/salah (Web Audio API), skor akurasi, dan penyimpanan skor terbaik di `localStorage`.

Seluruh antarmuka wajib mendukung penuh **Dual Bahasa (`ID / EN`)**, **Dark Mode**, serta tata letak responsif (`360px`, `768px`, `1280px`).

---

## Poin Perubahan Utama

### 1. Toolbar Studio 3D & Auto-Fokus Kamera (`organ.html`, `js/viewer.js`, `css/style.css`)
- Bungkus area viewer (`<model-viewer>`, toolbar baru, `#hunt-panel`, dan `#info`) di dalam `<div id="viewer-stage" class="viewer-stage">` pada `organ.html` agar mode Fullscreen tetap menampilkan kontrol dan panel interaktif.
- Tambahkan `<div class="viewer-toolbar" role="toolbar">` tepat di bawah `<model-viewer>` dengan 5 tombol:
  1. **`#btn-rotate` (Putar / Jeda):** Toggle atribut `auto-rotate` pada `<model-viewer>` (`aria-pressed="true"` saat berputar, `"false"` saat dijeda).
  2. **`#btn-reset-cam` (Reset Kamera):** Mengembalikan `mv.cameraTarget = "auto auto auto"`, `mv.cameraOrbit = "auto auto auto"`, dan `mv.fieldOfView = "auto"`.
  3. **`#btn-fullscreen` (Layar Penuh):** Toggle Fullscreen pada `#viewer-stage` memakai Fullscreen API (`requestFullscreen` / `exitFullscreen`), sinkron dengan event `fullscreenchange`. Sembunyikan tombol ini jika browser tidak mendukung Fullscreen (`!document.fullscreenEnabled` atau `!viewerStage.requestFullscreen`).
  4. **`#btn-screenshot` (Foto 3D):** Menangkap gambar model 3D saat ini menggunakan `mv.toDataURL("image/png")` dan mengunduhnya otomatis sebagai `ar-organ-<organ.id>.png` (bungkus `try / catch` agar aman bila WebGL gagal).
  5. **`#btn-hunt-toggle` (Tebak 3D):** Membuka atau keluar dari Mode Game **Tebak Bagian di 3D**.
- **Auto-Fokus Kamera ke Hotspot:**
  - Buat fungsi helper `focusCameraOnHotspot(hotspot)` di `js/viewer.js` yang mengarahkan `mv.cameraTarget = hotspot.position` dan menghitung sudut orbit dari `hotspot.normal` (`theta = atan2(nx, nz)`, `phi = acos(clamp(ny / len, -1, 1))` yang dibatasi rentang `25deg`–`155deg`) lalu menerapkannya ke `mv.cameraOrbit = "${thetaDeg}deg ${phiDeg}deg auto"`.
  - Panggil `focusCameraOnHotspot(hotspot)` saat pengguna mengklik hotspot 3D atau chip bagian anatomi pada mode jelajah normal (JANGAN panggil sebelum terjawab saat mode Tebak 3D aktif agar tidak membocorkan posisi target).

### 2. Mode Game "Tebak Bagian di 3D" (`organ.html`, `js/viewer.js`, `css/style.css`)
- Tambahkan `<section id="hunt-panel" class="hunt-panel" aria-live="polite" hidden>` di dalam `#viewer-stage`:
  - Header panel menampilkan judul game, progres (`Bagian X dari Y` / `Part X of Y`), dan badge skor.
  - Area misi (`#hunt-prompt`): menampilkan nama bagian anatomi target yang harus dicari dan diklik pada model 3D.
  - Kotak petunjuk (`#hunt-hint-text`, `hidden` secara default) yang muncul saat tombol **Petunjuk (`#hunt-hint`)** ditekan — menampilkan deskripsi (`info`) dari target sebagai bantuan belajar.
  - Pesan umpan balik (`#hunt-feedback`) saat user mengklik titik hotspot:
    - **Benar (`clickedId === target.id`):** Sorot hotspot dengan kelas `.hunt-correct`, mainkan nada ceria lembut via Web Audio API (`try / catch`), catat skor penuh jika tepat pada percobaan pertama (`!wrongThisRound`), fokuskan kamera ke bagian tersebut, tampilkan tombol **Lanjut (`#hunt-next`)** (atau **Lihat Hasil** pada bagian terakhir).
    - **Salah (`clickedId !== target.id`):** Sorot singkat titik yang diklik dengan kelas `.hunt-wrong` (animasi *shake*), mainkan bunyi lembut via Web Audio API, tandai `wrongThisRound = true`, dan tampilkan pesan yang menyebutkan nama bagian yang terklik agar pengguna ikut belajar.
  - Layar hasil akhir (`#hunt-result`, `hidden` saat bermain): menampilkan skor ketepatan pertama (`X dari Y`), skor terbaik tersimpan di `localStorage` (`ar-organ-hunt-best-${organ.id}`, dibungkus `try / catch`), tombol **Main Lagi (`#hunt-retry`)**, dan **Selesai (`#hunt-done`)**.
  - Tombol **Keluar (`#hunt-exit`)** untuk menutup mode game kapan saja.
- **Mekanisme Anti-Contek Selama Mode Tebak 3D:**
  - Tambahkan kelas `.is-hunt-mode` pada `<model-viewer>` sehingga semua `.hotspot-label` disembunyikan dan titik hotspot tampil seragam untuk ditebak.
  - Nonaktifkan tombol `#hotspot-chips` (atribut `disabled` + kelas `.is-locked` pada `.chips-block`) saat game berjalan, dan aktifkan kembali saat keluar dari mode game.
  - Acak urutan target hotspot menggunakan **Fisher-Yates shuffle** (bukan `Array.prototype.sort` acak).
  - Reset kamera (`resetCamera()`) setiap memulai sesi game baru.

### 3. Dukungan Penuh Dual Bahasa `ID / EN` (`js/i18n.js`)
- Tambahkan seluruh kunci terjemahan `id` dan `en` pada objek `I18N` di `js/i18n.js` untuk:
  - Semua tombol Toolbar Studio 3D (`Putar` / `Jeda Putar`, `Reset Kamera`, `Layar Penuh` / `Keluar Layar Penuh`, `Foto 3D`, `Tebak 3D` / `Tutup Tebak 3D`, beserta `aria-label` masing-masing).
  - Semua teks Mode Game Tebak 3D (judul, progres, skor, prompt target, tombol Petunjuk/Lanjut/Lihat Hasil/Keluar/Main Lagi/Selesai, pesan feedback benar & salah, pesan skor terbaik, dan keterangan saat chip dikunci selama game).
- Pastikan saat event `"ar-lang-change"` dipicu di tengah mode Tebak 3D atau mode normal, seluruh teks toolbar & game langsung berganti bahasa **tanpa mereset progres game atau memuat ulang `<model-viewer>`**.

### 4. Styling Responsif & Dark Mode (`css/style.css`)
- Tambahkan gaya rapi untuk `.viewer-stage`, `.viewer-stage:fullscreen`, `.viewer-toolbar`, `.studio-btn`, `.hunt-panel`, `.hunt-header`, `.hunt-prompt`, `.hunt-hint`, `.hunt-feedback`, `.hunt-result`, `.hotspot.hunt-correct`, `.hotspot.hunt-wrong`, `model-viewer.is-hunt-mode .hotspot-label`, dan `.chips-block.is-locked`.
- Pastikan tidak ada scroll horizontal di `360px`, tombol sentuh nyaman (`min-height: 36px–40px`), dan kontras warna terjaga di Light Mode maupun Dark Mode.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-studio-tebak-3d
   ```
2. Kerjakan file cakupan (`organ.html`, `js/viewer.js`, `js/i18n.js`, `css/style.css`, `issues/bonus-studio-tebak-3d.md`).
3. Validasi sintaks JS dengan `node --check`, cek kelengkapan kunci `I18N.id` vs `I18N.en`, pastikan 0 `var` & 0 `console.log`.
4. Commit, push branch, dan buat PR ke `main` (sertakan `Closes #<nomor-issue>`).
5. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Toolbar Studio 3D pada `organ.html` menyediakan kontrol **Putar/Jeda** (`#btn-rotate`), **Reset Kamera** (`#btn-reset-cam`), **Layar Penuh** (`#btn-fullscreen`), **Foto 3D PNG** (`#btn-screenshot`), dan **Tebak 3D** (`#btn-hunt-toggle`) yang berfungsi tanpa error.
- [ ] Klik hotspot 3D atau chip anatomi pada mode jelajah normal mengarahkan kamera 3D halus ke bagian tersebut (`cameraTarget` & `cameraOrbit`), dan tombol Reset Kamera mengembalikan sudut awal.
- [ ] Mode Game **Tebak Bagian di 3D** mengacak urutan hotspot memakai Fisher-Yates, menyembunyikan label hotspot 3D & mengunci chip anatomi selama bermain, memvalidasi klik benar/salah dengan umpan balik jelas + tombol Petunjuk + audio Web Audio API aman (`try/catch`), serta menyimpan skor terbaik di `localStorage` dengan `try/catch`.
- [ ] Pergantian bahasa (`ID / EN`) memperbarui seluruh label Toolbar Studio 3D dan teks Game Tebak 3D secara instan tanpa mereset progres game dan tanpa memuat ulang `<model-viewer>`.
- [ ] Responsif (`360px`, `768px`, `1280px`), mendukung Dark Mode & Fullscreen, tidak merusak fitur yang sudah ada (simulasi jantung/paru-paru, TTS, 3 tab materi, ukuran teks), serta mematuhi Standar Kode di `PLAN.md` (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 JS `var`, 0 `console.log`).
