# NestJS - Groupe 2

## Membres du groupe

- PANIC Nikola
- BOUKHATEM Mustapha
- SABER Mehdi

## Installation

Copy `.env.example` to `.env` and fill the values.

```bash
docker compose build --no-cache --pull
```

```bash
docker compose up -d
```

### Prisma

#### Migrate

```bash
docker compose exec nest npx prisma migrate dev
```

#### Seed the database

```bash
docker compose exec nest npx prisma db seed
```

