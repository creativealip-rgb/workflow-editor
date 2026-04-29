import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

type ProjectRecord = {
  id: string;
  title?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  headlineOptionsJson?: string[];
  subheadlineOptionsJson?: string[];
  voScript?: string;
  visualPlanJson?: Array<{
    beatNumber: number;
    voLine: string;
    visualDirection: string;
    suggestedFootage: string[];
    searchKeywords?: { youtube?: string[]; pexels?: string[]; x?: string[] };
    sourceStrategy?: string;
    visualDifficulty?: string;
    priority?: string;
  }>;
  imagePromptPlanJson?: Array<{
    beatNumber: number;
    reason: string;
    prompt: Record<string, unknown>;
  }>;
  checklistJson?: Array<{ key: string; label: string; done: boolean }>;
};

async function getProject(id: string): Promise<ProjectRecord | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/projects/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load project");
  const data = await res.json();
  return data.item;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const headlineOptions = Array.isArray(project.headlineOptionsJson)
    ? project.headlineOptionsJson
    : [];
  const subheadlineOptions = Array.isArray(project.subheadlineOptionsJson)
    ? project.subheadlineOptionsJson
    : [];
  const visualPlan = Array.isArray(project.visualPlanJson) ? project.visualPlanJson : [];
  const imagePromptPlan = Array.isArray(project.imagePromptPlanJson)
    ? project.imagePromptPlanJson
    : [];
  const checklist = Array.isArray(project.checklistJson) ? project.checklistJson : [];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <header className="space-y-3">
          <a href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
            ← Back to dashboard
          </a>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title || "Project Workspace"}
          </h1>
          <p className="text-sm text-zinc-400">
            Status: {project.status || "draft"} · Updated: {project.updatedAt || "-"}
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.65fr]">
          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Status & checklist</h2>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              {checklist.length ? (
                checklist.map((item) => (
                  <div key={item.key} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3">
                    <div className="font-medium text-zinc-100">{item.label}</div>
                    <div className="mt-1 text-xs text-zinc-500">
                      {item.done ? "Done" : "Pending"}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400">Belum ada checklist.</p>
              )}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Headline & script</h2>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <div className="text-sm font-semibold text-zinc-100">Headline options</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {headlineOptions.length ? headlineOptions.map((item, idx) => <li key={idx}>• {item}</li>) : <li className="text-zinc-500">Belum ada.</li>}
                  </ul>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <div className="text-sm font-semibold text-zinc-100">Subheadline options</div>
                  <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                    {subheadlineOptions.length ? subheadlineOptions.map((item, idx) => <li key={idx}>• {item}</li>) : <li className="text-zinc-500">Belum ada.</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="text-sm font-semibold text-zinc-100">VO Script</div>
                <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                  {project.voScript || "Belum ada VO script."}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Visual beats</h2>
              <div className="mt-5 space-y-4">
                {visualPlan.length ? (
                  visualPlan.map((beat) => (
                    <div key={beat.beatNumber} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                        <span className="rounded-full border border-zinc-700 px-2 py-1">Beat {beat.beatNumber}</span>
                        <span className="rounded-full border border-zinc-700 px-2 py-1">{beat.sourceStrategy || "-"}</span>
                        <span className="rounded-full border border-zinc-700 px-2 py-1">{beat.visualDifficulty || "-"}</span>
                        <span className="rounded-full border border-zinc-700 px-2 py-1">{beat.priority || "-"}</span>
                      </div>
                      <div className="mt-3 text-sm text-zinc-200"><strong>VO:</strong> {beat.voLine}</div>
                      <div className="mt-2 text-sm text-zinc-300"><strong>Visual:</strong> {beat.visualDirection}</div>
                      <div className="mt-2 text-sm text-zinc-300"><strong>Suggested footage:</strong> {beat.suggestedFootage?.join(", ") || "-"}</div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-zinc-400">
                        <div><strong className="text-zinc-300">YouTube</strong><br />{beat.searchKeywords?.youtube?.join(", ") || "-"}</div>
                        <div><strong className="text-zinc-300">Pexels</strong><br />{beat.searchKeywords?.pexels?.join(", ") || "-"}</div>
                        <div><strong className="text-zinc-300">X</strong><br />{beat.searchKeywords?.x?.join(", ") || "-"}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-400">Belum ada visual beats.</p>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Image prompt JSON</h2>
              <div className="mt-5 space-y-4">
                {imagePromptPlan.length ? (
                  imagePromptPlan.map((item) => (
                    <div key={item.beatNumber} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
                      <div className="text-sm font-semibold text-zinc-100">Beat {item.beatNumber}</div>
                      <div className="mt-2 text-sm text-zinc-400">{item.reason}</div>
                      <pre className="mt-3 overflow-x-auto rounded-xl border border-zinc-800 bg-black/30 p-3 text-xs leading-6 text-zinc-300">
                        {JSON.stringify(item.prompt, null, 2)}
                      </pre>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-zinc-400">Belum ada image prompt fallback.</p>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
