import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, MapPin, Clock, Building, Star } from "lucide-react"
import type { JobListing } from "@/types/job"

interface JobCardProps {
  job: JobListing
  featured?: boolean
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  return (
    <Card
      className={`group overflow-hidden transition-all hover:border-primary/20 hover:shadow-md ${featured ? "border-primary/50 bg-primary/5" : ""}`}
    >
      <CardContent className="p-0">
        <div className="p-6">
          {featured && (
            <div className="mb-3 flex items-center">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                <Star className="mr-1 h-3 w-3 fill-current" /> Featured
              </Badge>
            </div>
          )}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="relative h-12 w-12 overflow-hidden rounded transition-transform group-hover:scale-110">
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.companyName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold leading-none group-hover:text-primary">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                  <Building className="mr-1 h-3 w-3" />
                  <Link href={`/companies/${job.companySlug}`} className="hover:underline">
                    {job.companyName}
                  </Link>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Save job</span>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {job.location}
            </div>
            <div className="flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {job.type}
            </div>
          </div>
          <div className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
        <div className="text-sm font-medium">{job.salary}</div>
        <Button asChild size="sm" className="transition-transform group-hover:scale-105">
          <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

