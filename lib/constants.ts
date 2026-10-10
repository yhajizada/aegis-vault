export interface PlanTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PRICING_PLANS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Perfect for indie hackers and developers exploring side projects.",
    features: [
      "Up to 3 projects",
      "Community support",
      "1,000 monthly active users",
      "Basic analytics dashboard",
      "1 GB cloud storage",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 290,
    description: "Best for growing startups, SaaS companies, and fast teams.",
    popular: true,
    features: [
      "Unlimited projects",
      "Priority 24/7 email & chat support",
      "50,000 monthly active users",
      "Real-time event streaming & analytics",
      "Custom domain & SSL",
      "Team roles & fine-grained permissions",
      "Automated database backups",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 99,
    priceYearly: 990,
    description: "Dedicated infrastructure, compliance, and custom integrations.",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom SLA (99.99% uptime)",
      "SSO & SAML authentication",
      "Audit logs & HIPAA/SOC2 reports",
      "Custom on-premise deployment support",
    ],
  },
];

export const MOCK_METRICS = {
  mrr: 24850,
  mrrGrowth: "+14.2%",
  activeUsers: 8420,
  activeUsersGrowth: "+8.1%",
  conversionRate: 4.8,
  conversionRateGrowth: "+1.2%",
  churnRate: 1.4,
  churnRateGrowth: "-0.3%",
};

export const RECENT_ACTIVITY = [
  {
    id: "1",
    user: "Sarah Chen",
    email: "sarah@acme.inc",
    action: "Upgraded plan to Pro",
    amount: "$290.00",
    date: "10 mins ago",
    status: "Completed",
  },
  {
    id: "2",
    user: "Marcus Sterling",
    email: "marcus@devflow.io",
    action: "API Key Generated",
    amount: "—",
    date: "45 mins ago",
    status: "Active",
  },
  {
    id: "3",
    user: "Elena Rostova",
    email: "elena@quantum.tech",
    action: "New team member invited",
    amount: "—",
    date: "2 hours ago",
    status: "Completed",
  },
  {
    id: "4",
    user: "David Kim",
    email: "david@hyperloop.co",
    action: "Monthly subscription renewed",
    amount: "$29.00",
    date: "5 hours ago",
    status: "Completed",
  },
  {
    id: "5",
    user: "Amira Patel",
    email: "amira@cloudstack.ai",
    action: "Custom webhook configured",
    amount: "—",
    date: "1 day ago",
    status: "Active",
  },
];
