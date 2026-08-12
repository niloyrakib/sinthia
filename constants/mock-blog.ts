import type { BlogPost } from "@/types/content";

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "free-ai-tools-save-time",
    title: "10 Free AI Tools That Will Save You 10 Hours a Week",
    excerpt:
      "From writing to scheduling, these AI tools quietly cut hours off your week — no subscription required.",
    category: "AI & Automation",
    categorySlug: "ai-automation",
    accent: "secondary",
    authorSlug: "rakib-hasan",
    author: "Rakib Hasan",
    publishedAt: "2026-05-24",
    readTimeMinutes: 6,
    tags: ["ai", "productivity", "automation", "free-tools"],
    isFeatured: true,
    isTrending: true,
    content: [
      {
        type: "paragraph",
        text: 'Most "AI will save you time" lists are thinly disguised affiliate pages. This one is not — every tool below is free to start, and each has earned its place in a real weekly workflow.',
      },
      { type: "heading", text: "Writing and editing", id: "writing-and-editing" },
      {
        type: "paragraph",
        text: "A good AI draft assistant does not replace your voice, it removes the blank-page problem. Pair it with a grammar pass and you have cut a first-draft hour down to fifteen minutes.",
      },
      {
        type: "heading",
        text: "Scheduling and inbox triage",
        id: "scheduling-and-inbox",
      },
      {
        type: "paragraph",
        text: "Scheduling assistants that read intent from plain-language requests remove the back-and-forth of finding a meeting slot. Inbox triage tools that summarize threads before you open them save the rest.",
      },
      {
        type: "heading",
        text: "Research and summarization",
        id: "research-and-summarization",
      },
      {
        type: "paragraph",
        text: "Long PDFs and reports compress well. Ask for a structured summary with page references before committing to a full read — you will skip most of them entirely.",
      },
    ],
    faqs: [
      {
        question: "Do any of these tools require a credit card to start?",
        answer:
          "No — every tool in this list has a genuinely free tier, not just a trial.",
      },
      {
        question: "Will AI tools actually replace the work, or just speed it up?",
        answer:
          "For the tasks in this list, they speed up the first draft or first pass. You still review and finalize the output.",
      },
    ],
  },
  {
    id: "b2",
    slug: "start-profitable-blog-2026",
    title: "How to Start a Profitable Blog in 2026 (Step-by-Step)",
    excerpt:
      "A realistic roadmap from zero to your first affiliate payout, without the fluff.",
    category: "Blogging",
    categorySlug: "blogging",
    accent: "primary",
    authorSlug: "rakib-hasan",
    author: "Rakib Hasan",
    publishedAt: "2026-05-22",
    readTimeMinutes: 9,
    tags: ["blogging", "affiliate-marketing", "seo", "make-money-online"],
    isFeatured: true,
    content: [
      {
        type: "paragraph",
        text: "Most blogging guides sell the dream and skip the math. Here is the version with the math left in.",
      },
      { type: "heading", text: "Pick a niche you can sustain", id: "pick-a-niche" },
      {
        type: "paragraph",
        text: "The niche that pays is rarely the niche that is fun to talk about at a party. Pick something with buyer intent and enough personal knowledge that you can write fifty posts without running dry.",
      },
      {
        type: "heading",
        text: "Publish before you monetize",
        id: "publish-before-monetize",
      },
      {
        type: "paragraph",
        text: "Affiliate networks and ad platforms both want to see traffic and content depth before they approve you. Twenty solid posts beats five posts and three monetization plugins.",
      },
      { type: "heading", text: "The realistic timeline", id: "realistic-timeline" },
      {
        type: "paragraph",
        text: "Expect month one through three to be almost entirely writing with little traffic. Search traffic typically starts compounding around month four to six if you are consistent and the niche has real search volume.",
      },
    ],
    faqs: [
      {
        question: "How much does it cost to start?",
        answer:
          "Domain and basic hosting typically run under $100/year. Everything else — writing, SEO — is time, not money.",
      },
      {
        question: "How long until the first affiliate payout?",
        answer:
          "Realistically three to six months of consistent publishing before meaningful, repeatable traffic arrives.",
      },
    ],
  },
  {
    id: "b3",
    slug: "make-money-online-2026",
    title: "Best Ways to Make Money Online in 2026",
    excerpt: "Ten proven paths, ranked honestly by effort required versus real payout.",
    category: "Finance",
    categorySlug: "finance",
    accent: "warning",
    authorSlug: "rakib-hasan",
    author: "Rakib Hasan",
    publishedAt: "2026-05-20",
    readTimeMinutes: 7,
    tags: ["make-money-online", "finance", "freelancing"],
    isTrending: true,
    content: [
      {
        type: "paragraph",
        text: "Ranked by a simple question: how much real income per hour invested, once you account for the ramp-up time nobody mentions in the thumbnail.",
      },
      {
        type: "heading",
        text: "High effort, high ceiling",
        id: "high-effort-high-ceiling",
      },
      {
        type: "paragraph",
        text: "Freelance services and productized SaaS both take months to ramp but have no real income ceiling once they work.",
      },
      {
        type: "heading",
        text: "Low effort, capped ceiling",
        id: "low-effort-capped-ceiling",
      },
      {
        type: "paragraph",
        text: "Survey sites and micro-task platforms pay immediately but plateau fast — useful for beer money, not a plan.",
      },
    ],
  },
  {
    id: "b4",
    slug: "web-tools-every-developer-needs",
    title: "12 Web Tools Every Developer Should Bookmark",
    excerpt: "The utilities that quietly save a click, a tab, or a whole afternoon.",
    category: "Web Resources",
    categorySlug: "web-resources",
    accent: "danger",
    authorSlug: "rakib-hasan",
    author: "Rakib Hasan",
    publishedAt: "2026-05-15",
    readTimeMinutes: 5,
    tags: ["developer-tools", "web-resources", "productivity"],
    content: [
      {
        type: "paragraph",
        text: "None of these are exotic. They are boring, reliable, and each one has saved a real afternoon at some point.",
      },
      {
        type: "heading",
        text: "Formatting and validation",
        id: "formatting-and-validation",
      },
      {
        type: "paragraph",
        text: "A fast JSON formatter and a regex tester belong in every developer's bookmarks bar, not buried three folders deep.",
      },
      { type: "heading", text: "Design handoff", id: "design-handoff" },
      {
        type: "paragraph",
        text: "A color palette extractor turns a screenshot into usable hex codes in seconds — faster than opening a design file just to eyedrop one color.",
      },
    ],
  },
];
