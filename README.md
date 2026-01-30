
# First DevOps Project – Node.js with Docker & Docker Compose

Bu repo, **DevOps öğrenme sürecimde oluşturduğum ilk mini projedir**.
Amaç; bir Node.js uygulamasını *doğru şekilde* containerize etmek, environment yönetimini koddan ayırmak ve Docker Compose ile servis yönetimini kavramaktır.

> Bu proje "büyük" bir uygulama olmayı değil, **temel DevOps prensiplerini doğru uygulamayı** hedefler.

---

## Proje Özeti

* Basit bir **Node.js (Express)** uygulaması
* **Dockerfile** ile container haline getirilmiştir
* **Docker Compose** ile servis ayağa kaldırılır
* **.env** dosyası ile environment değişkenleri yönetilir
* Kod içinde environment farkları (`development`, `production`) desteklenir

---

## Kullanılan Teknolojiler

* Node.js
* Express.js
* Docker
* Docker Compose
* Environment Variables (.env)

---

## Proje Yapısı

```
app/
 ├─ index.js
 ├─ package.json
 ├─ Dockerfile
 ├─ .env
 └─ node_modules/

docker-compose.yml
README.md
```

---

## Environment Değişkenleri

`.env` dosyası örneği:

```
PORT=3000
NODE_ENV=development
```

Uygulama içinde şu şekilde kullanılır:

* `process.env.PORT`
* `process.env.NODE_ENV`

Bu sayede:

* Kod **sabit değerlere bağlı kalmaz**
* Farklı ortamlarda (dev / prod) aynı image kullanılabilir

---

## Docker Kullanımı

### Dockerfile

Uygulama, resmi Node.js image’ı kullanılarak container haline getirilmiştir.

* Bağımlılıklar yüklenir
* Kod kopyalanır
* Uygulama `node index.js` ile başlatılır

---

### Docker Compose

Docker Compose sayesinde:

* Port mapping yönetilir
* `.env` dosyası container içine aktarılır
* Tek komutla servis ayağa kaldırılır

Çalıştırmak için:

```
docker-compose up --build
```

---

## Uygulamayı Çalıştırma

Container çalıştıktan sonra tarayıcıdan:

```
http://localhost:3000
```

çıktı:

```
Hello DevOps from development environment
```

---

## Bu Projenin Amacı

Bu proje özellikle şunları öğrenmek için yapılmıştır:

* Dockerfile ve Docker Compose farkını anlamak
* `docker build` vs `docker-compose up` mantığını kavramak
* Environment değişkenlerini **koddan ayırmak**
* Basit ama gerçekçi bir DevOps workflow görmek

---

## Not

Bu proje bir **öğrenme projesidir**.
İlerleyen aşamalarda:

* Nginx eklenmesi
* Logging
* CI/CD pipeline
* Cloud deployment

gibi adımlarla geliştirilecektir.

---

## Author

Ecesu Eryiğit

---

Öğrenme sürecimde attığım bu ilk adımı inceleyen herkese teşekkürler.
