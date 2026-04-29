import { z } from "zod";

export const visualBeatSchema = z.object({
  beatNumber: z.number(),
  voLine: z.string(),
  visualDirection: z.string(),
  suggestedFootage: z.array(z.string()),
  searchKeywords: z.object({
    youtube: z.array(z.string()).default([]),
    pexels: z.array(z.string()).default([]),
    x: z.array(z.string()).default([]),
  }),
  sourceStrategy: z.string(),
  visualDifficulty: z.enum(["easy", "medium", "hard"]),
  priority: z.enum(["must-have", "fallback"]),
});

export const imagePromptItemSchema = z.object({
  beatNumber: z.number(),
  reason: z.string(),
  prompt: z.object({
    objective: z.string(),
    scene_description: z.string(),
    subject: z.string(),
    setting: z.string(),
    camera_angle: z.string(),
    composition: z.string(),
    lighting: z.string(),
    mood: z.string(),
    visual_style: z.string(),
    negative_prompt: z.array(z.string()),
    text_overlay_guidance: z.string(),
    aspect_ratio: z.string(),
  }),
});

export const generationOutputSchema = z.object({
  headlineOptions: z.array(z.string()).min(1).max(3),
  subheadlineOptions: z.array(z.string()).min(1).max(2),
  voScript: z.string().min(1),
  optionalCtaOptions: z.array(z.string()).default([]),
  visualPlan: z.array(visualBeatSchema).min(1),
  imagePromptPlan: z.array(imagePromptItemSchema).default([]),
});

export type GenerationOutput = z.infer<typeof generationOutputSchema>;
