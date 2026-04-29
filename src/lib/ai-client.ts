import { generationOutputSchema, type GenerationOutput } from "@/lib/ai-schema";

type GenerateInput = {
  title: string;
  sourceUrl?: string | null;
  extractedTitle?: string | null;
  extractedBody?: string | null;
  rawArticle?: string | null;
  targetFormat?: string | null;
  durationTarget?: string | null;
  tone?: string | null;
  scriptMode?: string | null;
};

function buildPrompt(input: GenerateInput) {
  const article = input.extractedBody || input.rawArticle || "";
  return `You are generating structured output for an internal video editor workflow tool.
Return ONLY valid JSON with this exact top-level shape:
{
  "headlineOptions": string[],
  "subheadlineOptions": string[],
  "voScript": string,
  "optionalCtaOptions": string[],
  "visualPlan": [{
    "beatNumber": number,
    "voLine": string,
    "visualDirection": string,
    "suggestedFootage": string[],
    "searchKeywords": { "youtube": string[], "pexels": string[], "x": string[] },
    "sourceStrategy": string,
    "visualDifficulty": "easy" | "medium" | "hard",
    "priority": "must-have" | "fallback"
  }],
  "imagePromptPlan": [{
    "beatNumber": number,
    "reason": string,
    "prompt": {
      "objective": string,
      "scene_description": string,
      "subject": string,
      "setting": string,
      "camera_angle": string,
      "composition": string,
      "lighting": string,
      "mood": string,
      "visual_style": string,
      "negative_prompt": string[],
      "text_overlay_guidance": string,
      "aspect_ratio": string
    }
  }]
}
Constraints:
- headline options: 2 or 3, each ideally <= 40 chars
- subheadline options: 1 or 2, each ideally <= 70 chars
- output for ${input.targetFormat || "short-form video"}
- duration target: ${input.durationTarget || "60-90 seconds"}
- tone: ${input.tone || "educational"}
- script mode: ${input.scriptMode || "visual-first"}
- make the VO script natural to read aloud
- visualPlan should have 8-15 beats when possible for short-form content
- sourceStrategy values should prefer: internal library, YouTube, Pexels, X, motion graphic, image generation
- include imagePromptPlan only for beats where video footage may be hard to source or where a still/generative visual helps

Project title: ${input.title}
Source URL: ${input.sourceUrl || ""}
Extracted title: ${input.extractedTitle || ""}
Article content:
${article.slice(0, 12000)}
`;
}

function extractJson(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}$/);
  if (match) return match[0];
  throw new Error("Model did not return JSON");
}

export async function generateStructuredOutput(input: GenerateInput): Promise<GenerationOutput> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;
  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";

  if (!apiKey || !model) {
    throw new Error("AI_API_KEY or AI_MODEL is not configured");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a structured content generation engine for a video editor workflow app.",
        },
        {
          role: "user",
          content: buildPrompt(input),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI request failed: ${response.status} ${errText.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("AI response content missing");
  }

  const parsedJson = JSON.parse(extractJson(content));
  return generationOutputSchema.parse(parsedJson);
}
