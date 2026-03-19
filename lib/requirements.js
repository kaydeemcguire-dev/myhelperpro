// app/lib/requirements.js

export const PROVIDER_REQUIREMENTS = {
  "house_cleaning": {
    friendlyName: "House Cleaning",
    requiredDocuments: [
      { key: "id_verification", label: "Government ID" },
      { key: "background_check", label: "Background Check (Optional but Recommended)" }
    ],
    recommendedDocuments: [
      { key: "liability_insurance", label: "General Liability Insurance" },
      { key: "business_license", label: "Business License (if operating independently)" }
    ]
  },

  "nanny": {
    friendlyName: "Nanny / Childcare",
    requiredDocuments: [
      { key: "id_verification", label: "Government ID" },
      { key: "cpr_first_aid", label: "CPR + First Aid Certification" },
      { key: "background_check", label: "Criminal Background Check" }
    ],
    recommendedDocuments: [
      { key: "early_childhood_cert", label: "Childcare or ECE Training Certificate" },
      { key: "liability_insurance", label: "Childcare Liability Insurance" }
    ]
  },

  "elder_care": {
    friendlyName: "Elder Care",
    requiredDocuments: [
      { key: "id_verification", label: "Government ID" },
      { key: "background_check", label: "Background Check" },
      { key: "cpr_first_aid", label: "CPR + First Aid Certification" }
    ],
    recommendedDocuments: [
      { key: "hha_cna_license", label: "HHA or CNA Certification" },
      { key: "liability_insurance", label: "Professional Liability Insurance" }
    ]
  },

  "handyman": {
    friendlyName: "Handyman",
    requiredDocuments: [
      { key: "id_verification", label: "Government ID" }
    ],
    recommendedDocuments: [
      { key: "general_contractor_license", label: "Contractor License (Required if job > $500)" },
      { key: "liability_insurance", label: "General Liability Insurance" }
    ]
  }
};
