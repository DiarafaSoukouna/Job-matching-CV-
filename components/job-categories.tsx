import Link from "next/link"
import { Code, LineChart, Briefcase, Lightbulb, HeartPulse, ShoppingBag, Truck, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function JobCategories() {
  const categories = [
    {
      name: "Technology",
      icon: <Code className="h-6 w-6" />,
      count: 1243,
      slug: "technology",
      color: "bg-blue-50 text-blue-500",
    },
    {
      name: "Finance",
      icon: <LineChart className="h-6 w-6" />,
      count: 857,
      slug: "finance",
      color: "bg-green-50 text-green-500",
    },
    {
      name: "Business",
      icon: <Briefcase className="h-6 w-6" />,
      count: 945,
      slug: "business",
      color: "bg-purple-50 text-purple-500",
    },
    {
      name: "Marketing",
      icon: <Lightbulb className="h-6 w-6" />,
      count: 678,
      slug: "marketing",
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      name: "Healthcare",
      icon: <HeartPulse className="h-6 w-6" />,
      count: 531,
      slug: "healthcare",
      color: "bg-red-50 text-red-500",
    },
    {
      name: "Retail",
      icon: <ShoppingBag className="h-6 w-6" />,
      count: 423,
      slug: "retail",
      color: "bg-orange-50 text-orange-500",
    },
    {
      name: "Manufacturing",
      icon: <Wrench className="h-6 w-6" />,
      count: 367,
      slug: "manufacturing",
      color: "bg-slate-50 text-slate-500",
    },
    {
      name: "Logistics",
      icon: <Truck className="h-6 w-6" />,
      count: 298,
      slug: "logistics",
      color: "bg-indigo-50 text-indigo-500",
    },
  ]

  return (
    <section className="bg-muted/50 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground">Explore job opportunities across different industries</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/categories">All Categories</Link>
          </Button>
        </div>
        <div className="mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/jobs/categories/${category.slug}`}
              className="group flex items-center space-x-4 rounded-lg border bg-background p-4 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color}`}>
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium group-hover:text-primary">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} jobs</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

