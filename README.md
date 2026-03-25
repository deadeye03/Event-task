# Live Application

[(https://event-task.onrender.com/api-docs)]

# Mini Event Management System (Backend)

A RESTful backend for managing events and ticket bookings, built with Node.js, Express, Prisma, and MySQL.

## Features

- Create and list upcoming events
- Book tickets with availability checks
- Unique booking code per booking
- Basic attendance validation
- Input validation and structured error handling
- Swagger (OpenAPI) docs ready to serve

## Tech Stack

- Runtime: Node.js (TypeScript)
- Framework: Express
- ORM: Prisma (MariaDB/MySQL adapter)
- Validation: Zod
- Docs: Swagger UI

## Project Structure

```
src/
  app.ts
  server.ts
  lib/            # Prisma client
  utils/          # helpers, validation, error handling
  v1/
    controllers/
    routes/
prisma/
  schema.prisma
```

## Setup

1. Install dependencies

```
npm install
```

2. Environment variables (`.env`)

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?ssl-mode=REQUIRED"
DATABASE_HOST=...
DATABASE_USER=...
DATABASE_PASSWORD=...
DATABASE_NAME=...
DATABASE_PORT=...
PORT=8000
NODE_ENV=development
```

3. Prisma

```
npx prisma generate
```

(Optional) migrate or push:

```
npx prisma migrate dev --name init
# or
npx prisma db push
```

4. Run

```
npm run dev      # tsx watch
npm run build    # tsc && tsc-alias
npm start        # run compiled build
```

## API (v1)

- GET /api/v1/events
- POST /api/v1/events
- DELETE /api/v1/events/:id

## Notes

- TypeScript paths are resolved via `tsc-alias` after build.
- Database uses Prisma MariaDB adapter with SSL; ensure correct port and SSL settings in `.env`.

## Future Improvements

- Authentication (JWT)
- Pagination for events
- Rate limiting
- Docker packaging
