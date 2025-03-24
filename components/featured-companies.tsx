import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturedCompanies() {
  const companies = [
    {
      name: "Acme Inc",
      logo: "./image.png",
      slug: "acme",
      jobCount: 24,
    },
    {
      name: "Globex",
      logo: "/image.png",
      slug: "globex",
      jobCount: 18,
    },
    {
      name: "Initech",
      logo: "/image2.jpg",
      slug: "initech",
      jobCount: 15,
    },
    {
      name: "Umbrella Corp",
      logo: "/image2.jpg",
      slug: "umbrella",
      jobCount: 12,
    },
    {
      name: "Stark Industries",
      logo: "/image2.jpg",
      slug: "stark",
      jobCount: 21,
    },
    {
      name: "Wayne Enterprises",
      logo: "/image.png",
      slug: "wayne",
      jobCount: 17,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Meilleures entreprises qui recrutent</h2>
            <p className="text-muted-foreground">Découvrez des opportunités auprès de ces entreprises leaders</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/companies">Voir toutes les entreprises</Link>
          </Button>
        </div>
        <div className="mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="group flex flex-col items-center justify-center space-y-3 rounded-lg border bg-background p-6 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full transition-transform group-hover:scale-110">
                <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">{company.name}</h3>
                <p className="text-sm text-muted-foreground">{company.jobCount} emplois</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
