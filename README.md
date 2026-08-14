Dockerized Node.js DevOps Application

Node.js & Express ile geliştirilmiş bir REST API'nin build → test → security scan → deploy süreçlerini uçtan uca otomatikleştiren DevOps projesi.

# Project Overview

Bu projede yalnızca uygulamayı Dockerize etmek yerine, uygulamanın geliştirme ve production süreçlerini tek bir CI/CD workflow içerisinde yönetmeye odaklandım.

Temel akış:

Code Push
    ↓
GitHub Actions
    ↓
Build
    ↓
Test
    ↓
ESLint
    ↓
Trivy Security Scan
    ↓
Docker Image
    ↓
AWS EC2 Deployment
    ↓
Prometheus / Grafana
    ↓
CloudWatch

## Tech Stack

| Category         | Technologies           |
| ---------------- | ---------------------- |
| Application      | Node.js, Express       |
| Database         | MongoDB, Mongoose      |
| Containerization | Docker, Docker Compose |
| Reverse Proxy    | Nginx                  |
| Testing          | Jest, Supertest        |
| Code Quality     | ESLint                 |
| Security         | Trivy                  |
| CI/CD            | GitHub Actions         |
| Infrastructure   | AWS EC2, Terraform     |
| Monitoring       | Prometheus, Grafana    |
| Cloud Monitoring | AWS CloudWatch         |
| Version Control  | Git, GitHub            |


## Architecture

                    GitHub
                       │
                       │ Push
                       ▼
              ┌─────────────────┐
              │ GitHub Actions  │
              └────────┬────────┘
                       │
              Build / Test / Scan
                       │
                       ▼
                Docker Image
                       │
                       ▼
              ┌─────────────────┐
              │    AWS EC2      │
              │                 │
              │     Nginx       │
              │        │        │
              │     Node.js     │
              │        │        │
              │    MongoDB      │
              └─────────────────┘
                       │
              ┌────────┴────────┐
              ▼                 ▼
         Prometheus          CloudWatch
              │
              ▼
           Grafana

## CI/CD Pipeline

GitHub Actions pipeline aşağıdaki aşamalardan oluşmaktadır:

Build

Docker image oluşturulur ve uygulamanın production image'ı hazırlanır.

Test

Jest ve Supertest kullanılarak API testleri çalıştırılır.

Code Quality

ESLint ile kod kalitesi kontrol edilir.

Security Scan

Trivy kullanılarak Docker image içerisindeki bilinen güvenlik açıkları taranır.

Deploy

Başarılı pipeline sonrasında Docker image AWS EC2 üzerinde deploy edilir.

Deployment sırasında GitHub Actions runner'ın IP adresi Security Group'a geçici olarak SSH erişimi için eklenir.

Deploy tamamlandıktan sonra bu kural otomatik olarak kaldırılır.

Böylece SSH:

0.0.0.0/0

şeklinde internete açık bırakılmaz.

## Security

Projede birden fazla güvenlik katmanı bulunmaktadır:

Trivy ile container vulnerability scanning
AWS Security Group ile network erişim kontrolü
SSH erişiminin yalnızca gerekli IP'lere sınırlandırılması
GitHub Secrets ile credential yönetimi
GitHub Actions sırasında ephemeral runner IP için geçici SSH erişimi
Deploy sonrası geçici SSH kuralının otomatik kaldırılması

AWS credentials repository içerisinde tutulmaz.

## Infrastructure as Code

AWS EC2 ve Security Group altyapısı Terraform ile yönetilmektedir.

Terraform ile:

EC2
Security Group
Variables
Data Sources
Outputs

yönetilmektedir.

Örneğin:

terraform plan

ile mevcut AWS altyapısı Terraform konfigürasyonu ile karşılaştırılabilir.

## Monitoring

Uygulama ve container ortamının izlenmesi için:

Prometheus

metrik toplama amacıyla,

Grafana

ise bu metriklerin görselleştirilmesi amacıyla kullanılmaktadır.

AWS tarafındaki kaynakların izlenmesi için ayrıca CloudWatch kullanılmaktadır.

## Docker

Uygulama Docker container içerisinde çalıştırılmaktadır.

Production ortamında Docker Compose ile servisler yönetilmektedir.

Temel servisler:

Node.js
MongoDB
Nginx
Prometheus
Grafana

## Nginx

Nginx, Node.js uygulamasının önünde reverse proxy olarak kullanılmaktadır.

Client
  ↓
Nginx :80
  ↓
Node.js :3000

Bu sayede uygulama doğrudan dış dünyaya açılmak yerine Nginx üzerinden erişilebilir hale getirilmiştir.

## Testing

API testleri Jest ve Supertest ile gerçekleştirilmiştir.

Örnek test senaryoları:

GET /todos
POST /todos

## Local Development

Repository klonlandıktan sonra gerekli environment değişkenleri oluşturularak Docker Compose ile uygulama çalıştırılabilir.

Örnek:

docker compose -f docker-compose.dev.yml up -d

Uygulama:

http://localhost

üzerinden erişilebilir.

## Environment Variables

Gerçek environment değerleri repository içerisinde tutulmaz.

Örnek değişkenler:

PORT=3000
NODE_ENV=production
MONGO_URL=mongodb://mongo:27017/todosdb

Gerçek değerler .env / GitHub Secrets üzerinden sağlanır.

## Project Structure

dockerized-node-app/
├── app/
│   ├── server.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── eslint.config.mjs
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── .dockerignore
│
├── terraform/
│   ├── provider.tf
│   ├── data.tf
│   ├── ec2.tf
│   ├── security_group.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── terraform.tfvars.example
│   └── .terraform.lock.hcl
│
├── prometheus/
│   ├── prometheus.yml
│   └── alerts.yml
│
├── alertmanager/
│   └── alertmanager.yml
│
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── nginx.conf
├── .env.example
├── .gitignore
├── trivy.json
├── LICENSE
└── README.md

## Project Goal

Bu projenin amacı, bir backend uygulamasını yalnızca geliştirmek yerine containerization, CI/CD, infrastructure as code, security ve monitoring süreçlerini bir araya getirerek production'a yakın bir DevOps workflow oluşturmaktır.