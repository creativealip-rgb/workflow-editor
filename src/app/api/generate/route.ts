import { NextRequest, NextResponse } from "next/server";
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

  const headlineOptions = [
    "Biaya Mobil Listrik Gak Sesimpel Itu",
    "Beli EV Jangan Cuma Lihat Harga",
  ];
  const subheadlineOptions = [
    "Ada biaya ownership yang sering bikin orang kaget setelah beli.",
  ];
  const voScript =
    "Placeholder VO script. Next step: wire real model output with structured JSON.";
  const visualPlan = [
    {
      beatNumber: 1,
      voLine: "Hook placeholder",
      visualDirection: "EV driving close-up in city at night",
      suggestedFootage: ["EV exterior rolling shot"],
      searchKeywords: {
        youtube: ["electric car city driving pov"],
        pexels: ["electric car night drive"],
        x: ["EV driving clip"],
      },
      sourceStrategy: "YouTube",
      visualDifficulty: "easy",
      priority: "must-have",
    },
  ];
  const imagePromptPlan = [
    {
      beatNumber: 2,
      reason: "Fallback when invoice footage is unavailable",
      prompt: {
        objective: "Support ownership-cost segment",
        scene_description: "Close-up of a modern vehicle repair invoice on a desk",
        subject: "vehicle repair invoice",
        setting: "clean office desk",
        camera_angle: "top-down slight angle",
        composition: "invoice in focus, calculator near edge",
        lighting: "soft neutral indoor light",
        mood: "serious, informative",
        visual_style: "commercial realistic",
        negative_prompt: ["blurry text", "extra fingers", "cartoon style"],
        text_overlay_guidance: "leave negative space at top for caption",
        aspect_ratio: "9:16",
      },
    },
  ];

  const markdownExport = buildProjectMarkdown({
    title: String(project.title || "Untitled Project"),
    headlineOptions,
    subheadlineOptions,
    voScript,
  });

  const updated = {
    ...project,
    headlineOptionsJson: headlineOptions,
    subheadlineOptionsJson: subheadlineOptions,
    voScript,
    visualPlanJson: visualPlan,
    imagePromptPlanJson: imagePromptPlan,
    markdownExport,
    status: "generated",
    updatedAt: new Date().toISOString(),
  };

  saveMockProject(updated as Record<string, unknown> & { id: string });

  return NextResponse.json({
    item: updated,
  });
}
