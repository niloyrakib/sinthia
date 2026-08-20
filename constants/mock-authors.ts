export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  accent: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const MOCK_AUTHORS: Author[] = [
  {
    slug: "rakib-hasan",
    name: "Rakib Hasan",
    role: "Founder, SINTHIA",
    bio: "Builder of SINTHIA — writes about AI tools, web resources, and practical ways to make money online. Ships more than he blogs about it.",
    accent: "primary",
  },
];
