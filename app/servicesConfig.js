export const SERVICE_CATEGORIES = [
  {
    slug: "companionship",
    name: "Companionship & Outings",
    tagline: "Walks, coffee dates, errands with a friendly helper.",
    description:
      "Companions for walks, appointments, errands, and relaxed conversation.",
  },
  {
    slug: "classes",
    name: "Classes & Creative Lessons",
    tagline: "Crafting, canning, cooking, coding, and more.",
    description:
      "Teachers and hobbyists offering fun one-on-one or small-group classes.",
  },
  {
    slug: "elder-care",
    name: "Elder Care Support",
    tagline: "Non-medical assistance and companionship for seniors.",
    description:
      "Light support, check-ins, and companionship for seniors.",
  },
  {
    slug: "childcare",
    name: "Childcare & Babysitting",
    tagline: "Trusted sitters and helpers for busy families.",
    description:
      "Babysitters, mother's helpers, and childcare providers.",
  },
  {
    slug: "pet-care",
    name: "Pet Care & Dog Walking",
    tagline: "Walks, feeding, and playtime.",
    description:
      "Dog walkers, pet sitters, and helpers for everyday pet care.",
  },
  {
    slug: "home-help",
    name: "Home Help & Organization",
    tagline: "Cleaning, organizing, and household tasks.",
    description:
      "Helpers for cleaning, organizing, decluttering, and household support.",
  },
];

export function getCategoryBySlug(slug) {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug);
}
