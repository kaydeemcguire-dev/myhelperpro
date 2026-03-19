export default function sitemap() {
  const baseUrl = "https://myhelperpro.com"

  const cities = [
    "turlock",
    "modesto",
    "ceres",
    "manteca",
    "oakdale",
  ]

  const services = [
    "house-cleaning",
    "lawn-care",
    "maintenance-repair",
    "contractor",
    "caregiving",
    "babysitter",
    "mothers-helper",
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

  const staticPages = [
    "",
    "/providers",
    "/mission",
    "/how-it-works",
    "/plans",
    "/faqs",
    "/contact",
    "/community-resources",
  ]

  const urls = []

  // Static pages
  staticPages.forEach((path) => {
    urls.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })
  })

  // Explore pages
  cities.forEach((city) => {
    services.forEach((service) => {
      urls.push({
        url: `${baseUrl}/explore/city/${city}/${service}`,
        lastModified: new Date(),
      })
    })
  })

  return urls
}