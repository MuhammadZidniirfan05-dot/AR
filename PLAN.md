# PLAN: Web AR Organ Tubuh (HTML + CSS + JS, Cloudflare Pages)

Dokumen ini ditulis supaya bisa dikerjakan junior programmer atau model AI yang lebih murah (**Model Coder**) tanpa harus menebak, lalu di-review oleh model AI yang lebih mahal (**Model Reviewer**) melalui mekanisme **Branch & Pull Request (PR)** di GitHub. Kerjakan berurutan per fase. Jangan lompat fase, jangan tambah fitur di luar dokumen ini.

---

## 0. Aturan untuk yang mengerjakan

1. HTML, CSS, JavaScript murni. Dilarang pakai framework (React, Vue, dll), bundler, atau npm build step.
2. Library hanya `<model-viewer>` lewat CDN. Library lain harus izin dulu.
3. **Wajib pakai Branch & Pull Request (PR) per Fase:**
   - **Dilarang push langsung ke branch `main`** (kecuali inisialisasi awal bila belum ada branch `main`).
   - Satu fase = satu branch khusus dari `main` terbaru. Penamaan branch:
     - `fase-0-setup`
     - `fase-1-aset-3d`
     - `fase-2-daftar-organ`
     - `fase-3-detail-ar`
     - `fase-4-hotspot`
     - `fase-5-kuis`
     - `fase-6-polish`
     - `fase-7-deploy`
     - `fase-8-tes-perangkat`
     - `fase-9-dokumentasi`
   - Pesan commit jelas menggunakan *Conventional Commits*, contoh: `feat(fase-2): halaman daftar organ`.
   - Setelah selesai di branch fase tersebut, push branch ke GitHub dan buat **Pull Request (PR)** ke `main` (tautkan ke Issue terkait dengan `Closes #<nomor-issue>`).
   - **Model Coder (Model Murah) DILARANG melakukan merge PR sendiri.** PR wajib di-review terlebih dahulu oleh **Model Reviewer (Model Mahal)**.
4. Setelah tiap fase, cek bagian **Acceptance Criteria** fase itu. Kalau belum lolos review dan belum di-merge ke `main`, jangan lanjut ke fase berikutnya.
5. Jangan hardcode data organ di HTML. Semua data organ ada di `js/data.js`.
6. Kode harus bisa jalan hanya dengan membuka lewat server statis (`npx serve` atau Live Server). Jangan buka via `file://` karena `model-viewer` butuh HTTP.
7. Kalau ada hal yang tidak jelas, tulis di `NOTES.md` dan pakai pilihan paling sederhana.

---

## 1. Ringkasan Proyek

- **Nama:** AR Organ Tubuh
- **Tujuan:** Web edukasi anatomi. User memilih organ, melihat model 3D (putar/zoom), klik titik (hotspot) untuk info bagian organ, ikut kuis singkat, dan menekan tombol **Lihat di AR** untuk menaruh organ di ruangan lewat kamera HP.
- **Jenis AR:** Markerless (tanpa kartu/gambar). Memakai fitur AR bawaan `<model-viewer>`:
  - Android: Scene Viewer / WebXR
  - iOS: Quick Look (butuh file `.usdz`, opsional)
- **Hosting:** Cloudflare Pages (statis, HTTPS otomatis).
- **Bahasa UI:** Bahasa Indonesia (EN opsional di fase bonus).
- Tanpa backend dan tanpa database.

---

## 2. Daftar Organ (MVP: 6 organ)

| id | Nama | Catatan |
| :--- | :--- | :--- |
| `jantung` | Jantung | wajib |
| `paru-paru` | Paru-paru | wajib |
| `otak` | Otak | wajib |
| `lambung` | Lambung | wajib |
| `ginjal` | Ginjal | wajib |
| `hati` | Hati | wajib |

Organ tambahan (usus, mata, dll) hanya jika 6 di atas sudah selesai.

---

## 3. Struktur Folder (harus persis ini)

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
│   └── jantung.glb ...
├── img/                  # thumbnail/poster organ (.webp) + favicon
├── _headers              # aturan cache Cloudflare
├── manifest.json         # PWA (fase bonus)
├── sw.js                 # service worker (fase bonus)
├── NOTES.md              # catatan masalah/keputusan
└── README.md
```

---

## 4. Skema Data (`js/data.js`)

Semua halaman membaca dari sini. Format wajib:

```javascript
const ORGANS = [
  {
    id: "jantung",
    nama: "Jantung",
    ringkas: "Memompa darah ke seluruh tubuh.",
    deskripsi: "Jantung adalah organ otot berongga yang ...",
    fungsi: [
      "Memompa darah kaya oksigen ke seluruh tubuh",
      "Menerima darah miskin oksigen dari tubuh"
    ],
    fakta: "Jantung manusia berdetak sekitar 100.000 kali per hari.",
    model: "models/jantung.glb",
    modelIos: null,                 // "models/jantung.usdz" atau null
    poster: "img/jantung.webp",
    hotspots: [
      {
        id: "atrium-kanan",
        label: "Atrium Kanan",
        info: "Menerima darah dari seluruh tubuh.",
        position: "0.1 0.2 0.05",   // koordinat x y z di model
        normal: "0 1 0"
      }
    ],
    kredit: {
      judul: "Human Heart",
      pembuat: "Nama Pembuat",
      sumber: "https://sketchfab.com/...",
      lisensi: "CC-BY 4.0"
    }
  }
  // ... organ lain
];

const QUIZ = [
  {
    organId: "jantung",
    pertanyaan: "Organ apa yang memompa darah?",
    pilihan: ["Jantung", "Paru-paru", "Hati", "Ginjal"],
    jawaban: 0,                      // index jawaban benar
    penjelasan: "Jantung memompa darah ke seluruh tubuh."
  }
];
```

**Aturan:**
- `id` huruf kecil, tanpa spasi, sama dengan nama file model.
- Minimal 2 hotspot per organ, minimal 2 soal kuis per organ.
- Isi teks (`deskripsi`, `fungsi`, `fakta`) harus akurat dan sederhana (level SMP). Jika ragu, tulis versi singkat dan umum.
- `kredit` wajib terisi untuk setiap model.

---

## 5. Fase Pengerjaan

### Fase 0: Setup (30 menit)
- **Branch:** `fase-0-setup`

**Tugas:**
- [ ] Buat branch `fase-0-setup`.
- [ ] Buat folder sesuai struktur di atas (file kosong dulu tidak apa-apa).
- [ ] `git init` (jika belum), buat `.gitignore` (isi: `node_modules`, `.DS_Store`).
- [ ] Buat `README.md` awal berisi judul proyek saja.
- [ ] Commit, push branch `fase-0-setup`, dan buat PR ke `main` untuk di-review Model Reviewer.

**Acceptance Criteria:**
- [ ] Struktur folder sama persis dengan bagian 3.
- [ ] Repo git sudah ada commit pertama dan PR `fase-0-setup` siap di-review.

---

### Fase 1: Aset 3D (1-2 jam, dikerjakan manusia)
- **Branch:** `fase-1-aset-3d`

> Fase ini sebaiknya dikerjakan pemilik proyek, bukan model AI, karena butuh browsing dan download. Namun hasil akhirnya tetap dimasukkan lewat branch `fase-1-aset-3d` dan PR agar struktur file & ukuran diverifikasi oleh Model Reviewer.

**Tugas:**
- [ ] Buat branch `fase-1-aset-3d` dari `main`.
- [ ] Cari model `.glb` untuk 6 organ di:
  - Sketchfab (filter Downloadable, lisensi CC-BY atau CC0, hindari NC kalau mau dipakai promosi jasa)
  - NIH 3D (`3d.nih.gov`)
  - Poly Pizza / Free3D (cadangan)
- [ ] Download format glTF/GLB. Jika format lain, konversi dengan Blender (`File > Import`, lalu `Export > glTF Binary .glb`).
- [ ] Kompres tiap model sampai maks 5 MB:
  ```bash
  npx @gltf-transform/cli optimize input.glb models/jantung.glb --compress draco --texture-compress webp --texture-size 1024
  ```
- [ ] Beri nama sesuai `id` organ: `jantung.glb`, `paru-paru.glb`, dll, lalu taruh di `models/`.
- [ ] Catat kredit (judul, pembuat, URL, lisensi) tiap model di `NOTES.md`.
- [ ] Buat poster/thumbnail per organ (screenshot model, ukuran 600x600, format `.webp`) di `img/`.
- [ ] Commit, push branch `fase-1-aset-3d`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] 6 file `.glb`, masing-masing di bawah 5 MB.
- [ ] Tiap model bisa dibuka di https://modelviewer.dev/editor/ tanpa error.
- [ ] Semua kredit tercatat.

---

### Fase 2: Data + Halaman Daftar (`index.html`)
- **Branch:** `fase-2-daftar-organ`

**Tugas:**
- [ ] Buat branch `fase-2-daftar-organ` dari `main`.
- [ ] Isi `js/data.js` sesuai skema bagian 4 untuk 6 organ (hotspot boleh diisi dulu 2 dummy, nanti disesuaikan di Fase 4).
- [ ] `index.html`:
  - `<header>` dengan judul dan input pencarian (`<input id="search">`).
  - `<main>` berisi `<section id="organ-grid">` (diisi lewat JS).
  - `<footer>` berisi teks "Model 3D: lihat halaman tiap organ untuk kredit".
  - Muat `js/data.js` lalu `js/app.js` (urutan penting).
- [ ] `js/app.js`:
  - Render kartu untuk setiap organ: poster, nama, ringkas, link ke `organ.html?id=<id>`.
  - Pencarian: filter kartu berdasarkan nama organ saat user mengetik (case-insensitive).
  - Jika hasil kosong, tampilkan teks "Organ tidak ditemukan".
- [ ] `css/style.css`: grid responsif (1 kolom di HP, 2 di tablet, 3 di desktop), kartu dengan hover.
- [ ] Commit, push branch `fase-2-daftar-organ`, dan buat PR ke `main`.

**Contoh render kartu:**
```javascript
const grid = document.getElementById("organ-grid");
function render(list) {
  grid.innerHTML = list.length
    ? list.map(o => `
      <a class="card" href="organ.html?id=${o.id}">
        <img src="${o.poster}" alt="${o.nama}" loading="lazy" width="300" height="300">
        <h2>${o.nama}</h2>
        <p>${o.ringkas}</p>
      </a>`).join("")
    : "<p>Organ tidak ditemukan.</p>";
}
render(ORGANS);
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  render(ORGANS.filter(o => o.nama.toLowerCase().includes(q)));
});
```

**Acceptance Criteria:**
- [ ] 6 kartu tampil, klik kartu pindah ke `organ.html?id=...`.
- [ ] Pencarian bekerja, termasuk kondisi kosong.
- [ ] Tampilan rapi di lebar 360px, 768px, 1280px.

---

### Fase 3: Halaman Detail + Viewer + Tombol AR (`organ.html`)
- **Branch:** `fase-3-detail-ar`

**Tugas:**
- [ ] Buat branch `fase-3-detail-ar` dari `main`.
- [ ] `organ.html` berisi kerangka:
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
- [ ] `js/viewer.js`:
  - Ambil `id` dari `new URLSearchParams(location.search).get("id")`.
  - Cari di `ORGANS`. Jika tidak ketemu, `location.replace("404.html")`.
  - Set `src`, `poster`, `alt`, dan `ios-src` (jika `modelIos` ada) pada `<model-viewer>`.
  - Isi nama, deskripsi, daftar fungsi, fakta, dan blok kredit (judul, pembuat, link sumber, lisensi).
  - Set `document.title = "<Nama> | AR Organ Tubuh"`.
- [ ] Styling: viewer tinggi sekitar `60vh` di HP, lebar penuh, background lembut. Tombol AR jelas dan besar.
- [ ] Jika browser tidak mendukung AR, tombol AR otomatis tersembunyi (perilaku bawaan `model-viewer`). Tambahkan teks kecil: "Fitur AR tersedia di HP Android/iPhone yang didukung."
- [ ] Commit, push branch `fase-3-detail-ar`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] Model tampil, bisa diputar dan di-zoom.
- [ ] Indikator loading muncul saat model dimuat.
- [ ] `organ.html?id=ngawur` mengarah ke `404.html`.
- [ ] Di HP Android asli, tombol AR muncul dan organ bisa ditaruh di lantai/meja.
- [ ] Kredit tampil dengan link sumber.

---

### Fase 4: Hotspot Interaktif
- **Branch:** `fase-4-hotspot`

**Tugas:**
- [ ] Buat branch `fase-4-hotspot` dari `main`.
- [ ] Di `viewer.js`, buat hotspot dari `organ.hotspots`:
  ```javascript
  organ.hotspots.forEach(h => {
    const b = document.createElement("button");
    b.slot = `hotspot-${h.id}`;
    b.className = "hotspot";
    b.dataset.position = h.position;
    b.dataset.normal = h.normal;
    b.textContent = h.label;
    b.addEventListener("click", () => showInfo(h));
    mv.appendChild(b);
  });
  ```
- [ ] Buat panel info (`<aside id="info">`) yang menampilkan label dan info hotspot yang diklik. Panel punya tombol tutup.
- [ ] Cara mencari koordinat hotspot: buka model di https://modelviewer.dev/editor/ lalu klik di permukaan model. Salin nilai `data-position` dan `data-normal` yang muncul ke `data.js`.
- [ ] Styling hotspot: bulat kecil berwarna mencolok, label muncul saat hover atau fokus. Pastikan ukuran sentuh minimal 32px.
- [ ] Isi 3-5 hotspot per organ dengan info akurat.
- [ ] Commit, push branch `fase-4-hotspot`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] Hotspot menempel di bagian yang benar saat model diputar.
- [ ] Klik hotspot menampilkan info di panel, dan panel bisa ditutup.
- [ ] Hotspot bisa diakses keyboard (`Tab` + `Enter`).

---

### Fase 5: Kuis (`quiz.html`)
- **Branch:** `fase-5-kuis`

**Tugas:**
- [ ] Buat branch `fase-5-kuis` dari `main`.
- [ ] `quiz.html` + `js/quiz.js`:
  - Mode: `quiz.html` (semua organ, acak) atau `quiz.html?organ=<id>` (per organ).
  - Tampilkan 1 soal per layar: pertanyaan, 4 pilihan (tombol), progress "Soal 2 dari 6".
  - Setelah memilih: tandai benar/salah, tampilkan penjelasan, tombol "Lanjut".
  - Akhir: tampilkan skor dan tombol "Ulangi" dan "Kembali ke daftar".
- [ ] Acak urutan soal dengan Fisher-Yates (bukan `sort(() => Math.random() - 0.5)`).
- [ ] Link "Ikut kuis organ ini" di `organ.html` mengarah ke `quiz.html?organ=<id>`.
- [ ] Tambah link "Kuis" di header `index.html`.
- [ ] Simpan skor tertinggi di `localStorage` (bungkus dengan `try/catch`), tampilkan di halaman hasil.
- [ ] Commit, push branch `fase-5-kuis`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] Kuis berjalan dari soal pertama sampai skor akhir tanpa error.
- [ ] Jawaban tidak bisa diubah setelah dipilih.
- [ ] Total minimal 12 soal (2 per organ).

---

### Fase 6: Polish (UI, Aksesibilitas, Performa)
- **Branch:** `fase-6-polish`

**Tugas:**
- [ ] Buat branch `fase-6-polish` dari `main`.
- [ ] Dark mode: variabel CSS (`:root` dan `[data-theme="dark"]`), tombol toggle di header, simpan pilihan di `localStorage`, default ikut `prefers-color-scheme`.
- [ ] Responsif: uji di 360px, 768px, 1280px. Tidak ada scroll horizontal.
- [ ] Aksesibilitas: semua gambar punya `alt`, tombol punya label jelas, kontras warna cukup, fokus keyboard terlihat.
- [ ] SEO dasar: `<title>`, `<meta name="description">`, `<meta name="viewport">`, Open Graph (`og:title`, `og:description`, `og:image`).
- [ ] Performa: gambar `.webp` dan `loading="lazy"`, CSS dan JS tidak berlebihan, target Lighthouse 90+ di Performance, Accessibility, Best Practices, SEO (mode mobile).
- [ ] Favicon.
- [ ] Commit, push branch `fase-6-polish`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] Lighthouse mobile: semua kategori 90 atau lebih (jika Performance di bawah 90, catat penyebabnya di `NOTES.md`, biasanya ukuran model).
- [ ] Dark mode berfungsi dan tersimpan.

---

### Fase 7: Deploy ke Cloudflare Pages
- **Branch:** `fase-7-deploy`

**Tugas:**
- [ ] Buat branch `fase-7-deploy` dari `main`.
- [ ] Buat file `_headers` di root:
  ```text
  /models/*
    Cache-Control: public, max-age=31536000, immutable

  /img/*
    Cache-Control: public, max-age=31536000, immutable

  /*
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
  ```
  *Catatan: karena model di-cache lama, kalau mengganti isi file model, ganti juga nama file-nya (contoh `jantung-v2.glb`).*
- [ ] Commit, push branch `fase-7-deploy`, buat PR ke `main`, dan merge setelah lolos review.
- [ ] Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git > pilih repo.
- [ ] Pengaturan build:
  - Framework preset: `None`
  - Build command: *(kosongkan)*
  - Build output directory: `/` (atau `.`)
- [ ] Klik Deploy. Setiap PR yang di-merge ke `main` otomatis deploy ulang (dan setiap PR baru otomatis dapat URL *Preview Deployment* dari Cloudflare Pages!).
- [ ] (Opsional) Hubungkan custom domain lewat tab Custom domains di project Pages.

**Acceptance Criteria:**
- [ ] URL `*.pages.dev` bisa dibuka dan semua halaman berfungsi.
- [ ] Model `.glb` termuat dari URL publik tanpa error di console.
- [ ] Tombol AR muncul di HP Android asli lewat URL publik.

---

### Fase 8: Tes di Perangkat Asli
- **Branch:** `fase-8-tes-perangkat` (jika ada perbaikan bug/catatan di `NOTES.md`)

**Checklist (centang satu per satu):**
- [ ] Android + Chrome: 3D tampil, AR bekerja (Scene Viewer/WebXR)
- [ ] iPhone + Safari: 3D tampil, AR via Quick Look (jika ada `.usdz`)
- [ ] Desktop Chrome, Firefox, Edge: 3D tampil dan hotspot bekerja
- [ ] Koneksi lambat (Chrome DevTools > Network > Slow 4G): loading indicator terlihat, tidak blank
- [ ] Semua link bekerja, tidak ada 404 tersembunyi
- [ ] Console browser bersih dari error merah
- [ ] Semua kredit model tampil

---

### Fase 9: Dokumentasi Portofolio
- **Branch:** `fase-9-dokumentasi`

**Tugas:**
- [ ] Buat branch `fase-9-dokumentasi` dari `main`.
- [ ] `README.md` berisi: judul, deskripsi singkat, link demo, screenshot (min. 3), GIF demo AR, daftar fitur, teknologi, cara menjalankan lokal, struktur folder singkat, daftar kredit model 3D, lisensi proyek.
- [ ] Buat QR code ke URL demo (misal pakai qr-code-generator gratis) dan taruh di README.
- [ ] Rekam GIF/video pendek layar HP saat memakai AR.
- [ ] Commit, push branch `fase-9-dokumentasi`, dan buat PR ke `main`.

**Acceptance Criteria:**
- [ ] Orang yang baru melihat README paham proyek ini dalam 30 detik.
- [ ] Link demo, screenshot, dan kredit lengkap.

---

## Fase Bonus (hanya jika semua fase di atas selesai)

- **B1. PWA (bisa diinstal dan offline)** — Branch: `bonus-b1-pwa`
  - `manifest.json`: `name`, `short_name`, `start_url: "/"`, `display: "standalone"`, `theme_color`, `background_color`, ikon 192px dan 512px.
  - `sw.js`: cache-first untuk aset statis (HTML, CSS, JS, img), cache model `.glb` saat pertama kali dibuka. Naikkan nomor versi cache (`const CACHE = "ar-organ-v2"`) setiap ada perubahan aset.
  - Daftarkan service worker di tiap halaman.
  - Catatan: file `model-viewer` dari CDN ikut di-cache atau diganti dengan hosting lokal supaya offline berfungsi.
- **B2. Narasi suara** — Branch: `bonus-b2-tts`
  - Tombol "Bacakan" memakai `speechSynthesis` (`lang = "id-ID"`) untuk membaca deskripsi. Tombol berubah jadi "Berhenti" saat jalan.
- **B3. Bahasa ID/EN** — Branch: `bonus-b3-i18n`
  - Pisahkan teks ke objek `i18n` dan tambahkan field `en` di `data.js`. Pilihan bahasa disimpan di `localStorage`.
- **B4. Organ tambahan** — Branch: `bonus-b4-organ-tambahan`
  - Organ tambahan (usus, mata, dll) mengikuti skema yang sama.

---

## 6. Standar Kode

- Indentasi 2 spasi. Nama file huruf kecil dengan tanda hubung (`paru-paru.glb`).
- Variabel dan fungsi JS pakai `camelCase`. Kelas CSS pakai `kebab-case`.
- Gunakan `const`/`let`, jangan `var`.
- Gunakan `textContent` untuk teks biasa. Pakai `innerHTML` hanya untuk data dari `data.js` milik sendiri.
- Tidak ada `console.log` tersisa di versi akhir.
- Komentar singkat hanya untuk bagian yang tidak jelas.

---

## 7. Risiko dan Solusi

| Masalah | Solusi |
| :--- | :--- |
| Model terlalu besar, loading lambat | Kompres dengan `gltf-transform` (Draco + WebP), turunkan ukuran tekstur ke 1024 atau 512 |
| AR tidak muncul di iPhone | iOS butuh `.usdz`. Konversi `.glb` ke `.usdz` (Reality Converter dari Apple) lalu isi `ios-src`. Tanpa itu, iPhone tetap bisa lihat 3D, hanya tanpa AR |
| AR tidak muncul di Android | Pastikan HTTPS, Chrome terbaru, dan perangkat mendukung ARCore |
| Hotspot meleset | Ambil ulang koordinat lewat `modelviewer.dev/editor` |
| Model tidak muncul di lokal | Jalankan lewat server (`npx serve`), bukan `file://` |
| Lisensi model bermasalah | Pakai CC-BY atau CC0, cantumkan kredit lengkap |
| Cache model lama tersangkut | Ganti nama file model saat diperbarui |

---

## 8. Definisi Selesai (Definition of Done)

- [ ] 6 organ lengkap (model, deskripsi, fungsi, hotspot, kuis)
- [ ] AR berfungsi di minimal 1 HP Android asli
- [ ] Responsif dan dark mode
- [ ] Lighthouse mobile 90+ (atau alasan tercatat)
- [ ] Ter-deploy di Cloudflare Pages dengan auto-deploy dari GitHub
- [ ] README lengkap dengan demo, screenshot, GIF, dan kredit
- [ ] Tidak ada error di console

---

## 9. Perkiraan Waktu

| Fase | Branch | Estimasi |
| :--- | :--- | :--- |
| 0 Setup | `fase-0-setup` | 0,5 jam |
| 1 Aset 3D | `fase-1-aset-3d` | 2-4 jam |
| 2 Daftar organ | `fase-2-daftar-organ` | 2-3 jam |
| 3 Detail + AR | `fase-3-detail-ar` | 3-4 jam |
| 4 Hotspot | `fase-4-hotspot` | 3-4 jam |
| 5 Kuis | `fase-5-kuis` | 2-3 jam |
| 6 Polish | `fase-6-polish` | 3-4 jam |
| 7 Deploy | `fase-7-deploy` | 1 jam |
| 8 Tes perangkat | `fase-8-tes-perangkat` | 1-2 jam |
| 9 Dokumentasi | `fase-9-dokumentasi` | 2 jam |
| **Total MVP** | | **sekitar 3-5 hari santai** |

---

## 10. Prompt Siap Pakai (Alur 2 Model: Coder Murah + Reviewer Mahal)

### A. Prompt untuk Model Pekerja (Model Murah / Junior Coder)
Berikan satu fase per sesi:

```text
Baca PLAN.md di root repo dan file issue Fase <N> di folder issues/.
Kerjakan HANYA Fase <N> dengan alur Git berikut:
1. Pastikan berada di branch `main` terbaru, lalu buat branch baru sesuai ketentuan Fase <N> (contoh: `git checkout -b fase-<N>-...`).
2. Kerjakan tugas HANYA dalam cakupan Fase <N>. Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
3. Jangan mengubah atau menambah fitur di luar cakupan Fase <N>.
4. Cek seluruh Acceptance Criteria Fase <N> satu per satu.
5. Commit pekerjaan dengan pesan commit yang jelas, push branch ke origin, dan buat Pull Request (PR) ke branch `main` (sertakan `Closes #<nomor-issue>`).
6. BERHENTI setelah PR dibuat. JANGAN melakukan merge PR ke `main`. Laporkan ringkasan perubahan dan hasil pengecekan Acceptance Criteria untuk di-review oleh Model Reviewer.
```

### B. Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
Gunakan setelah Model Pekerja selesai membuat PR:

```text
Kamu adalah Senior Code Reviewer. Tugasmu me-review Pull Request (PR) untuk Fase <N> pada branch `fase-<N>-...` sebelum di-merge ke `main`.
1. Baca spesifikasi Fase <N> di PLAN.md dan issues/fase-<N>-*.md.
2. Periksa diff antara `main` dan branch `fase-<N>-...` (`git diff main...fase-<N>-...`).
3. Audit poin-poin berikut secara ketat:
   - Apakah ada file di luar cakupan Fase <N> yang diubah tanpa alasan?
   - Apakah seluruh "0. Aturan untuk yang mengerjakan" (tanpa framework, data wajib di js/data.js, dll.) dipatuhi?
   - Apakah "6. Standar Kode" (indentasi 2 spasi, camelCase JS, kebab-case CSS, const/let, keamanan textContent vs innerHTML, tidak ada console.log) dipatuhi?
   - Apakah semua poin "Acceptance Criteria" Fase <N> benar-benar terpenuhi dan bebas bug?
4. Keputusan Review:
   - Jika ADA masalah/pelanggaran: Tolak (Request Changes), tuliskan daftar perbaikan spesifik per file/baris yang harus diperbaiki oleh Model Pekerja, dan JANGAN merge PR.
   - Jika SEMUA lolos 100%: Setujui (Approve), merge PR ke `main`, dan hapus branch fitur jika diperlukan.
```
