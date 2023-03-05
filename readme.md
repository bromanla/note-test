# Severstal
[Посмотреть тестовое задание](./docs/test-task.md)

## Docker

```bash
docker-compose up
```

## Build

> Make environment variables (see packages/*/.env.example)

> Duplicate database (see packages/backend/template.sqlite)

> We use node version 16+

Download the dependencies:

```bash
npm ci
```

To run compile the Typescript:

```bash
npm run build -ws
```

Remove dependencies for development:

```bash
npm ci --omit=dev -w @severstal-test/backend
```

To run the application:

```bash
npm run start:prod -w @severstal-test/backend
```

> The frontend bundle is located in packages/frontend/build
