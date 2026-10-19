# Mengganti logo dan background NEXAL ID

File yang digunakan website:

- `assets/logo.png`: logo hijau zamrud dan emas dengan latar transparan, digunakan pada navigasi, footer, dan favicon (ikon tab browser).
- `assets/background.webp`: background kantor generatif yang disimpan sebagai pilihan, saat ini tidak digunakan karena tema memakai latar putih bersih.
- `assets.css`: pengaturan background dan ukuran logo.
- `light.css`: tema putih bersih, panel kaca terang, dan warna teks; dimuat setelah `glass.css`.

## Melalui GitHub web

1. Buka repository `rigeladex44/nexalid`, pilih branch `main`, lalu buka folder `assets`.
2. Pilih **Add file → Upload files**, unggah pengganti dengan nama yang sama, lalu commit. Pastikan formatnya benar: mengganti nama `.jpg` menjadi `.webp` tidak mengonversi format gambar.
3. Vercel akan deploy otomatis jika terhubung ke branch tersebut. Setelah status Ready, refresh; bila masih tampil aset lama gunakan hard refresh. Favicon dapat memerlukan waktu lebih lama karena cache browser.

## Jika format atau nama file berbeda

- Background JPG/PNG: upload misalnya `assets/kantor.jpg`, lalu edit `assets.css` melalui ikon pensil di GitHub. Ganti `url("assets/background.webp")` dengan `url("assets/kantor.jpg")`.
- Logo: ganti `assets/logo.png` dengan PNG transparan milik Anda. Gunakan margin kosong yang kecil agar simbol terlihat jelas. Bila memakai nama atau format lain, ubah kedua `src="assets/logo.png"` dan favicon `href="assets/logo.png"` di `index.html`; sesuaikan juga tipe favicon. Ukuran tampilan logo diatur pada `.mark` di `assets.css`.
- Tulisan **NEXAL ID** tetap berupa teks HTML di samping simbol agar tajam dan mudah dibaca. Untuk logo lengkap dengan tulisan, sesuaikan teks brand pada navigasi dan footer agar tidak terduplikasi.

## Pengaturan background

Di `assets.css`:

```css
--background-position: center center;
--site-background: none;
--background-overlay: rgba(255, 255, 255, 0);
```

Default `none` memakai latar putih tanpa foto. Untuk mengaktifkan foto lagi, ganti `none` menjadi `url("assets/background.webp")`. Angka terakhir pada `rgba` mengatur kekuatan lapisan putih; misalnya `0.8` membuat foto sangat lembut. Pastikan tulisan tetap mudah dibaca. Background menggunakan `cover`, sehingga tepinya bisa terpotong mengikuti ukuran layar. Pakai gambar landscape setidaknya 1600 piksel dan sebaiknya berukuran di bawah 500 KB.

Simpan perubahan melalui commit. File yang baru di-commit di lingkungan chat harus di-push ke GitHub sebelum tampil di Vercel.

## Warna brand

Aksen tombol dan navigasi memakai hijau zamrud (`#09845a`, `#045b3d`), dengan emas (`#dfbd58`, `#d8bd62`) untuk penekanan teks dan ikon. Pengaturan ada di `glass.css`. Background foto tetap terpisah dan dapat diganti sendiri.
