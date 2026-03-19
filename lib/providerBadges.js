export function computeProviderBadges(documents = []) {
  const badges = {
    insurance: { label: "Insurance", status: "missing" },
    license: { label: "Professional License", status: "missing" },
    background: { label: "Background Check", status: "missing" },
    cpr: { label: "CPR / First Aid", status: "missing" },
  };

  documents.forEach((doc) => {
    const type = doc.document_type?.toLowerCase();

    if (!type) return;

    if (type.includes("insurance")) {
      badges.insurance.status = doc.status || "pending";
    }

    if (type.includes("license")) {
      badges.license.status = doc.status || "pending";
    }

    if (type.includes("background")) {
      badges.background.status = doc.status || "pending";
    }

    if (type.includes("cpr") || type.includes("first")) {
      badges.cpr.status = doc.status || "pending";
    }
  });

  return badges;
}
