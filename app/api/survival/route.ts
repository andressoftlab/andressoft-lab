import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

async function ensureTable() {
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS survival_times (
    id BIGSERIAL PRIMARY KEY,
    milliseconds INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}

async function topThree() {
  const sql = getSql();
  return sql`SELECT milliseconds, created_at AS "createdAt"
    FROM survival_times
    ORDER BY milliseconds DESC, id ASC
    LIMIT 3`;
}

export async function GET() {
  try {
    await ensureTable();
    return Response.json({ times: await topThree() });
  } catch {
    return Response.json({ times: [] });
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable();
    const payload = (await request.json()) as { milliseconds?: unknown };
    const milliseconds = Math.round(Number(payload.milliseconds));

    if (!Number.isFinite(milliseconds) || milliseconds < 500 || milliseconds > 86_400_000) {
      return Response.json({ error: "Invalid survival time" }, { status: 400 });
    }

    const sql = getSql();
    await sql`INSERT INTO survival_times (milliseconds) VALUES (${milliseconds})`;
    await sql`DELETE FROM survival_times
      WHERE id NOT IN (
        SELECT id FROM survival_times ORDER BY milliseconds DESC, id ASC LIMIT 3
      )`;

    return Response.json({ times: await topThree() }, { status: 201 });
  } catch {
    return Response.json({ times: [] }, { status: 201 });
  }
}
