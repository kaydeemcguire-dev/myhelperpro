import Link from "next/link";
import { SERVICE_CATEGORIES } from "../servicesConfig";

export default function ServicesIndexPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Service Categories
        </h1>
        <p className="text-sm opacity-80 max-w-xl">
          Explore the types of services available on MyHelperPro.
          Providers will appear within each category after beta.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICE_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/services/${cat.slug}`}
            className="block rounded-lg border border-slate-800 bg-slate-900/40 p-4 hover:border-indigo-400 hover:bg-slate-900 transition"
          >
            <div className="text-sm font-medium mb-1">
              {cat.name}
            </div>
            <div className="text-xs text-indigo-200 mb-2">
              {cat.tagline}
            </div>
            <p className="text-xs text-slate-400">
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
