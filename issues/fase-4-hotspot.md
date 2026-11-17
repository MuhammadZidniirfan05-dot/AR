# [Fase 4] Titik Hotspot 3D Interaktif & Panel Info Bagian Organ

**Labels:** `phase-4`, `feature`, `3d-viewer`, `accessibility`  
**Nama Branch Wajib:** `fase-4-hotspot`  
**Target PR:** `main`  
**Estimasi Waktu:** 3 – 4 jam  
**Prasyarat:** PR Fase 3 sudah di-review dan di-merge ke `main`

---

## Deskripsi
Menambahkan fitur titik hotspot interaktif di permukaan model 3D pada `organ.html` / `js/viewer.js`, panel informasi bagian organ (`<aside id="info">`), serta melengkapi 3–5 data koordinat hotspot akurat per organ di `js/data.js`.

---

## Cuplikan Kode Pembuatan Hotspot (`js/viewer.js`)
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

---

## Alur Git & Pull Request (Wajib)
1. Checkout branch baru dari `main`:
   ```bash
   git checkout main && git pull
   git checkout -b fase-4-hotspot
   ```
2. Kerjakan hanya file cakupan Fase 4 (`js/data.js`, `organ.html`, `js/viewer.js`, `css/style.css`).
3. Commit, push branch, dan buat PR ke `main`:
   ```bash
   git add js/data.js organ.html js/viewer.js css/style.css
   git commit -m "feat(fase-4): hotspot 3d interaktif dan panel info bagian organ"
   git push -u origin fase-4-hotspot
   ```
4. **STOP — Jangan merge sendiri!** Tunggu review dari **Model Reviewer (Model Mahal)**.

---

## Daftar Tugas (Tasks)
- [ ] Buat branch `fase-4-hotspot` dari `main`.
- [ ] **1. Cari & perbarui koordinat hotspot di `js/data.js`**:
  - Buka tiap model `.glb` di https://modelviewer.dev/editor/ lalu klik permukaan bagian organ yang ingin ditandai.
  - Salin nilai `data-position` dan `data-normal` ke properti `position` dan `normal` di `js/data.js`.
  - Pastikan setiap organ memiliki **3 sampai 5 hotspot** dengan label dan penjelasan (`info`) yang akurat (level SMP).
- [ ] **2. Tambahkan Panel Info di `organ.html`**:
  - Buat elemen `<aside id="info">` yang menampilkan judul/label hotspot dan deskripsi info hotspot yang diklik.
  - Sediakan tombol tutup (`Close`) pada panel info.
- [ ] **3. Render Hotspot di `js/viewer.js`**:
  - Buat elemen `<button>` hotspot untuk setiap item di `organ.hotspots` dan masukkan ke dalam `<model-viewer id="mv">`.
  - Implementasikan fungsi `showInfo(h)` dan fungsi untuk menutup panel info.
- [ ] **4. Styling Hotspot & Panel Info di `css/style.css`**:
  - Bentuk bulat kecil berwarna mencolok, label muncul jelas saat *hover* atau *focus*.
  - Ukuran area sentuh (*touch target*) minimal `32px x 32px`.
  - Pastikan bisa diakses penuh menggunakan keyboard (`Tab` untuk fokus, `Enter`/`Space` untuk membuka info).
- [ ] **5. Commit, push branch `fase-4-hotspot`, dan buat PR ke `main`**.

---

## Acceptance Criteria (Untuk Diperiksa Model Reviewer)
- [ ] Setiap organ di `js/data.js` memiliki 3–5 hotspot dengan koordinat `position` dan `normal` yang valid serta info akurat.
- [ ] Hotspot menempel di bagian anatomi yang benar saat model 3D diputar.
- [ ] Klik pada titik hotspot menampilkan label dan penjelasan di panel `<aside id="info">`, serta panel dapat ditutup kembali.
- [ ] Hotspot memiliki ukuran sentuh minimal `32px` dan dapat diakses menggunakan keyboard (`Tab` + `Enter`).

---

## 🤖 Prompt untuk Model Pekerja (Model Murah / Coder)
```text
Baca PLAN.md di root repo dan issues/fase-4-hotspot.md.
Kerjakan HANYA Fase 4 pada branch `fase-4-hotspot` (checkout dari `main`).
Patuhi "0. Aturan untuk yang mengerjakan" dan "6. Standar Kode" di PLAN.md.
Setelah selesai, cek Acceptance Criteria Fase 4 satu per satu, commit, push ke branch `fase-4-hotspot`, dan buat Pull Request ke `main`.
JANGAN melakukan merge PR. Laporkan hasil pekerjaan untuk di-review Model Reviewer.
```

## 🔍 Prompt untuk Model Reviewer (Model Mahal / Senior Reviewer)
```text
Review Pull Request pada branch `fase-4-hotspot` terhadap spesifikasi di PLAN.md dan issues/fase-4-hotspot.md.
Periksa `git diff main...fase-4-hotspot`:
1. Pastikan keenam organ di `js/data.js` masing-masing memiliki 3-5 hotspot dengan `id`, `label`, `info`, `position`, dan `normal` yang valid.
2. Pastikan pembuatan tombol hotspot di `js/viewer.js` menggunakan `<button slot="hotspot-...">` sehingga bisa diakses dengan keyboard (`Tab` + `Enter`).
3. Pastikan panel `<aside id="info">` tampil saat hotspot diklik dan memiliki tombol tutup yang berfungsi.
4. Pastikan ukuran tombol hotspot di CSS minimal 32x32 px dan mematuhi Standar Kode.
Jika semua lolos 100%, Approve dan Merge PR ke `main`. Jika ada kekurangan, berikan instruksi revisi ke Model Pekerja.
```
