import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

type CreateProjectInput = {
  title: string;
  sourceType: string;
  sourceUrl?: string | null;
  rawArticle?: string | null;
  targetFormat: string;
  durationTarget: string;
  tone: string;
  scriptMode: string;
  status?: string;
  checklistJson?: unknown;
};

type UpdateProjectInput = Partial<{
  title: string;
  extractedTitle: string | null;
  extractedBody: string | null;
  voScript: string | null;
  markdownExport: string | null;
  status: string;
  checklistJson: unknown;
  headlineOptionsJson: unknown;
  subheadlineOptionsJson: unknown;
  visualPlanJson: unknown;
  imagePromptPlanJson: unknown;
}>;

export async function listProjects() {
  return db.select().from(projects).orderBy(sql`${projects.updatedAt} desc`);
}

export async function getProjectById(id: string) {
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createProject(input: CreateProjectInput) {
  const rows = await db
    .insert(projects)
    .values({
      title: input.title,
      sourceType: input.sourceType,
      sourceUrl: input.sourceUrl ?? null,
      rawArticle: input.rawArticle ?? "",
      targetFormat: input.targetFormat,
      durationTarget: input.durationTarget,
      tone: input.tone,
      scriptMode: input.scriptMode,
      status: input.status ?? "draft",
      checklistJson: input.checklistJson ?? null,
    })
    .returning();

  return rows[0];
}

export async function updateProject(id: string, input: UpdateProjectInput) {
  const rows = await db
    .update(projects)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();

  return rows[0] ?? null;
}
