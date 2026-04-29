import { NextRequest, NextResponse } from "next/server";
import { getProjectById, updateProject } from "@/db/repositories/projects";
import { generateStructuredOutput } from "@/lib/ai-client";
import { buildProjectMarkdown } from "@/lib/markdown";
import { generateSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = generateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = await getProjectById(parsed.data.projectId);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  try {
    const output = await generateStructuredOutput({
      title: String(project.title || "Untitled Project"),
      sourceUrl: project.sourceUrl || null,
      extractedTitle: project.extractedTitle || null,
      extractedBody: project.extractedBody || null,
      rawArticle: project.rawArticle || null,
      targetFormat: project.targetFormat || null,
      durationTarget: project.durationTarget || null,
      tone: project.tone || null,
      scriptMode: project.scriptMode || null,
    });

    const markdownExport = buildProjectMarkdown({
      title: String(project.title || "Untitled Project"),
      headlineOptions: output.headlineOptions,
      subheadlineOptions: output.subheadlineOptions,
      voScript: output.voScript,
    });

    const updated = await updateProject(project.id, {
      headlineOptionsJson: output.headlineOptions,
      subheadlineOptionsJson: output.subheadlineOptions,
      voScript: output.voScript,
      visualPlanJson: output.visualPlan,
      imagePromptPlanJson: output.imagePromptPlan,
      markdownExport,
      status: "generated",
    });

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
