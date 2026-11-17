## Ringkasan Pull Request
- **Fase:** Fase `<N>` — `<Nama Fase>`
- **Branch:** `fase-<N>-...` -> `main`
- **Menutup Issue:** Closes #`<nomor-issue>`

---

## 🛠️ Checklist Model Pekerja (Model Murah / Junior Coder)
- [ ] Kode dikerjakan di branch khusus fase ini (bukan langsung di `main`).
- [ ] Hanya mengubah file yang termasuk dalam cakupan Fase ini.
- [ ] Tidak menggunakan framework/bundler; hanya HTML, CSS, Vanilla JS, dan `<model-viewer>` CDN.
- [ ] Tidak ada data organ yang di-*hardcode* di HTML (semua melalui `js/data.js`).
- [ ] Mematuhi Standar Kode: indentasi 2 spasi, JS `camelCase`, CSS `kebab-case`, `const`/`let` (tanpa `var`), dan tidak ada `console.log` tersisa.
- [ ] Seluruh **Acceptance Criteria** pada Issue Fase ini sudah diuji dan lolos.

---

## 🔍 Checklist Audit Model Reviewer (Model Mahal / Senior Reviewer)
> *Bagian ini diisi oleh Model Reviewer sebelum melakukan Merge ke `main`.*

- [ ] **Cakupan File (`git diff main...HEAD`):** Tidak ada perubahan file liar di luar spesifikasi fase ini.
- [ ] **Kepatuhan Skema & Arsitektur:** Struktur folder, nama file, dan skema `js/data.js` sesuai `PLAN.md`.
- [ ] **Keamanan & Kualitas Kode:** Penggunaan `textContent` vs `innerHTML` aman, penanganan error (`try/catch` untuk `localStorage`, redirect `404.html`) berjalan benar.
- [ ] **Verifikasi Acceptance Criteria:** Semua kriteria penerimaan fase ini terbukti terpenuhi tanpa bug.
- [ ] **Keputusan Akhir:** `APPROVE & MERGE` / `REQUEST CHANGES`
