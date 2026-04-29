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
npm run db:push
npm run dev
```

## Required env
- `DATABASE_URL`
- `AI_API_KEY`
- `AI_MODEL`
- `AI_BASE_URL` (optional, defaults to OpenAI-compatible `/v1`)
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
3. run schema push/migration against production DB
4. connect GitHub repo
5. deploy using included Dockerfile

## Current implementation status
- dashboard scaffold ready
- new project page scaffold ready
- project workspace scaffold ready
- health route ready
- projects API now targets Postgres via Drizzle repository layer
- article extraction route now uses Readability + JSDOM for real URL parsing
- generate route now supports real AI structured generation through an OpenAI-compatible chat completions API
- output is validated with Zod before saving
