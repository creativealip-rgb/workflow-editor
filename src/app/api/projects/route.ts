import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { demoChecklist } from "@/lib/demo-data";
import { listMockProjects, saveMockProject } from "@/lib/mock-store";
import { createProjectSchema } from "@/lib/schemas";

export async function GET() {
  return NextResponse.json({ items: listMockProjects() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createProjectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const now = new Date().toISOString();
  const item = {
    id: randomUUID(),
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
    createdAt: now,
    updatedAt: now,
  };

  saveMockProject(item);
  return NextResponse.json({ item }, { status: 201 });
}
