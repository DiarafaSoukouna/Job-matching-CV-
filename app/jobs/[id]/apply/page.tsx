import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ApplyPageProps {
  params: {
    id: string
  }
}

export default function ApplyPage({ params }: ApplyPageProps) {
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
            href={`/jobs/${job.id}`}
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to job details
          </Link>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src={job.companyLogo || "/placeholder.svg"}
                  alt={job.companyName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{job.title}</h1>
                <div className="text-muted-foreground">
                  {job.companyName} • {job.location}
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Apply for this position</h2>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV</Label>
                  <div className="flex items-center gap-2">
                    <Input id="resume" type="file" className="flex-1" required />
                    <Button variant="outline" type="button">
                      Upload
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOCX, RTF (Max 5MB)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                  <Textarea id="cover-letter" rows={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
                  <Input id="portfolio" type="url" placeholder="https://yourwebsite.com" />
                </div>
                <div className="space-y-2">
                  <Label>How did you hear about this job?</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Please select</option>
                    <option value="job-board">Job Board</option>
                    <option value="company-website">Company Website</option>
                    <option value="referral">Referral</option>
                    <option value="social-media">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

