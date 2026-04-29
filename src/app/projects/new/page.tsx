export default function NewProjectPage() {
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
              <label className="text-sm font-medium text-zinc-200">Article URL</label>
              <input
                type="url"
                placeholder="https://example.com/article"
                className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-200">Raw article</label>
              <textarea
                placeholder="Paste isi artikel di sini..."
                className="min-h-64 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Target format</label>
                <select className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Reels</option>
                  <option>TikTok</option>
                  <option>YouTube Shorts</option>
                  <option>Short explainer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Duration</label>
                <select className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>60 detik</option>
                  <option>90 detik</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Tone</label>
                <select className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Edukasi</option>
                  <option>News</option>
                  <option>Persuasive</option>
                  <option>Casual</option>
                  <option>Dramatic hook</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-200">Script mode</label>
                <select className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>Balanced</option>
                  <option>Visual-first</option>
                  <option>Authority/news-first</option>
                  <option>Hook-heavy</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/70 p-4 text-sm text-zinc-400">
              Form ini masih scaffold UI. Next step: hubungkan ke API extract dan create project.
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800">
                Extract Article
              </button>
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400">
                Save & Generate
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
