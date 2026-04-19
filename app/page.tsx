import WaitlistForm from "./waitlist-form";
import FaqAccordion from "./faq-accordion";

const WHY = [
  {
    title: "48-hour turnaround.",
    description: "Not a week. Not \"we'll get back to you.\" 48 hours.",
  },
  {
    title: "One-time fee.",
    description: "DimeADozen charges $39–$59 for AI-only output. We commit human analysis, market research, and a real recommendation.",
  },
  {
    title: "Go/no-go you can actually use.",
    description: "Not a 40-page PDF you ignore. A clear verdict with supporting data and a next-step recommendation.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit your idea",
    description: "Product, service, niche — any stage. One or two sentences is enough.",
  },
  {
    step: "02",
    title: "We research it",
    description: "We research market demand, competitors, and buyer language.",
  },
  {
    step: "03",
    title: "You get your report",
    description: "A structured validation report within 48 hours.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[var(--font-geist-sans)]">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="font-bold text-lg tracking-tight">validate.3vo.ai</div>
        <a
          href="#get-it"
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          Get it — $97
        </a>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20 max-w-3xl mx-auto">
        <div className="inline-block bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
          Human-reviewed · 48-hour turnaround · $97 one-time
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-gray-900">
          Know if your idea is worth building —{" "}
          <span className="text-indigo-600">before you spend a year finding out.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
          We run a full 48-hour validation sprint: market size, competitive landscape, real buyer
          signals, and a clear go/no-go call. One-time. No subscription.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md" id="get-it">
          <WaitlistForm ctaLabel="Get it — $97" />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          $97 — one-time · No subscription · Delivered in 48 hours
        </p>
      </section>

      {/* Why validate.3vo.ai */}
      <section className="py-20 px-6 bg-indigo-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why validate.3vo.ai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {WHY.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-indigo-700 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">How it works</h2>
          <p className="text-gray-600 mb-14 max-w-xl mx-auto">
            Three steps. 48 hours. A clear answer on whether your idea is worth building.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="bg-white border border-indigo-100 rounded-2xl p-8 shadow-sm">
                <div className="text-3xl font-bold text-indigo-600 mb-4">{s.step}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">90%</div>
            <p className="text-gray-600 text-sm">of startups fail due to &ldquo;no market need&rdquo; <span className="text-gray-400">(CB Insights, 2023)</span></p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">2×</div>
            <p className="text-gray-600 text-sm">faster shipping for founders who validate before building, on average</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-2xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
        <FaqAccordion />
      </section>

      {/* CTA */}
      <section
        id="order"
        className="bg-gray-900 text-white py-24 px-6 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          Stop guessing. Start validating.
        </h2>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">
          Get a structured go/no-go verdict on your idea — with market size, competitors, buyer
          language, and a clear recommendation — in 48 hours.
        </p>
        <div className="max-w-md mx-auto">
          <WaitlistForm ctaLabel="Get it — $97" dark />
        </div>
        <p className="text-gray-400 text-sm mt-4">
          $97 — one-time · No subscription · Delivered in 48 hours
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-500">
        <p>© 2026 validate.3vo.ai</p>
        <p className="mt-2">— The 3vo.ai team</p>
      </footer>
    </div>
  );
}
