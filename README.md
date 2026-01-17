# Prueba Técnica – Albatros

Aplicación Full-Stack con Angular + NestJS + MongoDB + Docker

Este proyecto implementa un sistema de gestión de publicaciones (posts) y comentarios, con autenticación mediante JWT, paginación, búsqueda, CRUD completo y pruebas unitarias tanto en el backend como en el frontend.

# Tecnologías Utilizadas
# Frontend – Angular

Angular 18 (Standalone Components)

Signals

Reactive Forms

HttpClient

Angular Router

Interceptors

Karma + Jasmine (Tests)

# Backend – NestJS

NestJS 11

Mongoose (MongoDB)

JWT Auth (Passport)

DTOs + Validation Pipes

Modular Architecture

Jest (Pruebas Unitarias)

Infraestructura

Docker & Docker Compose

MongoDB como contenedor persistente

Funcionalidades Implementadas
# -Backend (NestJS)

Registro y login con JWT

CRUD completo de Posts

CRUD completo de Comments

Búsqueda por texto

Paginación (page, limit)

Respuestas unificadas en formato estándar

Middlewares y Guards para rutas protegidas

# -Frontend (Angular)

Login funcional con extracción de email desde JWT

Lista de posts con paginación

Búsqueda en tiempo real (signals)

Crear/editar/eliminar posts

Crear/editar/eliminar comentarios

Formulario reactivo validado

Manejo de estados con Signals

Servicios desacoplados

Pruebas unitarias de servicios y componentes clave

# instalación backend
cd Backend
npm install
npm run start:dev
# Archivo .env:

MONGO_URI=mongodb://localhost:27017/posts_manager
JWT_SECRET=JWT_SECRET
PORT=3000

# instalación frontend
cd Frontend
npm install
ng serve

# Ejecutar con Docker

Desde /Backend:

docker compose up --build

# Servicios:

Servicio	Puerto
Backend	    3000
MongoDB	    27017

# para ejecturar las pruebas

frontend - npm test
backend - npm test

# Autor

Jallmar Samuels – Full stack developer formado en (UCR)
