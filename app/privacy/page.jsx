"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,0.08)] border border-[#E6DED3] p-10 space-y-8">

        <h1 className="text-3xl font-bold">Privacy Policy</h1>

        <p className="text-sm opacity-70">
          Last Updated: March 14, 2026
        </p>

        <p>
          This Privacy Policy explains how <strong>MyHelperPro</strong> (“we,” “our,” or “us”)
          collects, uses, stores, and protects information when you use our platform.
          By accessing or using MyHelperPro, you agree to the practices described below.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>

          <p><strong>Account Information</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Location or service area</li>
          </ul>

          <p><strong>Profile Information</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Business descriptions</li>
            <li>Service categories</li>
            <li>Credentials or certifications voluntarily submitted</li>
            <li>Portfolio images or public profile content</li>
          </ul>

          <p><strong>Technical Information</strong></p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Device type</li>
            <li>Browser information</li>
            <li>IP address</li>
            <li>Usage activity for security and fraud prevention</li>
          </ul>

          <p className="text-sm opacity-80">
            We do not sell personal information for monetary compensation.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">2. How We Use Information</h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>To create and manage accounts</li>
            <li>To display provider profiles</li>
            <li>To maintain platform integrity and prevent fraud</li>
            <li>To communicate important platform updates</li>
            <li>To improve functionality and user experience</li>
            <li>To monitor and protect platform security</li>
          </ul>

          <p>
            During beta, messaging, booking, and payments are not enabled.
            If messaging is introduced in the future, communications may be
            monitored to enforce safety standards and Terms of Service.
          </p>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">3. Public Profile Information</h2>

          <p>
            Certain information submitted by providers may be publicly visible
            on the platform. This may include profile descriptions, service
            categories, and portfolio content.
          </p>

          <p>
            Users should avoid submitting sensitive personal information in
            publicly visible fields.
          </p>
        </div>

        {/* SECTION 4 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">4. Data Sharing</h2>

          <p>
            We share information only when necessary to operate the platform:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>With secure hosting and infrastructure providers</li>
            <li>With authentication and database providers</li>
            <li>With payment processors if payment features are introduced</li>
            <li>If required by law or legal process</li>
          </ul>

          <p>
            We do not sell personal data to third parties.
          </p>
        </div>

        {/* SECTION 5 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">5. Third-Party Services</h2>

          <p>
            MyHelperPro relies on trusted third-party providers to operate the
            platform, including hosting infrastructure, authentication services,
            database providers, and analytics tools.
          </p>

          <p>
            These providers may process limited personal information necessary
            to deliver their services. They are required to protect data and may
            only process it on our behalf.
          </p>
        </div>

        {/* SECTION 6 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">6. Cookies & Tracking Technologies</h2>

          <p>
            MyHelperPro may use cookies or similar technologies to improve
            security, remember user preferences, and analyze platform usage.
          </p>

          <p>
            These technologies help maintain platform functionality and detect
            suspicious or abusive activity.
          </p>
        </div>

        {/* SECTION 7 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">7. Data Retention</h2>

          <p>
            We retain information as long as necessary to:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Operate and secure the platform</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud or abuse</li>
          </ul>

          <p>
            Users may request deletion of their account. We will process
            deletion requests subject to legal retention requirements.
          </p>
        </div>

        {/* SECTION 8 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">8. California Privacy Rights</h2>

          <p>
            If you are a California resident, you may request:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Access to the categories of data we collect</li>
            <li>Correction of inaccurate personal information</li>
            <li>Deletion of personal data (subject to legal exceptions)</li>
          </ul>

          <p>
            Requests may be submitted through our{" "}
            <Link href="/contact" className="underline font-medium">
              Contact page
            </Link>.
          </p>
        </div>

        {/* SECTION 9 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">9. Security</h2>

          <p>
            We implement industry-standard administrative, technical, and
            physical safeguards designed to protect personal information.
          </p>

          <p>
            Users are responsible for maintaining the confidentiality of
            their login credentials.
          </p>

          <p>
            No online system can guarantee absolute security.
          </p>
        </div>

        {/* SECTION 10 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">10. Data Processing Location</h2>

          <p>
            Information collected through the platform may be processed and
            stored on servers located in the United States.
          </p>
        </div>

        {/* SECTION 11 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">11. Children’s Privacy</h2>

          <p>
            MyHelperPro is intended for individuals 18 years of age or older.
            We do not knowingly collect information from minors.
          </p>
        </div>

        {/* SECTION 12 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">12. Email Communications</h2>

          <p>
            By creating an account or joining our newsletter, you consent to
            receive administrative and platform-related communications.
          </p>

          <p>
            You may unsubscribe from non-essential communications at any time.
          </p>
        </div>

        {/* SECTION 13 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">13. Beta Status</h2>

          <p>
            MyHelperPro is currently in beta. Features may change or be added
            over time.
          </p>

          <p>
            As new services such as messaging, booking, or payments are
            introduced, this Privacy Policy may be updated.
          </p>
        </div>

        {/* SECTION 14 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">14. Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy periodically.
          </p>

          <p>
            Continued use of the platform after changes are posted constitutes
            acceptance of the updated policy.
          </p>
        </div>

        {/* SECTION 15 */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">15. Contact</h2>

          <p>
            Questions regarding this Privacy Policy may be sent to:
          </p>

          <p className="font-medium">
            support@myhelperpro.com
          </p>
        </div>

        <div className="pt-6 text-sm opacity-70">
          For full platform rules, please review our{" "}
          <Link href="/terms" className="underline font-medium">
            Terms of Service
          </Link>.
        </div>

      </div>
    </div>
  );
}