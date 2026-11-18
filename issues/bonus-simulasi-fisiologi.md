# [Fase Bonus] Simulasi Detak Jantung & Pernapasan Interaktif (Web Audio API + Animasi 3D)

**Labels:** `bonus`, `enhancement`, `interactive`, `audio`  
**Nama Branch Wajib:** `bonus-simulasi-fisiologi`  
**Target PR:** `main`  
**Estimasi Waktu:** 45 – 60 menit  
**Prasyarat:** Fase MVP & Fase Bonus B2 selesai

---

## Deskripsi
Menambahkan fitur **Simulasi Fisiologi Interaktif** pada halaman detail organ (`organ.html`, `js/viewer.js`, `css/style.css`) yang menggabungkan animasi skala/denyut pada `<model-viewer>`, indikator status *real-time*, dan efek suara prosedural menggunakan **Web Audio API** (`AudioContext` murni tanpa file audio eksternal):

1. **Simulasi Detak Jantung (`id = "jantung"`):**
   - Pilihan Mode: **Istirahat (`72 BPM`)** dan **Olahraga (`130 BPM`)**.
   - Efek Visual: Model 3D jantung berdenyut (*systole/diastole pulse*) sesuai tempo BPM, dilengkapi indikator lampu/ikon detak dan penjelasan perubahan fisiologis tubuh.
   - Efek Audio (Web Audio API): Bunyi detak jantung ganda ***"Lub-Dub"*** menggunakan osilator frekuensi rendah (`OscillatorNode` + `GainNode`), dilengkapi tombol **Suara Aktif/Bisu (Mute)**.
2. **Simulasi Pernapasan (`id = "paru-paru"`):**
   - Pilihan Mode: **Napas Normal (`15x / menit`)** dan **Setelah Olahraga (`30x / menit`)**.
   - Efek Visual: Model 3D paru-paru mengembang (**Inspirasi: Menghirup O₂**) dan mengempis (**Ekspirasi: Mengembuskan CO₂**) secara halus, dilengkapi indikator fase napas secara *real-time*.
   - Efek Audio (Web Audio API): Suara aliran udara pernapasan lembut menggunakan *filtered noise* (`AudioBuffer` + `BiquadFilterNode`), dilengkapi tombol **Suara Aktif/Bisu (Mute)**.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-simulasi-fisiologi
   ```
2. Kerjakan hanya file cakupan fitur ini (`organ.html`, `js/viewer.js`, `css/style.css`, `issues/bonus-simulasi-fisiologi.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add organ.html js/viewer.js css/style.css issues/bonus-simulasi-fisiologi.md
   git commit -m "feat(bonus): simulasi detak jantung dan pernapasan interaktif dengan Web Audio API"
   git push -u origin bonus-simulasi-fisiologi
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `bonus-simulasi-fisiologi` dari `main`.
- [ ] **1. Tambahkan Panel Kontrol Simulasi di `organ.html`**:
  - Tambahkan `<section id="sim-panel" class="sim-panel" hidden>` di bawah `<model-viewer>` yang berisi:
    - Judul simulasi & badge kecepatan (`#sim-rate`, mis. `72 BPM` atau `15 RPM`).
    - Tombol mulai/berhenti simulasi (`#sim-toggle`), tombol ganti mode **Istirahat (`72 BPM`)** vs **Olahraga (`130 BPM`)**, dan tombol **Suara On/Off** (`#sim-sound`).
    - Teks status fase fisiologis (`#sim-status`, mis. *"Sistol: Memompa darah keluar"* atau *"Inspirasi: Paru-paru mengembang menyerap O₂"*).
- [ ] **2. Implementasikan Logika Animasi & Web Audio API di `js/viewer.js`**:
  - Tampilkan `#sim-panel` khusus saat membuka organ `jantung` atau `paru-paru` (sembunyikan untuk organ lain agar relevan secara anatomi).
  - Buat synthesizer bunyi *"Lub-Dub"* (`playHeartbeatSound`) dan suara aliran napas (`playBreathSound`) menggunakan `window.AudioContext || window.webkitAudioContext`.
  - Buat loop animasi mulus (menggunakan `requestAnimationFrame` atau CSS transform/scale terukur pada elemen model) yang mengikuti BPM/RPM yang dipilih.
  - Pastikan semua timer, animasi, dan `AudioContext` dihentikan/dibersihkan saat simulasi dimatikan atau saat user pindah halaman (`pagehide` / `beforeunload`).
- [ ] **3. Tambahkan Styling `.sim-panel` dan Animasi Indikator di `css/style.css`** (mendukung mode terang & gelap).
- [ ] **4. Commit, push branch `bonus-simulasi-fisiologi`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Panel simulasi tampil di halaman `organ.html?id=jantung` dan `organ.html?id=paru-paru`, serta tersembunyi di organ lainnya.
- [ ] Pada Jantung: user bisa menyalakan simulasi, berpindah antara mode **Istirahat (72 BPM)** dan **Olahraga (130 BPM)**, melihat denyut visual, dan mendengar bunyi detak *"Lub-Dub"* (Web Audio API) yang bisa di-*mute*.
- [ ] Pada Paru-paru: user bisa menyalakan simulasi, berpindah antara mode **Normal (15 RPM)** dan **Olahraga (30 RPM)**, melihat animasi kembang-kempis beserta status **Inspirasi / Ekspirasi**, dan mendengar efek suara napas yang bisa di-*mute*.
- [ ] Timer/animasi/audio berhenti bersih saat user menekan tombol Berhenti atau meninggalkan halaman.
- [ ] Mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 `var`, 0 `console.log`).
