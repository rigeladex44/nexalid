# Mengganti logo dan background NEXAL ID

File yang digunakan website:

- `assets/logo.svg`: simbol N pada navigasi, footer, dan favicon (ikon tab browser). Format vektor, tetap tajam saat diperbesar.
- `assets/background.webp`: gambar background kantor gelap yang dibuat khusus untuk tema kaca. Ini gambar generatif, bukan foto kantor asli perusahaan.
- `assets.css`: pengaturan gambar background, posisi, dan tingkat gelap. Terletak di folder utama repo.

## Melalui GitHub web

1. Buka repository `rigeladex44/nexalid`, pilih branch `main`, lalu buka folder `assets`.
2. Pilih **Add file → Upload files**, unggah pengganti dengan nama yang sama, lalu commit. Pastikan formatnya benar: mengganti nama `.jpg` menjadi `.webp` tidak mengonversi format gambar.
3. Vercel akan deploy otomatis jika terhubung ke branch tersebut. Setelah status Ready, refresh; bila masih tampil aset lama gunakan hard refresh. Favicon dapat memerlukan waktu lebih lama karena cache browser.

## Jika format atau nama file berbeda

- Background JPG/PNG: upload misalnya `assets/kantor.jpg`, lalu edit `assets.css` melalui ikon pensil di GitHub. Ganti `url("assets/background.webp")` dengan `url("assets/kantor.jpg")`.
- Logo PNG/WebP: disarankan persegi dengan latar transparan. Upload misalnya `assets/logo.png`, lalu ganti kedua `src="assets/logo.svg"` dalam `index.html` dengan `src="assets/logo.png"`. Untuk favicon, ganti `href="assets/logo.svg"` dan `type="image/svg+xml"` menjadi format yang sesuai, misalnya `type="image/png"`.
- Tulisan **NEXAL ID** tetap berupa teks HTML di samping simbol agar tajam dan mudah dibaca. Untuk logo lengkap dengan tulisan, sesuaikan teks brand pada navigasi dan footer agar tidak terduplikasi.

## Pengaturan background

Di `assets.css`:

```css
--background-position: center center;
--background-overlay: rgba(13, 14, 16, 0.68);
```

Angka `0.68` mengatur lapisan gelap. Naikkan ke `0.8` agar lebih gelap, turunkan ke `0.5` agar foto lebih terlihat. Pastikan tulisan tetap mudah dibaca. Background menggunakan `cover`, sehingga tepinya bisa terpotong mengikuti ukuran layar. Pakai gambar landscape setidaknya 1600 piksel dan sebaiknya berukuran di bawah 500 KB.

Simpan perubahan melalui commit. File yang baru di-commit di lingkungan chat harus di-push ke GitHub sebelum tampil di Vercel.
