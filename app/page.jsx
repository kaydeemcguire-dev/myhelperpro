"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [category, setCategory] = useState("Any");
  const [location, setLocation] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category !== "Any") params.set("category", category);
    if (location.trim()) params.set("location", location.trim());
    const qs = params.toString();
    router.push(qs ? `/providers?${qs}` : "/providers");
  }

  const featured = [
    {
      name: "Kaydee Green",
      image: "/images/provider-gardener.jpg",
      service: "Gardening",
      location: "Turlock, CA",
      reviews: 20,
      blurb: "Lawn care, trimming, planting, and seasonal cleanup.",
    },
    {
      name: "Maria Lopez",
      image: "/images/provider-cleaner.jpg",
      service: "House Cleaning",
      location: "Turlock, CA",
      reviews: 18,
      blurb: "Deep cleans, recurring upkeep, and move-out cleaning.",
    },
    {
      name: "Jasmine Reed",
      image: "/images/provider-caregiver.jpg",
      service: "Caregiving",
      location: "Turlock, CA",
      reviews: 25,
      blurb: "Reliable support, routines, and compassionate care.",
    },
  ];

  const testimonials = [
    {
      name: "Local House Cleaner",
      text: "The sign-up process was clear and straightforward. I'm excited to join a woman-owned platform serving our community.",
    },
    {
      name: "Independent Gardener",
      text: "MyHelperPro makes it easy to showcase my services and prepare for launch. The setup felt thoughtful and professional.",
    },
    {
      name: "Care Provider",
      text: "I appreciate the focus on safety and documentation. It feels like a trustworthy place to build connections once messaging opens.",
    },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scroll = 0;
    const speed = 0.18;
    let raf;

    const animate = () => {
      scroll += speed;
      if (scroll >= el.scrollWidth / 2) scroll = 0;
      el.scrollLeft = scroll;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ width: "100%", display: "block" }}>

{/* ================= PREMIUM NAV ================= */}
<div
  style={{
    position: "sticky",
    top: 0,
    zIndex: 200,
    backdropFilter: "blur(12px)",
    background: "rgba(250,246,241,0.96)",
    borderBottom: "1px solid rgba(0,0,0,0.04)",
  }}
>
  <div
    style={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "14px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    {/* LOGO */}
    <Link href="/" style={{ textDecoration: "none" }}>
      <img
        src="/logos/myhelperpro-logo-light-v2.svg"
        alt="MyHelperPro"
        style={{
          height: "74px",
          display: "block",
        }}
      />
    </Link>

    {/* NAV MENU */}
    <div style={{ display: "flex", gap: "40px", position: "relative" }}>

      {/* MENU ITEM WRAPPER */}
      {[
        {
          label: "About",
          links: [
            { name: "Our Mission", href: "/mission" },
            { name: "How It Works", href: "/how-it-works" },
            { name: "Meet the Founder", href: "/founder" },
          ],
        },
        {
          label: "Customers",
          links: [
            { name: "Find a Pro", href: "/providers" },
            { name: "Commonly Asked Questions", href: "/faqs" },
            { name: "Login / Sign Up", href: "/customers/login" },
          ],
        },
        {
          label: "Providers",
          links: [
            { name: "How It Works", href: "providers/how-it-works" },
            { name: "Plans & Pricing", href: "/plans" },
            { name: "Commonly Asked Questions", href: "/faqs" },
            { name: "Login / Sign Up", href: "/providers/login" },
          ],
        },
        {
          label: "Community",
          links: [
            { name: "Local Events", href: "/local-events" },
            { name: "Community Resources", href: "/community-resources" },
          ],
        },
        {
          label: "Contact",
          links: [
            { name: "Contact", href: "/contact" },
            { name: "Newsletter", href: "/newsletter" },
            { name: "Press", href: "/press" },
          ],
        },
      ].map((menu, index) => (
        <div
          key={index}
          style={{ position: "relative" }}
          onMouseEnter={(e) =>
            (e.currentTarget.children[1].style.opacity = "1")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.children[1].style.opacity = "0")
          }
        >
          <div
            style={{
              cursor: "pointer",
              fontWeight: 600,
              color: "#3A302A",
              letterSpacing: "0.3px",
            }}
          >
            {menu.label}
          </div>

          {/* DROPDOWN */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: 0,
              background: "#fff",
              padding: "18px 22px",
              borderRadius: "18px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
              opacity: 0,
              transition: "opacity 0.2s ease",
              minWidth: "220px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              zIndex: 500,
            }}
          >
            {menu.links.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#5C544E",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#2B4A2F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#5C544E")
                }
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>




      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          height: "560px",
          backgroundImage: "url('/images/hero-gardener.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "160px 24px 0",
            color: "#fff",
          }}
        >
          <h1 style={{ fontSize: "50px", fontWeight: 800, marginBottom: "30px" }}>
            Find trusted local helpers for your home needs.
          </h1>

          <form onSubmit={handleSearch}>
            <div
              style={{
                background: "#fff",
                borderRadius: "999px",
                display: "flex",
                gap: "12px",
                padding: "10px",
                maxWidth: "760px",
              }}
            >
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ height: "48px", borderRadius: "999px", padding: "0 16px" }}
              >
                <option value="Any">Category</option>
                <option>House Cleaning</option>
                <option>Gardening</option>
                <option>Handyman</option>
                <option>Moving & Hauling</option>
                <option>Pet Care</option>
                <option>Elderly Care</option>
              </select>

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                style={{ flex: 1, height: "48px", borderRadius: "999px", padding: "0 18px" }}
              />

              <button
                type="submit"
                style={{
                  height: "48px",
                  padding: "0 24px",
                  borderRadius: "999px",
                  background: "#2B4A2F",
                  color: "#fff",
                  fontWeight: 700,
                  border: "none",
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= FEATURED HELPERS ================= */}
      <section style={{ maxWidth: "1120px", margin: "80px auto 0", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: "26px", fontWeight: 900 }}>
          Featured Helpers
        </h2>

        <div
          style={{
            marginTop: "28px",
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {featured.map((p) => (
            <div
              key={p.name}
              style={{
                background: "#fff",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <div style={{ fontWeight: 800 }}>{p.name}</div>
                <div style={{ fontSize: "13px", color: "#6B7280" }}>{p.location}</div>
                <div style={{ marginTop: "6px", fontWeight: 700, color: "#2B4A2F" }}>
                  {p.service}
                </div>
                <div style={{ marginTop: "8px", fontSize: "14px" }}>{p.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BROWSE BY CITY ================= */}
<section
  style={{
    maxWidth: "1120px",
    margin: "60px auto 0",
    padding: "0 24px",
    textAlign: "center",
  }}
>
  <h3
    style={{
      fontSize: "22px",
      fontWeight: 800,
      marginBottom: "20px",
    }}
  >
    Browse Popular Services Near You
  </h3>

  {[
    { city: "turlock", label: "Turlock" },
    { city: "modesto", label: "Modesto" },
  ].map((cityBlock) => (
    <div key={cityBlock.city} style={{ marginBottom: "20px" }}>
      <div
        style={{
          fontWeight: 700,
          marginBottom: "10px",
          color: "#2B4A2F",
        }}
      >
        {cityBlock.label}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {[
          { label: "House Cleaning", slug: "house-cleaning" },
          { label: "Caregiving", slug: "caregiving" },
          { label: "Doula", slug: "doula" },
          { label: "Postpartum Doula", slug: "postpartum-doula" },
          { label: "Lawn Care", slug: "lawn-care" },
          { label: "Contractor", slug: "contractor" },
        ].map((service) => (
          <Link
            key={service.slug}
            href={`/explore/city/${cityBlock.city}/${service.slug}`}
            style={{
              padding: "8px 16px",
              borderRadius: "999px",
              background: "#F1ECE4",
              textDecoration: "none",
              color: "#2B4A2F",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            {service.label}
          </Link>
        ))}
      </div>
    </div>
  ))}
</section>

      {/* ================= PROVIDER TESTIMONIALS ================= */}
      <section style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ textAlign: "center", fontSize: "26px", fontWeight: 900 }}>
            Providers preparing for launch
          </h2>

          <div
            ref={scrollRef}
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "24px",
              overflowX: "hidden",
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                style={{
                  minWidth: "360px",
                  background: "#fff",
                  borderRadius: "28px",
                  padding: "28px",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ fontWeight: 800 }}>{t.name}</div>
                <p style={{ marginTop: "12px", lineHeight: "24px" }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "100px" }} />
    </div>
  );
}
