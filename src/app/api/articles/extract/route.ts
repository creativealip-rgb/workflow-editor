import { NextRequest, NextResponse } from "next/server";
import { extractArticleSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = extractArticleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  return NextResponse.json({
    title: `Extracted article from ${parsed.data.url}`,
    body: "Article extraction placeholder. Next step: implement real parser/readability fetch flow.",
  });
}
