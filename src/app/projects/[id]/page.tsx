type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
        <header className="space-y-3">
          <a href="/" className="text-sm text-zinc-400 hover:text-zinc-200">
            ← Back to dashboard
          </a>
          <h1 className="text-3xl font-semibold tracking-tight">Project Workspace</h1>
          <p className="text-sm text-zinc-400">Project ID: {id}</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.65fr]">
          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Status & checklist</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Placeholder workspace sidebar untuk status project dan checklist progress.
            </p>
          </aside>

          <div className="space-y-6">
            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Headline & script</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Nanti berisi headline options, subheadline options, dan VO script.
              </p>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Visual beats</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Nanti berisi shot plan, source strategy, visual difficulty, dan keywords.
              </p>
            </section>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-lg font-semibold">Image prompt JSON</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Panel fallback untuk generative still/image bila footage video tidak tersedia.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
