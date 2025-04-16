import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Building2, Calendar, Globe, Mail, MapPin, Phone } from "lucide-react"
import { companyListings } from "@/data/compagnies-listings"
import type { JobListing } from "@/types/job"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  if (!params) return <div className="container mx-auto p-8 text-center">Chargement...</div>

  const company = companyListings.find((company) => company.id === params.id)

  if (!company) return notFound()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-12">
      {/* Hero Section with Company Banner */}
      <div className="relative h-60 w-full bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400"></div>
        <div className="container relative mx-auto flex h-full items-end px-4">
          <div className="mb-[-64px] flex items-end space-x-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-xl border-4 border-background bg-background shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src={company.logo || "/placeholder.svg?height=128&width=128"}
                alt={`${company.name} Logo`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-20">
        {/* Company Header */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{company.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {company.sector}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Fondée en {company.yearFounded}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {company.location}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link href={company.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Site web
                </Link>
              </Button>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Contacter
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - About */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <CardTitle>À propos de {company.name}</CardTitle>
                <CardDescription>Découvrez cette entreprise</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-pretty leading-relaxed text-muted-foreground">{company.description}</p>

                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-semibold">Offres d'emploi disponibles</h3>
                  {company.jobCount > 0 ? (
                    <div className="space-y-4">
                      {company.jobListings?.slice(0, 3).map((job: JobListing) => (
                        <Card key={job.id} className="overflow-hidden transition-all hover:shadow-md">
                          <CardContent className="p-4">
                            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                              <div>
                                <h4 className="font-semibold">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {job.location} • {job.type}
                                </p>
                              </div>
                              <Badge className="w-fit">{job.salary}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {company.jobCount > 3 && (
                        <Button variant="outline" className="w-full">
                          Voir toutes les offres ({company.jobCount})
                        </Button>
                      )}
                    </div>
                  ) : (
                    <p className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
                      Aucune offre d'emploi disponible pour cette compagnie.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact & Social */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Informations de contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">{company.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${company.email}`} className="text-sm text-primary hover:underline">
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">{company.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="mr-3 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Site web</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={company.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                      Twitter
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Offres d'emploi</p>
                    <p className="text-2xl font-bold text-primary">{company.jobCount}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Années d'activité</p>
                    <p className="text-2xl font-bold text-primary">{new Date().getFullYear() - company.yearFounded}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

