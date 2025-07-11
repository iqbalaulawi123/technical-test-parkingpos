Breakdown task
**1. Struktur Data** 
-
SingleLinkedList.java

**1.1 Bagaimana memori untuk list dialokasikan dan dikelola dalam metode createList?**
   
Jawaban :
dari list yang terbentuk nanti akan dialokasikan memori heap (memori yang tidak berurutan dan ukurannya nyesuain sama size alokasinya)
selama masih dipanggil/direferensiin bakal tetep disimpen (jika menggunakan garbage collector), 
jika tidak memakai garbage collector maka hashmap tadi masih disimpan dan harus dihapus manual (dikosongkan)
saat createList item-item di Node itu akan punya penghubung yaitu alamat memori selanjutnya :

[[value][memori_address_selanjutnya]], [[value][memori_address_selanjutnya]], ...

jadi setiap item bakal tau nextnya apa dan bisa berurutan (mengikuti next memory address)
item yang tidak punya [memori_address_selanjutnya] bakal jadi item terakhir

**1.2 Apa yang akan terjadi pada memori yang dialokasikan untuk list setelah metode
createList selesai dieksekusi?**

jawaban :
jika memakai garbage collector,setelah running createList, ga ada lagi variabel lain yang nyimpen list maka akan dibersihkan otomatis oleh java
jika tidak memikirkan garbage collector, listnya bakal tetep stay di memori dan harus manual didelete/dikosongkan (dan di manage)

**1.3 Apakah ada potensi kebocoran memori dalam kode di atas? Jelaskan jawaban Anda.**

jika tanpa garbage collector dan tidak ada pembersihan manual variabel hash mapnya masih stay di memori jadi ada potensi leak

**2. Task Linux**
-
/TaskLinux

**3. Koordinasi ke Support dan Engineer (Script phyton)**
-

**4. TASK Build Application**
-
- **ReactJs** /Frontend/frontend
- **Java Spring Boot** /ParkingPOS

Running :
java -jar target/ParkingPOS-0.0.1-SNAPSHOT.jar

Testing :
localhost:8080/
- Login localhost:8080/login
  user : user, passwrod : password
- Login : localhost:8080/dashoard
  halaman selector (milih check-in, check-out)
- Check in : localhost:8080/check-in
- Check out : localhost:8080/check-in

Library :
Lombok
Jpa
https://github.com/eirslett/frontend-maven-plugin (buat automate build react dan ditaro di resource/static)
