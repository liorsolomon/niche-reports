'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: "What do I get exactly?",
    a: "A structured report covering: market size estimate, 3–5 direct competitors, buyer language analysis, key objections, and a go/no-go recommendation with rationale.",
  },
  {
    q: "Is this AI-generated?",
    a: "No. We use AI tools as part of our research workflow, but the output is reviewed and written by a human analyst.",
  },
  {
    q: "What kind of ideas can you validate?",
    a: "Products, SaaS ideas, service businesses, content niches, freelance offers — anything you're considering building or selling.",
  },
  {
    q: "What if the verdict is \"no-go\"?",
    a: "That's the point. Saving 12 months on a bad idea is worth $97.",
  },
  {
    q: "Do you keep my idea confidential?",
    a: "Yes. We do not share, publish, or reference client ideas.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-gray-900">{faq.q}</span>
            <span className="text-indigo-600 shrink-0 text-xl font-bold">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
