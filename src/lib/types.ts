export type ProjectStatus =
  | "draft"
  | "extracted"
  | "generated"
  | "vo_ready"
  | "footage_sourcing"
  | "editing"
  | "done";

export type VisualDifficulty = "easy" | "medium" | "hard";
export type PriorityLevel = "must-have" | "fallback";
export type SourceStrategy =
  | "internal library"
  | "YouTube"
  | "Pexels"
  | "X"
  | "motion graphic"
  | "image generation";
