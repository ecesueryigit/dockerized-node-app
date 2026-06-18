--First DevOps Project – Node.js CI/CD with Docker

This project demonstrates a complete DevOps workflow including:

* Containerization with Docker
* Multi-environment Docker image builds (dev / prod / release)
* CI/CD pipeline using GitHub Actions
* Automated testing, linting, and security scanning (Trivy)
* Docker image versioning and Docker Hub deployment

The goal of this project is not complexity, but to simulate a real-world DevOps pipeline from code → test → build → security scan → publish.

--Project Architecture

Developer
   |
   v
GitHub (dev / main / tags)
   |
   v
GitHub Actions CI/CD Pipeline
   |
   +----------------------+
   |                      |
   v                      v
Test Stage           Build Stage
   |                      |
   v                      v
Lint + Unit Tests   Docker Image Build
   |
   v
Security Scan (Trivy)
   |
   v
Docker Hub Push
   |
   v
Deployment-ready Image
Application Stack
Node.js (Express)
Docker
Docker Compose
GitHub Actions
Trivy (Security Scanner)
CI/CD Pipeline Overview

The workflow runs on:

push to dev branch → development image
push to main branch → production image
git tag v* → release image
pull request → test pipeline only

--Pipeline Stages

1. Test Stage
- Checkout repository
- Install dependencies (npm ci)
- Run ESLint
- Run unit tests (Jest)
- 
2. Build Stage
- Build Docker image based on branch:
dev → dev image
main → production image
tag → versioned release image

Tagging strategy:
dev
main
latest
commit SHA
version tag

3. Security Stage (Trivy)
- Scans Docker images for vulnerabilities
- Dev branch → non-blocking scan
- Main and release → blocking scan (fail on HIGH/CRITICAL issues)

4. Push Stage

Images are pushed to Docker Hub:

ecesueryigit/dockerized-node-app
Docker Image Strategy
Branch	Tag Strategy
dev	(dev + SHA)
main	(latest + main + SHA)
tags	versioned release

--How to Run Locally

*Development
docker compose -f docker-compose.dev.yml up --build

*Production
docker compose -f docker-compose.prod.yml up --build


--Environment Variables

Example .env:

PORT=3000
NODE_ENV=development

--
Endpoints
/ → Hello message
/health → health check
/todos → simple file-based TODO API

--Key DevOps Concepts Demonstrated

* CI/CD automation (GitHub Actions)
* Branch-based deployment strategy
* Docker image versioning
* Security scanning in pipeline
* Environment separation (dev / prod)
* Containerized Node.js application

--Author
Ecesu Eryiğit
