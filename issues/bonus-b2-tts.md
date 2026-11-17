# [Fase Bonus B2] Narasi Suara (Text-to-Speech Bahasa Indonesia)

**Labels:** `bonus`, `enhancement`, `accessibility`, `tts`  
**Nama Branch Wajib:** `bonus-b2-tts`  
**Target PR:** `main`  
**Estimasi Waktu:** 30 – 45 menit  
**Prasyarat:** Seluruh Fase MVP (Fase 0 – Fase 9) selesai

---

## Deskripsi
Menambahkan fitur **Narasi Suara (Text-to-Speech)** pada halaman detail organ (`organ.html` dan `js/viewer.js`) menggunakan Web Speech API (`window.speechSynthesis` dengan `lang = "id-ID"`) untuk membacakan deskripsi, fungsi, dan fakta menarik organ.

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b bonus-b2-tts
   ```
2. Kerjakan hanya file cakupan Fase Bonus B2 (`organ.html`, `js/viewer.js`, `css/style.css`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add organ.html js/viewer.js css/style.css
   git commit -m "feat(bonus-b2): tambah fitur narasi suara speechSynthesis id-ID"
   git push -u origin bonus-b2-tts
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `bonus-b2-tts` dari `main`.
- [ ] **1. Tambahkan tombol "Bacakan" di `organ.html`**:
  - Tambahkan `<button id="btn-tts" class="btn-tts" type="button">Bacakan</button>` di halaman detail organ (`organ.html`).
- [ ] **2. Implementasikan `speechSynthesis` di `js/viewer.js`**:
  - Cek dukungan `'speechSynthesis' in window`. Jika browser tidak mendukung, sembunyikan tombol `#btn-tts` (`btnTts.hidden = true`).
  - Saat tombol **"Bacakan"** diklik:
    - Buat `new SpeechSynthesisUtterance(...)` berisi teks narasi organ (`nama`, `deskripsi`, daftar `fungsi`, dan `fakta`), set `utterance.lang = "id-ID"`.
    - Ubah teks tombol menjadi **"Berhenti"** dan tambahkan class `.speaking` saat suara sedang berjalan.
    - Saat pembacaan selesai (`onend`) atau terjadi error (`onerror`), kembalikan teks tombol menjadi **"Bacakan"** dan hapus class `.speaking`.
  - Saat tombol diklik ketika sedang berbicara (`speechSynthesis.speaking`), panggil `speechSynthesis.cancel()` dan kembalikan teks tombol menjadi **"Bacakan"**.
  - Pastikan suara otomatis dihentikan (`speechSynthesis.cancel()`) saat user meninggalkan atau menutup halaman (`pagehide` / `beforeunload`).
- [ ] **3. Tambahkan styling `.btn-tts` di `css/style.css`** (mendukung mode terang & gelap, serta state `.speaking`).
- [ ] **4. Commit, push branch `bonus-b2-tts`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Tombol **"Bacakan"** tampil di `organ.html` (dan otomatis disembunyikan jika browser tidak mendukung `speechSynthesis`).
- [ ] Klik **"Bacakan"** membacakan informasi organ dengan `lang = "id-ID"` dan mengubah teks tombol menjadi **"Berhenti"**.
- [ ] Klik **"Berhenti"** langsung menghentikan suara (`speechSynthesis.cancel()`) dan mengembalikan teks tombol menjadi **"Bacakan"**.
- [ ] Suara otomatis berhenti saat user berpindah halaman (`pagehide` / `beforeunload`).
- [ ] Mematuhi seluruh Standar Kode (`const`/`let`, 2 spasi, `camelCase` JS, `kebab-case` CSS, 0 `var`, 0 `console.log`).
