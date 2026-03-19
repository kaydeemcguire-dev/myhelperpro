"use client";

import Link from "next/link";

const CATEGORIES = [
  "After-School Pickup",
  "Babysitting",
  "Deep Cleaning",
  "Dishes / Kitchen Reset",
  "Dog Walking",
  "Elder Care",
  "Errands",
  "Event Help",
  "Family & Care",
  "Furniture Assembly",
  "Garden Help",
  "Grocery Pickup / Delivery",
  "Handyman (Small Repairs)",
  "Hauling (Small Loads)",
  "Home",
  "Home Reset (Quick Tidy)",
  "House Cleaning",
  "Junk Removal (Small Loads)",
  "Laundry Help",
  "Leaf Cleanup",
  "Light Household Help",
  "Meal Prep for Families",
  "Mother’s Helper",
  "Mounting / Hanging",
  "Move-In / Move-Out Cleaning",
  "Nanny",
  "Newborn Care",
  "Office Help (Light Admin)",
  "One-Time Help",
  "Organization",
  "Other",
  "Outdoor",
  "Packing / Unpacking Help",
  "Painting (Small Jobs)",
  "Pet Sitting",
  "Planting",
  "Postpartum Support",
  "Prescription Pickup",
  "Pressure Washing (Small Areas)",
  "Respite Care",
  "Seasonal Cleanup",
  "Senior Companionship",
  "Setup / Breakdown Help",
  "Special Needs Support",
  "Specialty",
  "Tech Help (Basic)",
  "Tutoring",
  "Waiting In Line / Drop-Offs",
  "Weeding",
  "Yard Work",
];

export default function CategoryIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:underline">
            MyHelperPro
          </Link>

          <Link href="/providers" className="text-sm hover:underline">
            Browse all providers →
          </Link>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">
            Browse Services
          </h1>
          <p className="opacity-70 max-w-xl">
            Choose a service to see available helpers in your area.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((name) => (
            <Link
              key={name}
              href={`/category/${encodeURIComponent(name)}`}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition text-sm"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
