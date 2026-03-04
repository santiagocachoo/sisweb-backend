# SISWEB Backend

API backend en **Node.js + Express + TypeScript** para una tienda online de productos de limpieza, belleza y skincare.

## Tecnologías

- Node.js
- Express
- TypeScript
- Morgan (logging HTTP)
- Nodemon (desarrollo)

## Estructura base

    .
    ├── src
    │   ├── controllers
    │   ├── models
    │   ├── resources
    │   │   └── img
    │   └── routes
    │       ├── index.ts
    │       └── productRoutes.ts
    ├── dist
    ├── package.json
    └── tsconfig.json

## Endpoints de prueba

- `GET /` → `Hello World!`
- `GET /product` → lista de productos (mensaje de prueba)
- `GET /product/:id` → detalle de producto (mensaje de prueba)
- `POST /product` → crear producto (mensaje de prueba)
- `PATCH /product/:id` → actualizar producto (mensaje de prueba)
- `DELETE /product` → eliminar producto (mensaje de prueba)

## Scripts

- `npm run dev` → modo desarrollo
- `npm run build` → compilar TypeScript
- `npm start` → ejecutar build compilado

## Instalación

```bash
npm install
npm run dev
```

## Estado actual

Proyecto en fase inicial con enrutamiento base y estructura arquitectónica preparada para escalar.
