import { NextRequest, NextResponse } from "next/server";
import { extractArticleFromUrl } from "@/lib/article-extractor";
import { extractArticleSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = extractArticleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const article = await extractArticleFromUrl(parsed.data.url);
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown extraction error",
      },
      { status: 422 }
    );
  }
}
