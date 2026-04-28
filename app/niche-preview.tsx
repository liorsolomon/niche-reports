"use client";

import { useState } from "react";
import { usePostHog } from "posthog-js/react";

type DemandLevel = "High" | "Medium" | "Low";

type NicheResult = {
  demand: DemandLevel;
  competitors: string[];
  preview: string;
};

type NicheEntry = {
  keywords: string[];
  result: NicheResult;
};

const NICHE_DB: NicheEntry[] = [
  {
    keywords: ["meal prep", "meal planning", "batch cook"],
    result: {
      demand: "High",
      competitors: ["MealPro", "Trifecta Nutrition", "Factor"],
      preview: "Competitor pricing $8–14/meal; ICP busy professionals 25–45; 110K monthly searches; strong subscription model opportunity with ~40% retention at 3 months.",
    },
  },
  {
    keywords: ["keto", "ketogenic", "low carb"],
    result: {
      demand: "High",
      competitors: ["Perfect Keto", "KetoConnect", "Kettle & Fire"],
      preview: "450K monthly searches; subscription box market $10B; ICP women 30–55; strong supplement upsell — avg AOV 2.4× with add-ons.",
    },
  },
  {
    keywords: ["vegan", "plant-based", "plant based"],
    result: {
      demand: "High",
      competitors: ["Purple Carrot", "Daily Harvest", "Veestro"],
      preview: "7% CAGR; high LTV buyers; ICP health-conscious 25–45; competitive but large TAM — niche positioning (athlete, budget, family) creates defensibility.",
    },
  },
  {
    keywords: ["intermittent fasting", "fasting", "16:8"],
    result: {
      demand: "High",
      competitors: ["Zero App", "DoFasting", "Simple"],
      preview: "3.6M searches/mo; app-first plays dominate; ICP 30–50 health-optimizers; subscription $9–19/mo, strong LTV — 6-month retention avg 55%.",
    },
  },
  {
    keywords: ["gut health", "probiotic", "microbiome"],
    result: {
      demand: "High",
      competitors: ["Seed", "Ritual", "Pendulum"],
      preview: "Emerging $60B probiotic market; ICP health-conscious women 28–45; premium DTC positioning proven — $60–120/mo subscription works.",
    },
  },
  {
    keywords: ["fitness", "personal training", "workout plan"],
    result: {
      demand: "High",
      competitors: ["Peloton", "Beachbody", "Nike Training Club"],
      preview: "Saturated top-level — high defensibility by sub-niche (new moms, desk workers, seniors). Avg revenue per coach $4K–12K/mo via 1:1 + group hybrid.",
    },
  },
  {
    keywords: ["yoga", "pilates", "flexibility"],
    result: {
      demand: "High",
      competitors: ["Alo Moves", "Glo", "Peloton Yoga"],
      preview: "7M searches/mo; subscription model dominates; ICP women 28–45; community upsell adds 30–50% revenue — retreat and workshop conversion strong.",
    },
  },
  {
    keywords: ["home workout", "bodyweight", "no equipment"],
    result: {
      demand: "High",
      competitors: ["Beachbody", "Apple Fitness+", "FitOn"],
      preview: "Post-COVID sustained demand; 5.4M monthly searches; ICP busy parents 30–50; freemium-to-paid 4–8% conversion; $12–25/mo works.",
    },
  },
  {
    keywords: ["running", "marathon", "5k", "trail run"],
    result: {
      demand: "High",
      competitors: ["Strava", "Garmin Connect", "Nike Run Club"],
      preview: "Large engaged community; gear + coaching + app revenue streams; ICP 25–45 fitness-first; coaching $50–200/mo, community $10–15/mo.",
    },
  },
  {
    keywords: ["weightlifting", "strength training", "powerlifting", "bodybuilding"],
    result: {
      demand: "High",
      competitors: ["Stronger by Science", "MAPS Fitness", "Starting Strength"],
      preview: "Growing strength trend; 2.1M searches/mo; ICP men 20–40; program sales $27–97 one-time, coaching $100–300/mo — strong YouTube-to-paid funnel.",
    },
  },
  {
    keywords: ["personal finance", "budgeting", "debt", "money management"],
    result: {
      demand: "High",
      competitors: ["Ramsey Solutions", "NerdWallet", "You Need a Budget"],
      preview: "Massive TAM; SEO-driven; ICP millennials 28–42; course $97–497, coaching $200–500/mo — debt payoff niche highest intent buyers.",
    },
  },
  {
    keywords: ["investing", "stock market", "portfolio", "dividend"],
    result: {
      demand: "High",
      competitors: ["Motley Fool", "Seeking Alpha", "Insider Intelligence"],
      preview: "High CPM advertising; newsletter subscription proven ($10–30/mo); ICP 30–55 income-earners; community upsell $500–2K/yr works.",
    },
  },
  {
    keywords: ["freelancing", "freelancer", "independent contractor"],
    result: {
      demand: "High",
      competitors: ["Freelancer Map", "Upwork Academy", "We Work Remotely"],
      preview: "58M freelancers in US; training + community works; ICP 25–40 skill-builders; course $97–297, community $15–30/mo — strong word-of-mouth.",
    },
  },
  {
    keywords: ["dropshipping", "drop shipping", "ecommerce store"],
    result: {
      demand: "Medium",
      competitors: ["AutoDS", "Zendrop", "SaleHoo"],
      preview: "550K searches/mo; declining organic interest; ICP beginners 20–35; info product + tool bundle $27–97 — still viable with strong differentiation.",
    },
  },
  {
    keywords: ["amazon fba", "amazon seller", "private label"],
    result: {
      demand: "Medium",
      competitors: ["Helium 10", "Jungle Scout", "Viral Launch"],
      preview: "Tool-heavy space; ICP entrepreneurs 28–45; software $39–99/mo dominates — coaching upsell $200–500/mo adds high-margin revenue.",
    },
  },
  {
    keywords: ["notion", "notion template", "notion workspace"],
    result: {
      demand: "High",
      competitors: ["Thomas Frank Explains", "Easlo", "Red Gregory"],
      preview: "Creator-led market; low competition vs. search demand; ICP productivity-seekers 22–40; Gumroad + Etsy work — $15–49 templates, bundle $79–149.",
    },
  },
  {
    keywords: ["canva", "canva template", "graphic design template"],
    result: {
      demand: "High",
      competitors: ["Creative Market", "Design Bundles", "Etsy sellers"],
      preview: "High marketplace volume; ICP small business owners + VAs; bundling and licensing drive higher AOV — $19 single, $49–99 bundle converts well.",
    },
  },
  {
    keywords: ["online course", "course creation", "e-learning", "elearning"],
    result: {
      demand: "High",
      competitors: ["Teachable", "Kajabi", "Thinkific"],
      preview: "Massive market; ICP professional upskill 28–45; cohort model outperforms self-paced by 3× completion and 2× retention — $297–997 cohort.",
    },
  },
  {
    keywords: ["printable", "printables", "digital download"],
    result: {
      demand: "High",
      competitors: ["Etsy stores", "Teachers Pay Teachers", "Creative Fabrica"],
      preview: "Low barrier to entry; ICP parents + teachers; Etsy SEO critical — bundles increase AOV from $3–5 single to $15–29 bundle, 6× lift.",
    },
  },
  {
    keywords: ["language learning", "learn spanish", "learn french", "learn japanese"],
    result: {
      demand: "High",
      competitors: ["Duolingo", "Babbel", "italki"],
      preview: "Massive TAM; app or coaching positioning; ICP 20–40 career-driven; niche language focus (business Japanese, medical Spanish) creates defensibility — $30–150/mo.",
    },
  },
  {
    keywords: ["coding", "programming", "web development", "software development"],
    result: {
      demand: "High",
      competitors: ["Codecademy", "freeCodeCamp", "Scrimba"],
      preview: "Evergreen demand; ICP career-switchers 22–40; bootcamp $1.5K–15K, course $97–997, YouTube-to-paid funnel strong — ROI narrative is the headline.",
    },
  },
  {
    keywords: ["tutoring", "academic tutoring", "test prep", "sat prep"],
    result: {
      demand: "High",
      competitors: ["Wyzant", "Tutor.com", "Varsity Tutors"],
      preview: "Seasonal demand spikes (Aug–Nov, Jan–Mar); ICP parents of K–12; local + remote split; $40–120/hr or subscription retainer $200–400/mo.",
    },
  },
  {
    keywords: ["life coaching", "mindset coaching", "success coach"],
    result: {
      demand: "High",
      competitors: ["BetterUp", "Tony Robbins brand", "Marie Forleo B-School"],
      preview: "$20B market; ICP women 30–50 in career/life transition; 1:1 $300–800/mo + group program $497–1,997 hybrid maximizes income.",
    },
  },
  {
    keywords: ["mental health", "anxiety", "stress", "therapy", "mindfulness"],
    result: {
      demand: "High",
      competitors: ["Headspace", "Calm", "BetterHelp"],
      preview: "Post-pandemic sustained demand; ICP 25–45 stressed professionals; app or content community works; high retention — avoid clinical claims, focus on tools + support.",
    },
  },
  {
    keywords: ["meditation", "breathwork", "mindfulness"],
    result: {
      demand: "High",
      competitors: ["Headspace", "Calm", "Insight Timer"],
      preview: "3.2M searches/mo; subscription app dominates; ICP 30–55 wellness-seekers; content library $9–14/mo, live retreat $500–2K — community layer adds LTV.",
    },
  },
  {
    keywords: ["sleep", "insomnia", "sleep quality"],
    result: {
      demand: "High",
      competitors: ["Calm", "Sleep Cycle", "Hatch"],
      preview: "Chronic sleep crisis drives demand; ICP parents + professionals 30–50; app + device bundle — $39 one-time, $8/mo subscription both convert.",
    },
  },
  {
    keywords: ["dog training", "puppy training", "dog behavior"],
    result: {
      demand: "High",
      competitors: ["Cesar Milan brand", "Zak George", "Pupford"],
      preview: "12K–200K searches/mo by breed/issue; online course $47–197; ICP new dog owners 28–45; subscription tips + community $15/mo, high engagement.",
    },
  },
  {
    keywords: ["pet", "cat care", "dog care", "pet health"],
    result: {
      demand: "High",
      competitors: ["PetSmart Academy", "Chewy blog", "rover.com"],
      preview: "Large recurring purchase market; ICP pet parents 28–50; subscription box + education hybrid — $25–45/mo, strong LTV, high social sharing.",
    },
  },
  {
    keywords: ["travel", "travel hacking", "points miles", "budget travel"],
    result: {
      demand: "High",
      competitors: ["Nomadic Matt", "The Points Guy", "Expert Vagabond"],
      preview: "Content-first, affiliate revenue proven ($3K–30K/mo on ads + affiliate); ICP 25–45 adventure-seekers; guide/course $27–97 converts well.",
    },
  },
  {
    keywords: ["parenting", "new parent", "baby", "toddler"],
    result: {
      demand: "High",
      competitors: ["BabyCenter", "What to Expect", "Moms on Call"],
      preview: "Emotionally driven buyers; ICP new parents 27–40; subscription community + courses — $15–29/mo, strong word-of-mouth acquisition.",
    },
  },
  {
    keywords: ["homeschool", "homeschooling", "home school"],
    result: {
      demand: "High",
      competitors: ["Khan Academy", "Time4Learning", "Oak Meadow"],
      preview: "Growing post-COVID; ICP parents 30–45; curriculum product + community — $30–80/mo recurring subscription fits the audience's longer commitment horizon.",
    },
  },
  {
    keywords: ["real estate investing", "rental property", "house hacking", "real estate"],
    result: {
      demand: "High",
      competitors: ["BiggerPockets", "Rich Dad brand", "Grant Cardone"],
      preview: "High-intent buyers; ICP 30–50 income investors; info product $197–997 + community $49–99/mo — high AOV tolerated, slow trust build required.",
    },
  },
  {
    keywords: ["airbnb", "short term rental", "str", "vacation rental"],
    result: {
      demand: "Medium",
      competitors: ["Airbnb Masterclass creators", "STR Secrets", "Avery Carl brand"],
      preview: "Niche-within-niche plays well; ICP 30–50 property owners; course $297–997, coaching $300–800/mo — regulation risk is a talking point to address.",
    },
  },
  {
    keywords: ["saas", "software", "startup", "indie hacker", "micro saas"],
    result: {
      demand: "High",
      competitors: ["ProductHunt", "Indie Hackers", "SaaStr"],
      preview: "Developer-savvy audience; ICP 25–45 builders; community + newsletter + tools — $15–29/mo, high engagement, strong NPS.",
    },
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ai tools", "chatgpt"],
    result: {
      demand: "High",
      competitors: ["There's An AI For That", "Futurepedia", "Ben's Bites"],
      preview: "Explosive growth; ICP tech-savvy 25–45; directory + newsletter + courses — first-mover advantage matters, $9–29/mo subscription works.",
    },
  },
  {
    keywords: ["automation", "zapier", "make.com", "no-code", "workflow"],
    result: {
      demand: "High",
      competitors: ["Zapier community", "Make Academy", "n8n community"],
      preview: "SMB pain point; ICP ops-heavy businesses 30–50; template marketplace $29–99 + training $197–497 — strong recurring model.",
    },
  },
  {
    keywords: ["skincare", "skin care", "anti-aging", "acne"],
    result: {
      demand: "High",
      competitors: ["Paula's Choice", "The Ordinary", "Glossier"],
      preview: "Ingredient-driven audience; ICP women 25–45; subscription box + education hybrid — $30–60/mo, UGC drives conversion, high repeat purchase.",
    },
  },
  {
    keywords: ["hair care", "curly hair", "natural hair", "hair growth"],
    result: {
      demand: "High",
      competitors: ["DevaCurl", "Prose", "Function of Beauty"],
      preview: "Texture-specific niches defensible; ICP women 20–50; subscription $25–50/mo, community-first acquisition — loyal audience once trust is built.",
    },
  },
  {
    keywords: ["productivity", "gtd", "time block", "focus"],
    result: {
      demand: "High",
      competitors: ["Notion", "Thomas Frank", "Asian Efficiency"],
      preview: "Tool-agnostic content works; ICP knowledge workers 25–45; template + course hybrid $27–197 — YouTube-friendly, strong SEO play.",
    },
  },
  {
    keywords: ["remote work", "work from home", "digital nomad", "remote job"],
    result: {
      demand: "High",
      competitors: ["Remote.com", "FlexJobs", "We Work Remotely"],
      preview: "Normalized since 2020; ICP 25–45 professionals; job board + community + resources — recurring subscription $15–30/mo works.",
    },
  },
  {
    keywords: ["photography", "photo editing", "lightroom", "photo"],
    result: {
      demand: "High",
      competitors: ["SLR Lounge", "Fstoppers", "Lightroom Killer Tips"],
      preview: "Gear + education split; ICP hobbyists-to-pros 25–50; preset packs $19–49 + courses $97–297 — Lightroom integration strongest conversion hook.",
    },
  },
  {
    keywords: ["podcasting", "podcast", "audio content"],
    result: {
      demand: "Medium",
      competitors: ["Buzzsprout Academy", "Riverside.fm", "Podcastle"],
      preview: "Maturing market; 3M+ podcasts; ICP content creators 28–45 — editing + growth services $200–1K/mo, SaaS tool angle if you can build.",
    },
  },
  {
    keywords: ["music production", "beat making", "music producer", "audio production"],
    result: {
      demand: "Medium",
      competitors: ["Splice", "LANDR", "Producertech"],
      preview: "Subscription sample library dominates; ICP bedroom producers 18–35; community + templates $15–30/mo — YouTube-first acquisition proven.",
    },
  },
  {
    keywords: ["writing", "copywriting", "content writing", "newsletter", "substack"],
    result: {
      demand: "High",
      competitors: ["Substack", "Ghost", "Copyblogger"],
      preview: "Creator economy tailwind; ICP writers 25–50; newsletter-first, coaching + community $97–497 — high LTV audience, strong referral loop.",
    },
  },
  {
    keywords: ["sustainable", "eco-friendly", "green living", "zero waste"],
    result: {
      demand: "Medium",
      competitors: ["Good On You", "EarthHero", "Grove Collaborative"],
      preview: "Values-driven buyer; ICP eco-conscious 25–40; higher price tolerance — brand story and certifications are the acquisition lever.",
    },
  },
  {
    keywords: ["supplement", "nutrition", "vitamin", "protein"],
    result: {
      demand: "High",
      competitors: ["Athletic Greens (AG1)", "Ritual", "Legion Athletics"],
      preview: "Repeat purchase market; ICP health-conscious 25–50; subscription $40–100/mo — differentiation on transparency, ingredient sourcing, and clinical backing.",
    },
  },
];

const DEMAND_BADGE: Record<DemandLevel, string> = {
  High: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-red-100 text-red-700 border-red-200",
};

const PAYMENT_LINK = process.env.NEXT_PUBLIC_PAYMENT_LINK || "";

function lookupNiche(input: string): NicheResult {
  const lower = input.toLowerCase().trim();
  for (const entry of NICHE_DB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.result;
    }
  }
  return {
    demand: "Medium",
    competitors: ["DimeADozen", "IdeaCheck", "Validate.io"],
    preview:
      "Market demand signal, competitive landscape, and real buyer language available for this niche. Full report covers demand sizing, ICP profile, pricing benchmarks, opportunity score, and a go/no-go verdict.",
  };
}

export default function NichePreview() {
  const posthog = usePostHog();
  const [niche, setNiche] = useState("");
  const [result, setResult] = useState<NicheResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!niche.trim()) return;
    const r = lookupNiche(niche);
    setResult(r);
    setHasSearched(true);
    posthog?.capture("niche_preview_submitted", { niche });
  }

  function handlePaymentClick() {
    posthog?.capture("payment_cta_clicked", {
      niche,
      demand: result?.demand,
    });
    if (
      typeof window !== "undefined" &&
      (
        window as unknown as {
          fbq?: (...args: unknown[]) => void;
        }
      ).fbq
    ) {
      (
        window as unknown as { fbq: (...args: unknown[]) => void }
      ).fbq("track", "InitiateCheckout");
    }
    if (
      typeof window !== "undefined" &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
        "event",
        "begin_checkout",
        { currency: "USD", value: 49 }
      );
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <input
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g. meal prep for remote workers"
          className="flex-1 rounded-full px-5 py-3 text-sm border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer"
        >
          Preview my niche →
        </button>
      </form>

      {hasSearched && result && (
        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600">
              Demand signal:
            </span>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${DEMAND_BADGE[result.demand]}`}
            >
              {result.demand}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Top competitors in this space
            </p>
            <div className="flex flex-wrap gap-2">
              {result.competitors.map((c) => (
                <span
                  key={c}
                  className="bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Your full report would cover
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {result.preview}
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">
              + competitor pricing, ICP profile, go/no-go verdict, and
              recommended next steps.
            </p>
          </div>

          <a
            href={PAYMENT_LINK || "#"}
            onClick={handlePaymentClick}
            target={PAYMENT_LINK ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-6 py-3.5 rounded-full transition-colors"
          >
            Get your full 6-dimension report → $49
          </a>
          <p className="text-xs text-gray-500 text-center mt-3">
            One-time · Delivered within 48 hours · No subscription
          </p>
        </div>
      )}
    </div>
  );
}
