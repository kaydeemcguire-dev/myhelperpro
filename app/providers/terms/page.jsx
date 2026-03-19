// app/providers/terms/page.jsx

import Link from "next/link";

export const metadata = {
  title: "Provider Terms | MyHelperPro",
  description:
    "Independent contractor terms and conditions for providers using MyHelperPro.",
};

export default function ProviderTermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3A302A] p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 space-y-6 border border-black/5">
        {/* Back link */}
        <div className="mb-2">
          <Link
            href="/"
            className="text-xs underline opacity-70 hover:opacity-100"
          >
            ← Back to home
          </Link>
        </div>

        <header className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            MyHelperPro Provider Terms &amp; Independent Contractor Agreement
          </h1>
          <p className="text-xs uppercase tracking-wide opacity-60">
            Last updated: {new Date().getFullYear()}
          </p>
          <p className="text-xs italic text-red-600/80">
            Important: This page is a general informational template only and
            does not constitute legal advice. You should review this document
            with a licensed attorney in your jurisdiction before relying on it.
          </p>
        </header>

        {/* 1. INTRODUCTION */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p className="text-sm leading-relaxed">
            These MyHelperPro Provider Terms &amp; Independent Contractor
            Agreement (the &quot;Provider Terms&quot;) govern your access to and
            use of the MyHelperPro platform as a service provider
            (&quot;Provider,&quot; &quot;you,&quot; or &quot;your&quot;). The
            MyHelperPro website, applications, and related services are
            operated by MyHelperPro (&quot;MyHelperPro,&quot; &quot;we,&quot;
            or &quot;us&quot;).
          </p>
          <p className="text-sm leading-relaxed">
            By creating a Provider account, listing services, or accepting a
            booking through MyHelperPro, you agree to be bound by these
            Provider Terms, as well as our{" "}
            <Link
              href="/terms"
              className="underline hover:text-indigo-700"
            >
              General Terms of Use
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-indigo-700"
            >
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-sm leading-relaxed">
            These Provider Terms are intended for use in the United States, with
            MyHelperPro currently based in California. Applicable federal, state,
            and local laws may impose additional or different requirements. You
            are responsible for complying with all laws that apply to you and
            your services.
          </p>
        </section>

        {/* 2. INDEPENDENT CONTRACTOR STATUS */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            2. Independent Contractor Relationship
          </h2>
          <p className="text-sm leading-relaxed">
            You acknowledge and agree that you are an{" "}
            <span className="font-semibold">independent contractor</span> and{" "}
            <span className="font-semibold">
              not an employee, agent, joint venturer, or partner
            </span>{" "}
            of MyHelperPro. Nothing in these Provider Terms creates an
            employment relationship between you and MyHelperPro.
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>
              You decide which services to offer, when to work, and which jobs
              to accept.
            </li>
            <li>
              You are responsible for providing and maintaining your own tools,
              equipment, supplies, and transportation.
            </li>
            <li>
              You are solely responsible for determining and paying any and all
              taxes (including income, self-employment, and sales taxes, if
              applicable) arising from payments you receive.
            </li>
            <li>
              You are not entitled to any benefits from MyHelperPro, including
              but not limited to health insurance, unemployment, disability,
              workers&apos; compensation, or retirement benefits.
            </li>
          </ul>
        </section>

        {/* 3. ELIGIBILITY & ACCOUNTS */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            3. Provider Eligibility &amp; Account Information
          </h2>
          <p className="text-sm leading-relaxed">
            To use MyHelperPro as a Provider, you must meet all eligibility
            criteria described in the General Terms of Use and any additional
            requirements disclosed during the Provider onboarding process.
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>
              You agree that all information you submit (including your name,
              business name, contact information, qualifications, licenses,
              insurance, and background details) is truthful and accurate.
            </li>
            <li>
              You agree to promptly update your information if it changes so
              that it remains accurate and complete.
            </li>
            <li>
              You understand that MyHelperPro may, in its discretion, verify
              certain information (for example, through ID verification,
              background checks, or document uploads) to support trust and
              safety. Verification does not guarantee your suitability or
              eliminate risk.
            </li>
            <li>
              MyHelperPro may approve, deny, pause, or revoke Provider access at
              any time where we believe it is necessary to protect our users,
              comply with law, or protect our business.
            </li>
          </ul>
        </section>

        {/* 4. PROVIDER RESPONSIBILITIES */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">4. Provider Responsibilities</h2>
          <p className="text-sm leading-relaxed">
            As a Provider, you agree to deliver services in a professional,
            honest, and safe manner. Without limiting the General Terms of Use,
            you agree:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>To perform services with reasonable care and skill.</li>
            <li>
              To comply with all applicable federal, state, and local laws,
              regulations, and licensing requirements that apply to your
              services (including childcare, elder care, driving, health-related
              services, or other regulated activities).
            </li>
            <li>
              To maintain any required insurance policies (for example, general
              liability or professional liability), where appropriate for your
              service type.
            </li>
            <li>
              Not to misrepresent your identity, qualifications, experience, or
              the nature of your services.
            </li>
            <li>
              To communicate respectfully and refrain from harassment, abuse,
              discrimination, or other behavior that violates our policies.
            </li>
          </ul>
        </section>

        {/* 5. BOOKINGS, PAYMENTS & FEES (BETA) */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            5. Bookings, Payments &amp; Platform Fees (Beta)
          </h2>
          <p className="text-sm leading-relaxed">
            MyHelperPro is a marketplace that connects customers and Providers.
            During our beta phase, payment flows may be limited, in testing, or
            evolving. When payment processing is active on the platform, it will
            generally operate as follows:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>
              Customers pay for services through a third-party payment provider
              (such as Stripe or a similar service) integrated with
              MyHelperPro.
            </li>
            <li>
              MyHelperPro may collect a service fee or commission for each
              completed booking. The amount and structure of these fees will be
              disclosed to you before you accept a booking or as part of your
              Provider account settings.
            </li>
            <li>
              Provider payouts are handled by the third-party payment provider,
              not directly by MyHelperPro. Payout timing and rules may be
              subject to that provider&apos;s terms and applicable law.
            </li>
          </ul>
          <p className="text-sm leading-relaxed">
            During beta, MyHelperPro may experiment with fee structures,
            pricing, and features. We may modify fees or payment flows with
            reasonable notice. You are free to stop using the platform if you do
            not agree with updated fee structures.
          </p>
        </section>

        {/* 6. OFF-PLATFORM PAYMENTS / NON-CIRCUMVENTION */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            6. Off-Platform Payments &amp; Non-Circumvention
          </h2>
          <p className="text-sm leading-relaxed">
            To support trust, safety, and clear records of bookings, MyHelperPro
            may require that payments for services initiated through the
            platform be completed through the platform&apos;s approved payment
            methods once they are active.
          </p>
          <p className="text-sm leading-relaxed">
            You agree that you will not intentionally encourage, request, or
            require customers you first connected with through MyHelperPro to:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>Pay you entirely outside the platform to avoid fees;</li>
            <li>
              Share contact details solely for the purpose of bypassing the
              platform; or
            </li>
            <li>
              Circumvent MyHelperPro&apos;s role in facilitating the original
              booking.
            </li>
          </ul>
          <p className="text-sm leading-relaxed">
            Violation of this non-circumvention policy may result in suspension
            or termination of your Provider account.
          </p>
        </section>

        {/* 7. RATINGS & REVIEWS */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            7. Ratings, Reviews &amp; Feedback
          </h2>
          <p className="text-sm leading-relaxed">
            Customers may be able to leave ratings and reviews about their
            experience with you. You understand that:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>
              MyHelperPro generally does not edit or control customer reviews
              but may remove or moderate content that violates our policies,
              such as hate speech, harassment, or clearly false and harmful
              statements.
            </li>
            <li>
              Reviews are the opinions of customers, not statements or promises
              by MyHelperPro.
            </li>
            <li>
              MyHelperPro may use aggregated ratings and feedback in how
              Providers are displayed, suggested, or prioritized on the
              platform.
            </li>
          </ul>
        </section>

        {/* 8. SUSPENSION & TERMINATION */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            8. Suspension, Pausing &amp; Termination
          </h2>
          <p className="text-sm leading-relaxed">
            You may pause or deactivate your account at any time, subject to
            completing any confirmed bookings or honoring your existing
            commitments to customers.
          </p>
          <p className="text-sm leading-relaxed">
            MyHelperPro may, at its discretion and where permitted by law:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>Pause or limit your visibility in search results;</li>
            <li>
              Temporarily suspend your ability to receive new bookings; or
            </li>
            <li>
              Terminate your Provider account, including for violations of these
              Provider Terms, the General Terms of Use, applicable law, or where
              we reasonably believe there is a risk to customers, to you, or to
              the platform.
            </li>
          </ul>
        </section>

        {/* 9. NO GUARANTEE OF BOOKINGS */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            9. No Guarantee of Bookings or Income
          </h2>
          <p className="text-sm leading-relaxed">
            MyHelperPro does not guarantee that you will receive any number of
            leads, bookings, or income. Demand can vary by location, service
            type, season, marketing, platform changes, and other factors beyond
            our control.
          </p>
        </section>

        {/* 10. DISCLAIMERS & LIMITATION OF LIABILITY */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">
            10. Disclaimers &amp; Limitation of Liability
          </h2>
          <p className="text-sm leading-relaxed">
            MyHelperPro is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis, as further described in our General Terms of
            Use. To the maximum extent permitted by law, MyHelperPro disclaims
            all warranties, express or implied, including any warranties of
            merchantability, fitness for a particular purpose, title, and
            non-infringement.
          </p>
          <p className="text-sm leading-relaxed">
            To the maximum extent permitted by law, MyHelperPro will not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or for any loss of profits, revenue, data, or use,
            arising out of or related to your use of the platform or the
            services you provide, even if advised of the possibility of such
            damages. Our total liability to you for any claim arising from or
            relating to these Provider Terms or your use of the platform will be
            limited to the amount of platform fees paid by you to MyHelperPro
            during the six (6) months prior to the event giving rise to the
            claim, or a lesser amount if required by law.
          </p>
        </section>

        {/* 11. INDEMNIFICATION */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">11. Indemnification</h2>
          <p className="text-sm leading-relaxed">
            To the extent permitted by law, you agree to indemnify, defend, and
            hold harmless MyHelperPro and its owners, officers, employees, and
            agents from and against any claims, demands, losses, damages, or
            expenses (including reasonable attorneys&apos; fees) arising out of
            or related to:
          </p>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li>Your services or conduct toward customers or third parties;</li>
            <li>
              Your violation of these Provider Terms, the General Terms of Use,
              or any applicable law; or
            </li>
            <li>
              Your misuse of the platform or any content you submit or display
              through MyHelperPro.
            </li>
          </ul>
        </section>

        {/* 12. GOVERNING LAW */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">12. Governing Law</h2>
          <p className="text-sm leading-relaxed">
            These Provider Terms are intended to be governed by and construed in
            accordance with the laws of the State of California, without regard
            to its conflict of law principles, except where another jurisdiction&apos;s
            laws are mandatorily applicable.
          </p>
        </section>

        {/* 13. CHANGES */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">13. Changes to These Terms</h2>
          <p className="text-sm leading-relaxed">
            MyHelperPro may update these Provider Terms from time to time. When
            we make material changes, we will provide notice by updating the
            &quot;Last updated&quot; date, and we may also provide additional
            notice (such as an email or in-app message). Your continued use of
            the platform after the effective date of updated Provider Terms
            constitutes your acceptance of the changes.
          </p>
        </section>

        {/* FINAL NOTE */}
        <section className="space-y-2">
          <p className="text-xs italic text-slate-500">
            This document is a working template for beta use of MyHelperPro and
            should be reviewed and customized by a licensed attorney familiar
            with online marketplace and labor laws in your jurisdiction, including
            California.
          </p>
        </section>
      </div>
    </div>
  );
}
