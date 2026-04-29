const projectStatuses = [
  "draft",
  "extracted",
  "generated",
  "vo_ready",
  "footage_sourcing",
  "editing",
  "done",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl shadow-black/20">
          <div className="inline-flex w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
            INTERNAL TOOL · MVP BASE
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Workflow Editor
            </h1>
            <p className="text-base leading-7 text-zinc-300 sm:text-lg">
              Workspace internal untuk ubah artikel jadi script video, visual beats,
              strategi sourcing footage, dan fallback image prompts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/projects/new"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
            >
              New Project
            </a>
            <a
              href="/api/health"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              Health Check
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Project workflow</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Alur kerja utama yang akan di-support aplikasi ini.
                </p>
              </div>
            </div>
            <ol className="grid gap-4 text-sm text-zinc-300 sm:grid-cols-2 xl:grid-cols-3">
              {[
                "Input artikel via URL atau paste manual",
                "Extract dan review isi artikel",
                "Generate headline, subheadline, dan VO script",
                "Bangun visual beats + source strategy per beat",
                "Generate fallback JSON image prompt jika footage video kurang",
                "Export hasil untuk editor workflow",
              ].map((item, index) => (
                <li
                  key={item}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
                >
                  <div className="mb-2 text-xs font-semibold tracking-wide text-emerald-300">
                    STEP {index + 1}
                  </div>
                  <p className="leading-6">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Project statuses</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Status workflow yang dipakai di MVP.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {projectStatuses.map((status) => (
                <span
                  key={status}
                  className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-300"
                >
                  {status}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm text-zinc-300">
              <h3 className="font-semibold text-zinc-100">Next build targets</h3>
              <ul className="mt-3 space-y-2 leading-6 text-zinc-400">
                <li>• Form project baru + extraction preview</li>
                <li>• Drizzle CRUD projects</li>
                <li>• AI generation structured output</li>
                <li>• Visual beats + image prompt fallback panel</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
