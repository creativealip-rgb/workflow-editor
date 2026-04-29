import { z } from "zod";

export const projectStatusSchema = z.enum([
  "draft",
  "extracted",
  "generated",
  "vo_ready",
  "footage_sourcing",
  "editing",
  "done",
]);

export const sourceTypeSchema = z.enum(["url", "manual"]);

export const createProjectSchema = z.object({
  title: z.string().min(1),
  sourceType: sourceTypeSchema,
  sourceUrl: z.string().url().optional().or(z.literal("")),
  rawArticle: z.string().optional(),
  targetFormat: z.string().min(1),
  durationTarget: z.string().min(1),
  tone: z.string().min(1),
  scriptMode: z.string().min(1),
});

export const updateProjectSchema = z.object({
  title: z.string().min(1).optional(),
  extractedTitle: z.string().optional(),
  extractedBody: z.string().optional(),
  voScript: z.string().optional(),
  markdownExport: z.string().optional(),
  status: projectStatusSchema.optional(),
  checklistJson: z.unknown().optional(),
  headlineOptionsJson: z.unknown().optional(),
  subheadlineOptionsJson: z.unknown().optional(),
  visualPlanJson: z.unknown().optional(),
  imagePromptPlanJson: z.unknown().optional(),
});

export const extractArticleSchema = z.object({
  url: z.string().url(),
});

export const generateSchema = z.object({
  projectId: z.string().min(1),
});
