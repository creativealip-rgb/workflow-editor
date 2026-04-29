import { NextRequest, NextResponse } from "next/server";
import { generateStructuredOutput } from "@/lib/ai-client";
import { getMockProject, saveMockProject } from "@/lib/mock-store";
import { buildProjectMarkdown } from "@/lib/markdown";
import { generateSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = generateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = getMockProject(parsed.data.projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const output = await generateStructuredOutput({
      title: String(project.title || "Untitled Project"),
      sourceUrl: (project.sourceUrl as string | null | undefined) || null,
      extractedTitle: (project.extractedTitle as string | null | undefined) || null,
      extractedBody: (project.extractedBody as string | null | undefined) || null,
      rawArticle: (project.rawArticle as string | null | undefined) || null,
      targetFormat: (project.targetFormat as string | null | undefined) || null,
      durationTarget: (project.durationTarget as string | null | undefined) || null,
      tone: (project.tone as string | null | undefined) || null,
      scriptMode: (project.scriptMode as string | null | undefined) || null,
    });

    const markdownExport = buildProjectMarkdown({
      title: String(project.title || "Untitled Project"),
      headlineOptions: output.headlineOptions,
      subheadlineOptions: output.subheadlineOptions,
      voScript: output.voScript,
    });

    const updated = {
      ...project,
      headlineOptionsJson: output.headlineOptions,
      subheadlineOptionsJson: output.subheadlineOptions,
      voScript: output.voScript,
      visualPlanJson: output.visualPlan,
      imagePromptPlanJson: output.imagePromptPlan,
      markdownExport,
      status: "generated",
      updatedAt: new Date().toISOString(),
    };

    saveMockProject(updated as Record<string, unknown> & { id: string });

    return NextResponse.json({ item: updated });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown generation error",
      },
      { status: 422 }
    );
  }
}
