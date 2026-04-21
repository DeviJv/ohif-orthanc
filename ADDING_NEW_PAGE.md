# Panduan Menambah Halaman Baru & Hak Akses (Dynamic RBAC)

Dokumen ini menjelaskan langkah demi langkah cara menambahkan halaman baru beserta hak akses (permission) di aplikasi Quantum PACS menggunakan sistem kontrol akses dinamis (Dynamic Role-Based Access Control).

## Langkah 1: Mendaftarkan Permission ke Database

Permission (Hak Akses) didefinisikan secara statis melalui seeder, sementara Role dan pengaturan penggunanya bersifat dinamis lewat *User Interface*. 

Jika Anda ingin membuat halaman baru, misalnya **Laporan Kunjungan** dengan permission bernama `view-laporan`, tambahkan nama permission tersebut ke file `frontend/prisma/seed.js`:

```javascript
// Lokasi: frontend/prisma/seed.js

const permissionsData = [
  'view-dashboard',
  'view-worklist',
  'view-viewer',
  'view-laporan', // <--- Tambahkan nama permission Anda di sini
  // ... permission lainnya
];
```

**Menerapkan Perubahan Seed:**
Karena container Docker telah dikonfigurasi untuk menjalankan Sinkronisasi dan Seeder secara otomatis saat dinyalakan (melalui `entrypoint.sh`), cukup *restart* container `quantum-web`:

```bash
docker compose restart quantum-web
```
Setelah command ini selesai, permission baru akan otomatis muncul di halaman UI **Admin -> Roles Management**.

***

## Langkah 2: Membuat Alur UI & Proteksi Halaman

Sekarang, buat file halaman baru (contoh: di `frontend/app/(main)/laporan/page.tsx`). Untuk membatasi hanya *Role* yang dicentang `view-laporan` yang bisa masuk, gunakan pemanggilan `Session`:

```tsx
// Lokasi: frontend/app/(main)/laporan/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HalamanLaporan() {
   // 1. Dapatkan informasi otentikasi
   const session = await auth();
   
   // 2. Cek apakah di dalam hak akses user terdapat 'view-laporan'
   const hasAccess = session?.user?.permissions?.includes('view-laporan');

   if (!hasAccess) {
      // Alihkan ke URL halaman unauthorized atau dashboard jika tidak punya akses
      redirect('/?error=unauthorized');
   }

   return (
       <div className="p-8">
           <h1>Ini Halaman Laporan</h1>
           {/* Konten Halaman */}
       </div>
   );
}
```

***

## Langkah 3: Menampilkan Menu Dinamis di Sidebar Utama

Untuk menyembunyikan atau memunculkan halaman di panel kiri (Sidebar) berdasarkan hak akses, buka komponen manajemen sidebar dan filter menunya.

```tsx
// Lokasi: frontend/components/app-sidebar.tsx
// ...

export function AppSidebar({ user, ...props }: any) {
  const roleName = user?.role?.name || "";
  const permissions = user?.permissions || [];

  const navMain = [
    // Menu dasar lainnya ...
    {
      title: "Imaging PACS",
      url: "/",
      // ...
    },
    
    // --- CONTOH PENAMBAHAN MENU BARU BERDASARKAN PERMISSIONS ---
    ...(permissions.includes('view-laporan') ? [{
        title: "Reporting",
        url: "/laporan", // arahkan ke path folder page.tsx yang di buat
        icon: <YourIconComponent />,
        items: [
          {
            title: "Laporan Bulanan",
            url: "/laporan",  
          }
        ]
    }] : []),

  ].filter(item => !(item as any).hidden);

// ... sisa komponen  
```

***

## Langkah 4: Hubungkan Permission dengan Role lewat Antarmuka

Langkah dari sisi teknis programmer sudah selesai. Sisanya Anda (atau pihak Administrator IT) hanya tinggal melakukan konfigurasi visual di UI:

1. Buka aplikasi dan **Login sebagai ROOT atau SUPER-ADMIN**.
2. Masuk ke halaman **User & Roles -> Roles Management**.
3. Di dalam tabel *Roles*, buat Role baru atau tekan ikon Edit pada tabel Role yang sudah ada.
4. Anda akan melihat tombol *checkbox* berlabel **`view-laporan`**.
5. Centang *checkbox* tersebut lalu klik simpan.

Kini, pengguna yang disematkan dengan Role tersebut secara instan akan kebagian fitur "Halaman Laporan" yang barusan Anda implementasi tanpa ada proses hardcoding panjang!
