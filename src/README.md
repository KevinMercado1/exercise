API de Reservas de Restaurante

API REST desarrollada con NestJS como mini proyecto para practicar diferentes componentes del framework y comprender el flujo completo de una petición HTTP.

Descripción

El proyecto implementa una API para administrar reservas de un restaurante.

Se trabajan los siguientes componentes de NestJS:

Middleware para registrar las peticiones.

Guard para proteger el endpoint mediante una API Key.

DTO y ValidationPipe para validar los datos.

Interceptor para uniformar las respuestas exitosas.

Exception Filter para uniformar las respuestas de error.

Controller para recibir las peticiones.

Service para ejecutar la lógica de la aplicación.

Flujo de una petición

El flujo principal de una petición es:

Request
↓
Middleware
↓
Guard
↓
Interceptor
↓
Pipe
↓
Controller
↓
Service
↓
Interceptor
↓
Response

En caso de producirse una excepción:

Error
↓
Exception Filter
↓
Error Response

Endpoint principal
Crear una reserva
POST /reservations

Headers

El endpoint requiere una API Key:

x-api-key: restaurant-secret

Body
{
"customerName": "Carlos Pérez",
"email": "carlos@email.com",
"people": 4
}

Validaciones

El DTO CreateReservationDto valida los siguientes campos:

Campo Validación
customerName Obligatorio y debe ser texto
email Obligatorio y debe tener formato de email válido
people Número entero y mínimo 1

Ejemplo de datos inválidos:

{
"customerName": "",
"email": "esto-no-es-un-email",
"people": 0
}

Estos datos son rechazados por el ValidationPipe antes de ejecutar la lógica del Controller.

API Key

El POST /reservations está protegido mediante ApiKeyGuard.

API Key válida:

restaurant-secret

Si la API Key no existe o es incorrecta, la petición devuelve:

403 Forbidden

El endpoint GET /reservations permanece público.

Respuesta exitosa

Las respuestas exitosas son transformadas mediante ResponseInterceptor.

Ejemplo:

{
"success": true,
"data": {
"customerName": "Carlos Pérez",
"email": "carlos@email.com",
"people": 4
},
"timestamp": "2026-10-01T00:00:00.000Z"
}

Respuesta de error

Las excepciones HTTP son procesadas mediante HttpExceptionFilter.

Ejemplo:

{
"success": false,
"statusCode": 400,
"message": "Reservation data is invalid",
"path": "/reservations",
"timestamp": "2026-10-01T00:00:00.000Z"
}

Middleware

El LoggerMiddleware registra información sobre cada petición en la consola.

Ejemplo:

[REQUEST] POST /reservations - 19:28:02 - 3ms

El registro muestra:

Método HTTP.

Ruta.

Hora de llegada.

Tiempo aproximado de procesamiento.

Estructura del proyecto
src/
├── common/
│ ├── filters/
│ │ └── http-exception.filter.ts
│ ├── guards/
│ │ └── api-key.guard.ts
│ ├── interceptors/
│ │ └── response.interceptor.ts
│ └── middleware/
│ └── logger.middleware.ts
│
├── reservation/
│ ├── dto/
│ │ └── create-reservation.dto.ts
│ ├── reservation.controller.ts
│ ├── reservation.service.ts
│ └── reservation.module.ts
│
├── app.controller.ts
├── app.module.ts
└── main.ts

Instalación

Instalar las dependencias:

npm install

Ejecutar el proyecto

Modo desarrollo:

npm run start:dev

La API estará disponible en:

http://localhost:3000

Pruebas realizadas

Se comprobaron los siguientes escenarios:

# Escenario Resultado esperado

1 POST válido + API Key correcta Respuesta exitosa
2 POST sin API Key 403 Forbidden
3 Email inválido Error de validación
4 Excepción provocada Respuesta de error uniforme
5 Petición normal Registro en consola
6 Respuesta exitosa Formato success/data/timestamp
Tecnologías

NestJS

TypeScript

Express

class-validator

class-transformer

RxJS

Objetivo del proyecto

El objetivo principal es comprender cómo interactúan diferentes componentes de NestJS dentro del ciclo de vida de una petición HTTP, implementando cada capa de manera independiente y comprobando su funcionamiento mediante pruebas.
