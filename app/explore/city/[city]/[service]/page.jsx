import supabase from "@/lib/supabase"
import Link from "next/link"

export const dynamicParams = true

function formatSlug(slug) {
  if (!slug) return ""
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/* ---------------------------
   SEO Metadata
---------------------------- */
export async function generateMetadata(props) {
  const { city, service } = await props.params

  const formattedCity = formatSlug(city)
  const formattedService = formatSlug(service)

  return {
    title: `${formattedService} in ${formattedCity} | MyHelperPro`,
    description: `Find trusted ${formattedService} professionals in ${formattedCity}. Verified local providers. Community-first.`,
  }
}

/* ---------------------------
   Static Generation
---------------------------- */
export async function generateStaticParams() {
  const cities = [
    "turlock",
    "modesto",
    "ceres",
    "manteca",
    "oakdale",
  ]

  const services = [
    // Core Services
    "house-cleaning",
    "caregiving",
    "contractor",
    "maintenance-repair",
    "lawn-care",
    "babysitter",
    "mothers-helper",

    // Underserved High-Intent Services
    "doula",
    "midwife",
    "postpartum-doula",
    "lactation-consultant",
    "night-nurse",
    "newborn-care-specialist",
    "birth-photographer",
    "childbirth-educator",
    "sleep-consultant",
  ]

  const params = []

  for (const city of cities) {
    for (const service of services) {
      params.push({ city, service })
    }
  }

  return params
}

/* ---------------------------
   Page Component
---------------------------- */
export default async function CityServicePage(props) {
  const { city, service } = await props.params

  const dbCity = city.replace(/-/g, " ")
  const dbService = service.replace(/-/g, " ")

  const { data: providers, error } = await supabase
    .from("providers")
    .select("*")
    .ilike("city", dbCity)
    .contains("categories", [dbService])

  if (error) {
    console.error("SEO Page Query Error:", error)
  }

  const formattedCity = formatSlug(city)
  const formattedService = formatSlug(service)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-6">
        {formattedService} in {formattedCity}
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        Browse trusted {formattedService.toLowerCase()} providers in {formattedCity}.
      </p>

      {!providers || providers.length === 0 ? (
        <div className="text-gray-500">
          No providers currently listed in this area.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.auth_id}`}
              className="border rounded-2xl p-6 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {provider.business_name || provider.full_name}
              </h2>

              <p className="text-gray-600 mb-2">
                {provider.city}
              </p>

              <p className="text-sm text-gray-500">
                View Profile →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}