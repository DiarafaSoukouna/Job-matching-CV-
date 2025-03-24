import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Building, MapPin, Clock, Calendar, Share2, Bookmark, ArrowLeft } from "lucide-react"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  const job = jobListings.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/jobs"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to jobs
          </Link>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                    <div className="flex items-center text-muted-foreground">
                      <Building className="mr-1 h-4 w-4" />
                      <Link href={`/companies/${job.companySlug}`} className="hover:underline">
                        {job.companyName}
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="h-4 w-4" />
                      <span className="sr-only">Save</span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Job Description</h2>
                  <p className="text-muted-foreground">{job.description}</p>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies
                    lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Responsibilities</h2>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>Design, develop, and maintain high-quality software applications</li>
                    <li>Collaborate with cross-functional teams to define and implement new features</li>
                    <li>Write clean, efficient, and maintainable code</li>
                    <li>Perform code reviews and provide constructive feedback to other developers</li>
                    <li>Troubleshoot and fix bugs and performance issues</li>
                    <li>Stay up-to-date with emerging trends and technologies</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Requirements</h2>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>Bachelor's degree in Computer Science or related field</li>
                    <li>3+ years of experience in software development</li>
                    <li>Proficiency in relevant programming languages and frameworks</li>
                    <li>Strong problem-solving skills and attention to detail</li>
                    <li>Excellent communication and teamwork abilities</li>
                    <li>Experience with agile development methodologies</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Benefits</h2>
                  <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li>Competitive salary and equity package</li>
                    <li>Health, dental, and vision insurance</li>
                    <li>401(k) with company match</li>
                    <li>Flexible work hours and remote work options</li>
                    <li>Professional development budget</li>
                    <li>Paid time off and parental leave</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded">
                    <Image
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.companyName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{job.companyName}</h2>
                    <Link href={`/companies/${job.companySlug}`} className="text-sm text-primary hover:underline">
                      View company profile
                    </Link>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Salary</div>
                    <div className="text-lg font-semibold">{job.salary}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div>{job.location}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Employment Type</div>
                    <div>{job.type}</div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <Button asChild className="w-full">
                    <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Save Job
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="font-semibold">Similar Jobs</h3>
                <div className="mt-4 space-y-4">
                  {jobListings
                    .filter((j) => j.id !== job.id && j.tags.some((tag) => job.tags.includes(tag)))
                    .slice(0, 3)
                    .map((similarJob) => (
                      <div key={similarJob.id} className="space-y-1">
                        <h4 className="font-medium">
                          <Link href={`/jobs/${similarJob.id}`} className="hover:underline">
                            {similarJob.title}
                          </Link>
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          {similarJob.companyName} • {similarJob.location}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

