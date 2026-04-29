# Workflow Editor

Internal web app untuk workflow editor: artikel → headline → subheadline → VO script → visual beats → footage sourcing strategy → fallback image prompt JSON.

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Postgres

## Local development
```bash
npm install
cp .env.example .env
npm run dev
```

## Required env
- `DATABASE_URL`
- `AI_API_KEY`
- `AI_MODEL`
- `NEXT_PUBLIC_APP_URL`

## Planned routes
- `/`
- `/projects/new`
- `/projects/[id]`
- `/api/health`
- `/api/articles/extract`
- `/api/projects`
- `/api/generate`

## Deployment
Target deployment: Dokploy via GitHub.

Recommended next steps:
1. create Postgres service in Dokploy
2. set environment variables
3. connect GitHub repo
4. deploy using included Dockerfile

## Current implementation status
- dashboard scaffold ready
- new project page scaffold ready
- project workspace scaffold ready
- health route ready
- mock projects API ready
- article extraction route now uses Readability + JSDOM for real URL parsing
- generate route is still structured placeholder and should be connected to a real AI provider next
