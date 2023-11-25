# Backend Javascript Challenge - Gold Chapter 7

## Hal-Hal yang Harus Kamu Lewati

### ACCEPTANCE CRITERIA

#### Kriteria pengumpulan challenge yang harus kamu penuhi untuk dapat melewati chapter

### SKILL METRICS

#### Kemampuan teknis yang akan kamu pelajari

## DELIVERY

### Hal yang akan kamu lakukan untuk dapat melewati chapter

1. **Mengimplementasikan Debugging & Logging (30 points)**
   - Menggunakan Sentry untuk mencatat error dalam aplikasi.

2. **Mengimplementasikan Real-Time Communication (40 points)**
   - Menerapkan fitur real-time notifikasi sebagai welcome notif dan update password.

3. **Mampu menggunakan fitur mailer (30 points)**
   - Menerapkan mailer untuk fitur lupa password.

### CRITERIA

#### Kriteria pengumpulan challenge yang harus kamu penuhi untuk dapat melewati chapter

## Studi Kasus

Pada challenge kali ini, kamu akan melakukan debugging dan logging menggunakan Sentry dan mengimplementasikan Notification menggunakan websocket dan Nodemailer.

### Langkah Pengerjaan

Ikuti langkah-langkah berikut:

1. Siapkan project baru dengan fitur autentikasi JWT di dalamnya.
2. Tambahkan Sentry dalam project tersebut.
3. Implementasikan mailer untuk fitur lupa password:
   - Buatlah endpoint lupa password dimana API tersebut akan mengirimkan link melalui email untuk membuat password yang baru.
   - Buatlah halaman untuk mengisi password yang baru.
   - Buatlah endpoint untuk mereset password.
   - Alurnya seperti berikut:
     - User mengakses halaman lupa password dan mengisi email.
     - Hit endpoint lupa password dan kirimkan link melalui email.
     - Ketika link dibuka maka akan muncul halaman untuk mengisi password yang baru.
     - Ketika di submit, hit endpoint reset password.

4. Implementasikan fitur notifikasi:
   - Kirimkan welcome notif ketika user membuat akun baru.
   - Kirimkan notifikasi saat fitur ganti password berhasil.
