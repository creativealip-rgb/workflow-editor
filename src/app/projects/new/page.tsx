"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ExtractedArticle = {
  title: string;
  excerpt?: string;
  body: string;
  byline?: string;
  siteName?: string;
  length?: number;
};

export default function NewProjectPage() {
  const router = useRouter();
  const [articleUrl, setArticleUrl] = useState("");
  const [rawArticle, setRawArticle] = useState("");
  const [targetFormat, setTargetFormat] = useState("Reels");
  const [durationTarget, setDurationTarget] = useState("60 detik");
  const [tone, setTone] = useState("Edukasi");
  const [scriptMode, setScriptMode] = useState("Visual-first");
  const [title, setTitle] = useState("");
  const [extracted, setExtracted] = useState<ExtractedArticle | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  async function handleExtract() {
    if (!articleUrl.trim()) {
      setStatus("Isi URL artikel dulu.");
      return;
    }

    setLoadingExtract(true);
    setStatus("Extracting article...");

    try {
      const res = await fetch("/api/articles/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: articleUrl }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Gagal extract artikel");
      }

      setExtracted(data);
      if (!title.trim()) setTitle(data.title || "Untitled Project");
      setRawArticle(data.body || "");
      setStatus("Article extracted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unknown extraction error");
    } finally {
      setLoadingExtract(false);
    }
  }

  async function handleSaveAndGenerate() {
    if (!title.trim()) {
      setStatus("Judul project wajib diisi.");
      return;
    }
    if (!rawArticle.trim()) {
      setStatus("Isi artikel atau extract dulu sebelum generate.");
      return;
    }

    setLoadingGenerate(true);
    setStatus("Creating project...");

    try {
      const createRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          sourceType: articleUrl.trim() ? "url" : "manual",
          sourceUrl: articleUrl,
          rawArticle,
          targetFormat,
          durationTarget,
          tone,
          scriptMode,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData?.error?.formErrors?.[0] || createData?.error || "Gagal create project");
      }

      const projectId = createData.item.id;

      if (extracted) {
        await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            extractedTitle: extracted.title,
            extractedBody: extracted.body,
            status: "extracted",
          }),
        });
      }

      setStatus("Generating structured output...");

      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const genData = await genRes.json();
      if (!genRes.ok) {
        throw new Error(genData?.error || "Gagal generate output");
      }

      setStatus("Done. Redirecting...");
      router.push(`/projects/${projectId}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unknown generate error");
    } finally {
      setLoadingGenerate(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8 lg:px-10">
        <header className="space-y-3">
          <a href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
            ← Back to dashboard
          </a>
          <h1 className="text-3xl font-semibold tracking-tight">New Project</h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400">
            Input artikel via URL atau paste manual, lalu pilih target format,
            durasi, tone, dan script mode.
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Project title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Misal: EV Battery Article #01"
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Article URL</label>
              <input
                value={articleUrl}
                onChange={(e) => setArticleUrl(e.target.value)}
                type="url"
                placeholder="https://example.com/article"
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Raw article</label>
              <textarea
                value={rawArticle}
                onChange={(e) => setRawArticle(e.target.value)}
                placeholder="Paste isi artikel di sini..."
                className="min-h-64 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Target format</label>
                <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Reels</option>
                  <option>TikTok</option>
                  <option>YouTube Shorts</option>
                  <option>Short explainer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Duration</label>
                <select value={durationTarget} onChange={(e) => setDurationTarget(e.target.value)} className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>60 detik</option>
                  <option>90 detik</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Edukasi</option>
                  <option>News</option>
                  <option>Persuasive</option>
                  <option>Casual</option>
                  <option>Dramatic hook</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Script mode</label>
                <select value={scriptMode} onChange={(e) => setScriptMode(e.target.value)} className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Balanced</option>
                  <option>Visual-first</option>
                  <option>Authority/news-first</option>
                  <option>Hook-heavy</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/70 p-4 text-sm text-zinc-400">
              {status || "Isi artikel lalu extract atau langsung generate dari raw article."}
            </div>

            {extracted ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-300">
                <div className="font-semibold text-zinc-100">Extraction preview</div>
                <div className="mt-2 text-zinc-400">{extracted.title}</div>
                <div className="mt-2 line-clamp-6 whitespace-pre-wrap text-xs leading-6 text-zinc-500">
                  {extracted.body.slice(0, 800)}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExtract}
                disabled={loadingExtract || loadingGenerate}
                className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingExtract ? "Extracting..." : "Extract Article"}
              </button>
              <button
                onClick={handleSaveAndGenerate}
                disabled={loadingGenerate || loadingExtract}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingGenerate ? "Generating..." : "Save & Generate"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
