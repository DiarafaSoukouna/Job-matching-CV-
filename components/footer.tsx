import Link from "next/link"
import { Briefcase } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-bold">JobMatch</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting talent with opportunity. Find your dream job today.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">For Job Seekers</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/jobs" className="text-sm text-muted-foreground hover:text-foreground">
                Browse Jobs
              </Link>
              <Link href="/companies" className="text-sm text-muted-foreground hover:text-foreground">
                Companies
              </Link>
              <Link href="/salaries" className="text-sm text-muted-foreground hover:text-foreground">
                Salary Guide
              </Link>
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground">
                Career Resources
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">For Employers</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/employers" className="text-sm text-muted-foreground hover:text-foreground">
                Post a Job
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground">
                Hiring Solutions
              </Link>
              <Link href="/resources/employers" className="text-sm text-muted-foreground hover:text-foreground">
                Employer Resources
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Company</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground">
                Press
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-foreground">
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JobMatch. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

