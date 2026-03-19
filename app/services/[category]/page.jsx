import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICE_CATEGORIES, getCategoryBySlug } from "../../servicesConfig";

export default async function CategoryPage({ params }) {
  const { category } = await params; // Required in Next.js 16

  const data = getCategoryBySlug(category);

  if (!data) return notFound();

  return (
    <div className="space-y-6">
      <Link href="/" className="text-xs text-slate-400 hover:text-indigo-300">
        ← Back to all services
      </Link>

      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <p className="text-sm text-indigo-200">{data.tagline}</p>
        <p className="text-sm text-slate-300 max-w-2xl">{data.description}</p>
      </header>

      <section className="space-y-3 rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
        <h2 className="text-sm font-semibold text-amber-300">Coming next</h2>
        <p className="text-sm text-amber-100/90">
          Providers for <span className="font-medium">{data.name}</span> will appear here.
        </p>
      </section>
    </div>
  );
}
