import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

interface featuresProps {
  title: string;
  description: string;
  icon: string;
}

const features: featuresProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with hands-on projects, quizzes, and real-world assignments.",
    icon: "🧩",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn directly from professionals with years of experience in their fields.",
    icon: "👨‍🏫",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress analytics.",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-100 via-white to-purple-100 dark:bg-linear-to-br dark:from-zinc-900 dark:via-black dark:to-zinc-900" />

        {/* Blurred Glow Blobs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-destructive/10 dark:bg-destructive/10 rounded-full blur-3xl" />

        {/* HERO SECTION */}
        <section className="py-24 px-6 text-center">
          <Badge variant="outline">The Future of Online Education</Badge>

          <h1 className="mt-6 pb-4 text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-primary/75 to-primary bg-clip-text text-transparent">
            Elevuate Your Learning Experience
          </h1>

          <p className="max-w-[700px] mx-auto mt-4 text-muted-foreground md:text-xl">
            Discover a modern, interactive learning management system. Access
            high-quality courses anytime, anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>

            {/* <Link
              href="/login"
              className={`rounded-xl ${buttonVariants({
                size: "lg",
                variant: "outline",
              })}`}
            >
              Sign In
            </Link> */}
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-shadow border border-border/40 backdrop-blur-sm bg-white/70 dark:bg-black/40"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </>
  );
}
