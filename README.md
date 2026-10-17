# 🚀 Modern Developer Portfolio

Portofolio modern, responsif, dan interaktif dengan desain Glassmorphism Dark/Light mode, Interactive Terminal, Dynamic Spotlight, Project Details Modal, dan siap dideploy langsung ke **Vercel** dengan 0-config.

---

## ✨ Fitur Unggulan

- 🎨 **Modern Glassmorphism & Fluid Gradients**: Tampilan bersih, profesional, dan futuristik dengan aksen neon.
- 🌓 **Dark & Light Mode Switcher**: Mendukung pergantian tema instan dengan penyimpanan preferensi di `localStorage`.
- 🔦 **Dynamic Pointer Spotlight**: Efek sorotan lembut mengikuti kursor mouse.
- 💻 **Interactive Shell Terminal**: Pengunjung bisa mengetikkan perintah langsung (`skills`, `projects`, `contact`, `whoami`, `help`, `clear`) atau klik tag cepat.
- 📂 **Filter & Detail Modal Proyek**: Filter proyek berdasarkan kategori (SaaS, Creative/3D, Fintech) dan modal interaktif dengan penjelasan arsitektur & live demo.
- 📊 **Animated Skill Bars**: Progress bar skill yang bergerak dinamis saat di-scroll ke layar.
- 📋 **Copy to Clipboard & Toast Alert**: Salin email instan dengan notifikasi toast visual.
- 📱 **100% Responsif**: Nyaman dibuka dari HP, tablet, maupun layar desktop lebar.
- ⚡ **Zero Dependencies / No Build Step**: Menggunakan HTML5, Vanilla CSS modern, dan ES6 JavaScript. Sangat cepat dimuat (skor Lighthouse optimal).

---

## 📁 Struktur Folder

```text
├── assets/
│   └── images/
│       ├── avatar.jpg            # Foto profil developer (3D avatar)
│       ├── project-saas.jpg      # Preview proyek 1 (SaaS Dashboard)
│       ├── project-creative.jpg  # Preview proyek 2 (3D Creative Agency)
│       └── project-fintech.jpg   # Preview proyek 3 (Fintech Mobile App)
├── css/
│   └── style.css                 # Sistem desain & styling lengkap
├── js/
│   └── main.js                   # Logika interaktif & event handler
├── index.html                    # Halaman utama portofolio
├── vercel.json                   # Konfigurasi keamanan & cache untuk Vercel
└── README.md                     # Panduan penggunaan & deploy
```

---

## 🚢 Cara Deploy ke Vercel

Ada dua cara mudah untuk meng-online-kan portofolio ini ke Vercel:

### Cara 1: Menggunakan GitHub (Paling Direkomendasikan)

1. Buat repositori baru di [GitHub](https://github.com/new) (misal: `portfolio`).
2. Di folder project ini, jalankan perintah git di terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/username-kamu/portfolio.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub.
4. Klik **"Add New..."** > **"Project"**.
5. Pilih repositori `portfolio` kamu, lalu klik **"Deploy"**.
6. Selesai! Web kamu langsung live di `https://portfolio-kamu.vercel.app`.

### Cara 2: Menggunakan Vercel CLI (Tanpa Git)

1. Buka terminal di folder ini, lalu jalankan:
   ```bash
   npx vercel
   ```
2. Ikuti petunjuk singkat di layar (login, konfirmasi direktori `./`, pilih scope akun).
3. Setelah proses selesai, link live portofoliomu akan langsung muncul di terminal!

---

## 🛠️ Cara Kustomisasi Data Pribadi

1. **Ganti Nama & Deskripsi**: Buka [index.html](file:///g:/projek%20gabut/satu/index.html) dan cari kata `Alex Pratama`, lalu ubah sesuai namamu, biodata, dan link media sosialmu.
2. **Ganti Foto Profil / Screenshot Proyek**: Masukkan gambar pengganti ke dalam folder `assets/images/` dengan nama yang sama, atau sesuaikan path-nya di `index.html` dan `js/main.js`.
3. **Kustomisasi Detail Proyek**: Buka [js/main.js](file:///g:/projek%20gabut/satu/js/main.js), lalu sesuaikan objek `projectsData` di bagian atas file untuk mengisi deskripsi fitur proyek aslimu.
