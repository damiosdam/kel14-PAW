<h1 align="center">
  UKM Manage - Information Management System for UKM UGM
</h1>
<p align="center">Web App using MERN + Material UI | Pengembangan Aplikasi Web | Kelompok 14</p>
<hr/>

## 📃 Table of Contents
- Tentang Aplikasi
- Halaman dan Fitur
- Anggota Kelompok 14
- Pembagian Kerja
- Setting Up Project
- Struktur Folder Projek
- API Routes
- Link Penting

## ❓ Tentang Aplikasi
UKM Manage merupakan aplikasi information management system yang ddiperuntukkan kepada pengurus unit kegiatan mahasiswa di UGM agar dokumen dan administrasi lainnya lebih teratur, disiplin, dan terpusat. Website ini juga dapat membantu mengelola UKM seperti mengelola data anggota.

## ✨ Halaman dan Fitur
- ### Login dan Sign Up
  Untuk dapat menggunakan aplikasi UKM Manage, pengguna harus membuat akun terlebih dahulu, kemudian login menggunakan akun tersebut.
- ### Persuratan
  Fitur untuk menyimpan file Persuratan yang sudah pernah dibuat oleh UKM. Next time untuk menambahkan fitur buat surat langsung dari website hingga publikasinya.
- ### Proposal
  Fitur untuk menyimpan file Proposal yang sudah pernah dibuat oleh UKM. Next time untuk menambahkan fitur buat proposal langsung dari website.
- ### LPJ
  Fitur untuk menyimpan file LPJ yang sudah pernah dibuat oleh UKM. Next time untuk menambahkan fitur buat LPJ langsung dari website.
- ### Inventaris
  Fitur untuk mengelola barang inventaris milik UKM.
- ### Anggota
  Fitur untuk mengelola anggota, menyimpan data anggota UKM.
- ### Banyak ide fitur yang tidak dapat semua dikerjakan di tugas ini.

## 👨‍💻 Anggota Kelompok 14
1. [Maulana Anjari Anggorokasih (21/477748/TK/52619)](https://github.com/Maulana-anjari) atau [maulana-anjari-ugm](https://github.com/maulana-anjari-ugm)
2. [Athilla Azka Havillah (21/474647/TK/52362)](https://github.com/athillaazka)
3. [Axel Xaverius Tamtama (21/479414/TK/52892)](https://github.com/axelxav)
4. [Muchammad Daniyal Kautsar (21/479067/TK/52800)](https://github.com/mdaniyalk)
5. [Muhammad Arsyad Ikbar (19/446783/TK/49888)](https://github.com/damiosdam)

## 🏗️ Pembagian Kerja
1. Ide aplikasi: Maulana Anjari, Brainstorming: semua anggota
2. Authentication dan Authorization (backend dan page dari sign up, sign in, aktivasi, logout, forgot password, reset password): Maulana Anjari
3. Manajemen Persuratan (CRUD backend, CRUD frontend, integrasi backend ke frontend): Daniyal Kautsar
4. Manajemen Proposal (CRUD backend, CRUD frontend, integrasi backend ke frontend): Athilla Azka
5. Manajemen LPJ (CRUD backend, CRUD frontend, integrasi backend ke frontend): M Arsyad Ikbar
6. Manajemen Anggota (CRUD backend, CRUD frontend, integrasi backend ke frontend): Axel Xaverius
7. Manajemen Inventaris (CRUD backend, CRUD frontend, integrasi backend ke frontend): Maulana Anjari
8. Backend upload ke google drive, membuat mongodb atlas dan koneksi ke backend: Maulana Anjari
9. Deploy program ke cyclic dan vercel: Maulana Anjari

<hr/>

## ⚙️ Setting Up Project
- Clone this project:
```````````
git clone https://github.com/damiosdam/kel14-PAW.git ukm-manage
cd ukm-manage
```````````
### Backend
- Get into the backend folder:
```````````
cd backend
```````````
- Install required dependencies:
```````````
npm install
```````````
- Run the program:
```````````
npm run dev
```````````
### Frontend
- Get into the backend folder:
```````````
cd frontend
```````````
- Install required dependencies:
```````````
npm install
```````````
- Run the program:
```````````
npm start
```````````
## 📁 Struktur Folder Projek
- ### 💻 Backend
    ```
    - src                       # main folder
        - controllers           # all server-side logic and backend services like auth and 
                                  crud at every feature (function: index, create, show, update, delete, and others)
        - middlewares           # express middleware function (ensuring authentication, uploading file, and form validation)
        - models                # non-relational database schema for mongodb
        - routers               # endpoints of the controllers
        - services              # services that help controller
        - utils                 # utilities stuff like database connection, google drive connection, etc.
    - .env                      # environment variables
    - .gitignore                # git file to ignore some files or folders
    - index.js                  # server initialization
    - package-lock.json         # dependency and versioning lock file
    - package.json              # dependency and npm scripts
    ```
- ### 🖼️ Frontend
    ```
    - public                    # can be shown to the user
    - src                       # main folder
        - assets                # asset non-public (icons)
        - components            # components folder
        - hooks                 # react hook
        - layouts               # layouting dashboard page
        - pages                 # pages every features
        - routes                # page routing
        - services              # services or utilities
        - theme                 # styling
        - App.js                # app routing to folder Router
        - index.js              # react bootstrapper
    - .env                      # environment variables
    - .gitignore                # git file to ignore some files or folders
    - package-lock.json         # dependency and versioning lock file
    - package.json              # dependency and npm scripts
    ```
## 🚀 API Routes
Base URL:
```
https://tiny-pear-lion-tux.cyclic.app
```
Endpoints:
Endpoint | HTTP Method | Description
-|-|-
`api/v1/auth/signin` | `POST`| API for login
`api/v1/auth/signup` | `POST`| API for register
`api/v1/auth/activation` | `POST`| API for activation after registration
`api/v1/auth/forgot-password` | `POST`| API for request for new password
`api/v1/auth/reset-password` | `PUT`| API for set new password after forgot-password
`api/v1/inventaris` | `GET`| API untuk mendapatkan semua data inventaris
`api/v1/inventaris` | `POST`| API untuk menyimpan data inventaris baru
`api/v1/inventaris/:id` | `GET`| API untuk mendapatkan data inventaris berdasarkan id tertentu
`api/v1/inventaris/:id` | `PUT`| API untuk menyimpan perubahan data inventaris berdasarkan id tertentu
`api/v1/inventaris/:id` | `DELETE`| API untuk menghapus data inventaris berdasarkan id tertentu
`api/v1/inventaris/kategori/:kategori` | `GET`| API untuk mendapatkan data inventaris berdasarkan kategori tertentu
`api/v1/proposal` | `GET`| API untuk mendapatkan semua data proposal
`api/v1/proposal` | `POST`| API untuk menyimpan data proposal baru
`api/v1/proposal/:id` | `GET`| API untuk mendapatkan data proposal berdasarkan id tertentu
`api/v1/proposal/:id` | `PUT`| API untuk menyimpan perubahan data proposal berdasarkan id tertentu
`api/v1/proposal/:id` | `DELETE`| API untuk menghapus data proposal berdasarkan id tertentu
`api/v1/persuratan` | `GET`| API untuk mendapatkan semua data persuratan
`api/v1/persuratan` | `POST`| API untuk menyimpan data persuratan baru
`api/v1/persuratan/:id` | `GET`| API untuk mendapatkan data persuratan berdasarkan id tertentu
`api/v1/persuratan/:id` | `PUT`| API untuk menyimpan perubahan data persuratan berdasarkan id tertentu
`api/v1/persuratan/:id` | `DELETE`| API untuk menghapus data persuratan berdasarkan id tertentu
`api/v1/anggota` | `GET`| API untuk mendapatkan semua data anggota
`api/v1/anggota` | `POST`| API untuk menyimpan data anggota baru
`api/v1/anggota/:id` | `GET`| API untuk mendapatkan data anggota berdasarkan id tertentu
`api/v1/anggota/:id` | `PUT`| API untuk menyimpan perubahan data anggota berdasarkan id tertentu
`api/v1/anggota/:id` | `DELETE`| API untuk menghapus data anggota berdasarkan id tertentu
`api/v1/lpj` | `GET`| API untuk mendapatkan semua data lpj
`api/v1/lpj` | `POST`| API untuk menyimpan data lpj baru
`api/v1/lpj/:id` | `GET`| API untuk mendapatkan data lpj berdasarkan id tertentu
`api/v1/lpj/:id` | `PUT`| API untuk menyimpan perubahan data lpj berdasarkan id tertentu
`api/v1/lpj/:id` | `DELETE`| API untuk menghapus data lpj berdasarkan id tertentu

## 🔗 Link Penting
1. [Backend API (deployed on cyclic)](https://tiny-pear-lion-tux.cyclic.app)
2. [Website UKM Manage (deployed on vercel)](https://ukm-manage-kel14.vercel.app/)
3. [Materi Presentasi](https://docs.google.com/presentation/d/158r2mtnLMvyeWrQhYboaQXjowZlaHC7ZF4SXPaqmgEs/edit?usp=sharing)
4. [Video Presentasi Backend](https://drive.google.com/file/d/1ELj7Nc8wTN4cEm0nA99hqUS34H53S8VV/view?usp=sharing)
5. [Need env file?](https://github.com/Maulana-anjari)