# [Fase Bonus] Penguatan Volume Suara Detak Jantung & Mode Getar (Haptic Feedback)

**Labels:** `bonus`, `enhancement`, `audio`, `interactive`  
**Nama Branch Wajib:** `bonus-audio-getar`  
**Target PR:** `main`  
**Estimasi Waktu:** 20 – 30 menit  
**Prasyarat:** PR #29 sudah ter-merge ke `main`

---

## Deskripsi
Memperkeras dan memperjelas suara detak jantung (*"Lub-Dub"*) serta suara pernapasan agar terdengar lantang di speaker HP maupun laptop, sekaligus menambahkan fitur **Mode Getar (Haptic Vibration `navigator.vibrate`)** yang membuat HP ikut bergetar seirama dengan detak jantung *"Lub-Dub"*.

---

## Poin Perubahan Utama
1. **Perkeras Suara Detak Jantung (`js/viewer.js`):**
   - Gunakan kombinasi dual-oscillator (`triangle` pada frekuensi `130 Hz -> 52 Hz` untuk harmonik yang terdengar jelas di speaker kecil + `sine` pada `85 Hz -> 42 Hz` untuk dentuman bass) dengan `DynamicsCompressorNode` dan gain tinggi (`1.4` untuk *Lub*, `1.1` untuk *Dub*).
   - Perkeras juga volume suara napas (`playBreathSound`) dari `0.09` menjadi `0.42` agar terdengar jelas.
2. **Tambahkan Mode Getar (`organ.html` & `js/viewer.js`):**
   - Tambahkan tombol `<button id="sim-vibrate" class="sim-btn" type="button" aria-pressed="true">Getar: Aktif</button>` di `#sim-panel` pada `organ.html`.
   - Saat detak jantung berjalan dan `vibrateEnabled === true`, panggil `navigator.vibrate([75, 105, 55])` (pola getar ganda *Lub-Dub*: getar 75ms, jeda 105ms, getar 55ms).
   - Pada simulasi paru-paru (saat Inspirasi), berikan getaran lembut `navigator.vibrate(45)` jika didukung.
   - Hentikan getaran (`navigator.vibrate(0)`) saat simulasi dihentikan, saat tombol Getar dimatikan, atau saat keluar halaman.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-audio-getar
   ```
2. Kerjakan file cakupan (`organ.html`, `js/viewer.js`, `css/style.css`, `issues/bonus-audio-getar.md`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add organ.html js/viewer.js css/style.css issues/bonus-audio-getar.md
   git commit -m "feat(bonus): perkeras suara detak jantung dan tambah mode getar haptic"
   git push -u origin bonus-audio-getar
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Suara detak jantung *"Lub-Dub"* jauh lebih keras dan terdengar jelas di speaker HP/laptop (memakai gelombang `triangle` + `sine` dan gain/compressor yang lebih kuat).
- [ ] Tombol **Getar: Aktif / Mati** (`#sim-vibrate`) tersedia di `#sim-panel` dan memicu `navigator.vibrate([75, 105, 55])` seirama detak jantung.
- [ ] Getaran otomatis dihentikan (`navigator.vibrate(0)`) saat simulasi berhenti atau keluar halaman.
- [ ] Mematuhi Standar Kode (2 spasi, `camelCase` JS, `kebab-case` CSS, `const`/`let`, 0 `var`, 0 `console.log`).
