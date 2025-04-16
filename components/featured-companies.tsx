import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {companyListings} from "@/data/compagnies-listings"


export default function FeaturedCompanies() {
  const companies = companyListings

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400">
      <div className="container px-4 md:px-6 ">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Meilleures entreprises qui recrutent</h2>
            <p className="text-muted-foreground">Découvrez des opportunités auprès de ces entreprises leaders</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/compagnies">Voir toutes les entreprises</Link>
          </Button>
        </div>
        <div className="mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/compagnies/${company.id}`}
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
