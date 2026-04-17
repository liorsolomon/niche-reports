'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: "What's in the 6-dimension analysis?",
    a: "Market size, competition, monetization potential, demand signals, trend direction, and content gap — each covered in depth with data and a plain-English summary.",
  },
  {
    q: 'How do I submit my niche?',
    a: 'A short intake form appears after purchase — takes 5 minutes. Just describe the niche in a sentence or two. We do the rest.',
  },
  {
    q: 'What format is the report?',
    a: 'PDF (8–15 pages) designed for readability, plus a Notion workspace so you can navigate and build on the research.',
  },
  {
    q: 'Can I request a revision?',
    a: 'Yes — within 7 days of delivery, if something was missed or unclear, we will revise it.',
  },
  {
    q: 'Is this AI-only or human-reviewed?',
    a: 'Both. AI structures and aggregates the data; a human analyst reviews the output and writes the final recommendation.',
  },
  {
    q: 'What if the report says my niche is bad?',
    a: "That's the most valuable outcome — you just saved months of wasted effort. We give you the honest verdict, not what you want to hear.",
  },
  {
    q: 'What is your refund policy?',
    a: '30-day full refund, no questions asked. If the report does not meet your expectations, we will give you your money back.',
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
