import { NextRequest, NextResponse } from "next/server";
import { createProject, listProjects } from "@/db/repositories/projects";
import { demoChecklist } from "@/lib/demo-data";
import { createProjectSchema } from "@/lib/schemas";

export async function GET() {
  const items = await listProjects();
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const item = await createProject({
    title: parsed.data.title,
    sourceType: parsed.data.sourceType,
    sourceUrl: parsed.data.sourceUrl || null,
    rawArticle: parsed.data.rawArticle || "",
    targetFormat: parsed.data.targetFormat,
    durationTarget: parsed.data.durationTarget,
    tone: parsed.data.tone,
    scriptMode: parsed.data.scriptMode,
    status: "draft",
    checklistJson: demoChecklist,
  });

  return NextResponse.json({ item }, { status: 201 });
}
