# Mengganti logo dan background NEXAL ID

File yang digunakan website:

- `assets/logo.png`: logo hijau zamrud dan emas dengan latar transparan, digunakan pada navigasi, footer, dan favicon (ikon tab browser).
- `assets/background.webp`: background ornamen putih–hijau yang diadaptasi dari referensi gambar pengguna. Dipakai sebagai latar viewport dengan skala proporsional (`cover`), tanpa diulang.
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
--background-position: left center;
--site-background: url("assets/background.webp");
--background-overlay: rgba(255, 255, 255, 0);
```

Untuk kembali ke putih polos, ubah `--site-background` menjadi `none`. Angka terakhir pada `rgba` mengatur kekuatan lapisan putih; misalnya `0.8` membuat foto sangat lembut. Pastikan tulisan tetap mudah dibaca. Background menggunakan `cover`, sehingga tepinya bisa terpotong mengikuti ukuran layar. Pakai gambar landscape setidaknya 1600 piksel dan sebaiknya berukuran di bawah 500 KB.

Simpan perubahan melalui commit. File yang baru di-commit di lingkungan chat harus di-push ke GitHub sebelum tampil di Vercel.

## Warna brand

Aksen tombol dan navigasi memakai hijau zamrud (`#09845a`, `#045b3d`), dengan emas (`#dfbd58`, `#d8bd62`) untuk penekanan teks dan ikon. Pengaturan dasar ada di `glass.css` dan tema terang di `light.css`. Background foto tetap terpisah dan dapat diganti sendiri.

## Skala background responsif

Gambar memakai `background-size: cover` pada layer yang mengikuti viewport, sehingga tidak gepeng atau memanjang sepanjang halaman. Sebagian tepi gambar dapat terpotong sesuai rasio layar. Desktop memakai posisi `left center`; pada layar sampai 700px posisi menjadi `28% center`. Ubah nilai ini di `assets.css` untuk menggeser motif. Panel utama memakai putih 42% dan blur 3px, diatur di akhir `light.css`, agar ornamen terlihat lembut tanpa mengganggu teks.

## Motion

`motion.css` mengatur hover, respons kartu hero terhadap kursor, dan bayangan navbar saat gulir. `motion.js` mengatur animasi masuk satu kali saat konten terlihat dan transisi isi FAQ. Untuk menyesuaikan tempo animasi masuk, ubah `duration: 760` (milidetik) dan jeda bertahap `65` di `motion.js`. Gulir navigasi tetap memakai `navigation.js`. Pengaturan perangkat **Reduce motion** dihormati, termasuk bila diubah saat halaman terbuka. Semua konten tetap terbaca tanpa JavaScript.

## Alternatif background yang lebih tenang

`assets/background-sage.webp` adalah alternatif generatif putih gading dengan sage lembut dan aksen champagne, tanpa motif ramai. Sudah aktif melalui `--site-background` di `assets.css`. Bagian tengah sengaja lapang agar konten dan efek kaca tetap nyaman dibaca.

## Background bergerak

Cahaya sage–emas pada `body:after` bergerak perlahan selama 28 detik per arah (`ambientLight` di `motion.css`). Gambar dasarnya tetap diam. Tombol **Jeda animasi latar** menyimpan pilihan di browser melalui localStorage; animasi juga berhenti saat tab tidak aktif atau Reduce motion menyala. Ubah durasi `28s` atau alpha gradient untuk mengatur tempo dan intensitas. Untuk memakai motif lama lagi, arahkan `--site-background` ke `assets/background.webp`.
