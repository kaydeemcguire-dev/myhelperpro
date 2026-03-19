import Image from "next/image";

const providers = [
  {
    name: "Kaydee Green",
    service: "Gardening",
    location: "Turlock, CA",
    rating: 4.9,
    image: "/images/provider-gardener.jpg",
  },
  {
    name: "Maria Lopez",
    service: "House Cleaning",
    location: "Modesto, CA",
    rating: 5.0,
    image: "/images/provider-cleaner.jpg",
  },
  {
    name: "Angela Brooks",
    service: "Caregiver",
    location: "Central Valley, CA",
    rating: 4.8,
    image: "/images/provider-caregiver.jpg",
  },
];

export default function FeaturedProviders() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Featured Helpers</h2>

      <div style={styles.grid}>
        {providers.map((provider, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.imageWrapper}>
              <Image
                src={provider.image}
                alt={provider.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={styles.cardBody}>
              <h3 style={styles.name}>{provider.name}</h3>
              <p style={styles.service}>{provider.service}</p>
              <p style={styles.meta}>
                ⭐ {provider.rating} · {provider.location}
              </p>

              <button style={styles.button}>View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "4rem 2rem",
    backgroundColor: "#faf7f2",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#2f2f2f",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "220px",
  },
  cardBody: {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  name: {
    fontSize: "1.1rem",
    fontWeight: "600",
    margin: 0,
  },
  service: {
    fontSize: "0.95rem",
    color: "#4b6b4b",
    fontWeight: "500",
  },
  meta: {
    fontSize: "0.85rem",
    color: "#666",
  },
  button: {
    marginTop: "0.75rem",
    padding: "0.6rem 1rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#355f3b",
    color: "#ffffff",
    fontSize: "0.9rem",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
};
