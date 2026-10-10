import { 
  Database, 
  Layers, 
  Lock, 
  Cpu, 
  BarChart3, 
  Container, 
  Workflow, 
  Palette 
} from "lucide-react";

const FEATURES = [
  {
    icon: Layers,
    title: "Next.js 15 & React 19",
    description: "Built on modern App Router architecture with Server Components, streaming, and lightning-fast rendering.",
  },
  {
    icon: Lock,
    title: "Authentication & RBAC",
    description: "Session management with role-based access control (Admin, User, Owner) and extensible auth providers.",
  },
  {
    icon: Database,
    title: "Prisma ORM & SQLite / Postgres",
    description: "Type-safe database layer with automated migrations, schema modeling, and seamless DB seed utilities.",
  },
  {
    icon: BarChart3,
    title: "Interactive Analytics Dashboard",
    description: "Production-styled dashboard equipped with metric widgets, revenue graphs, and real-time transaction feeds.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS & Dark Mode",
    description: "Zero hydration flicker, responsive layout tokens, and pre-configured accessible theme switcher.",
  },
  {
    icon: Container,
    title: "Docker & Compose Ready",
    description: "Multi-stage production Dockerfile and container orchestration for seamless one-command deployment.",
  },
  {
    icon: Workflow,
    title: "Automated GitHub Actions CI/CD",
    description: "Pre-configured workflows for automated linting, typechecking, Vitest execution, and build validation.",
  },
  {
    icon: Cpu,
    title: "REST & Server Action APIs",
    description: "Pre-built endpoints for health checks, system metrics, user preferences, and analytics telemetry.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-zinc-50/50 dark:bg-zinc-900/20 border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Enterprise Architecture
          </h2>
          <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Everything you need for a production launch
          </p>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            Stop wasting weeks setting up database connections, authentication boilerplate, 
            CI workflows, and responsive styles. Start directly with your core product features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm hover:shadow-md hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
