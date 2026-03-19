export const metadata = {
  title: "Application Submitted",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-10 animate-fade-in">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-green-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
            ✓
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4 tracking-tight">
          Application Received 🎉
        </h1>

        {/* Subtitle */}
        <p className="text-center text-slate-300 mb-8">
          Thank you for applying to become a MyHelperPro provider.  
          Our team will review your ID, background check, and profile details shortly.
        </p>

        {/* Divider */}
        <div className="h-px bg-white/20 w-full mb-8" />

        {/* What Happens Next */}
        <h2 className="text-xl font-semibold mb-3">What Happens Next</h2>

        <ul className="space-y-3 text-slate-300">
          <li className="flex gap-3">
            <span className="text-green-400">•</span>  
            Your documents are reviewed for safety & compliance.
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">•</span>
            You’ll be matched with local clients who need reliable help.
          </li>
          <li className="flex gap-3">
            <span className="text-green-400">•</span>
            You can set your hourly rates, availability, and services.
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="/providers/dashboard"
            className="w-full text-center bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold shadow-md"
          >
            Go to Dashboard
          </a>
          <a
            href="/"
            className="w-full text-center bg-white/20 hover:bg-white/30 transition py-3 rounded-lg font-semibold"
          >
            Return Home
          </a>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-400 text-center mt-8">
          If any information needs correction, you can reply directly to your confirmation email.
        </p>
      </div>
    </div>
  );
}
