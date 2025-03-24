import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Filter, TrendingUp, Users, Building, CheckCircle } from "lucide-react"
import JobCard from "@/components/job-card"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeaturedCompanies from "@/components/featured-companies"
import JobCategories from "@/components/job-categories"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Testimonials from "@/components/testimonials"
import HowItWorks from "@/components/how-it-works"
import JobStats from "@/components/job-stats"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 py-20 md:py-24 lg:py-28">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container relative px-4 md:px-6">
          
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                 
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                    Trouvez votre job <span className="text-primary">de rêve</span> dès maintenant
                  </h2>
                 
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/jobs"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Voir toutes les offres
                  </Link>
                  <Link
                    href="/employers"
                    className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Pour les employeurs
                  </Link>
                </div>
               
              </div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-primary/10 blur-xl"></div>
                <Card className="overflow-visible shadow-xl">
                  <CardContent className="p-6">
                    <Tabs defaultValue="jobs" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="jobs">Offres d'emploi</TabsTrigger>
                        <TabsTrigger value="companies">Entreprises</TabsTrigger>
                      </TabsList>
                      <TabsContent value="jobs" className="mt-6 space-y-4">
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Nom de l'offre ou nom de l'entreprise" className="pl-9" />
                          </div>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="text" placeholder="Villes ou télétravail" className="pl-9" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ">
                              <option value="">Type d'emploi</option>
                              <option value="full-time">Temps plein</option>
                              <option value="part-time">Temps partiel</option>
                              <option value="contract">Contrat</option>
                              <option value="internship">Stage</option>
                            </select>
                            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                              <option value="">Niveau d'expérience</option>
                              <option value="entry">Débutant</option>
                              <option value="mid">Intermédiaire</option>
                              <option value="senior">Senior</option>
                              <option value="executive">Cadre supérieur</option>
                            </select>
                          </div>
                          <Button className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Rechercher des offres
                          </Button>
                        </div>
                        <div className="pt-4">
                          <p className="text-xs text-muted-foreground">Recherches populaires :</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Link href="/jobs/remote" className="text-xs text-primary hover:underline">
                              Télétravail
                            </Link>
                            <Link href="/jobs/tech" className="text-xs text-primary hover:underline">
                              Ingénieur logiciel
                            </Link>
                            <Link href="/jobs/marketing" className="text-xs text-primary hover:underline">
                              Marketing
                            </Link>
                            <Link href="/jobs/design" className="text-xs text-primary hover:underline">
                              Designer UX
                            </Link>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="companies" className="mt-6 space-y-4">
                        <div className="space-y-4">
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Nom de l'entreprise ou mot-clé" className="pl-9" />
                          </div>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input type="text" placeholder="Localisation" className="pl-9" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                              <option value="">Secteur</option>
                              <option value="tech">Technologie</option>
                              <option value="healthcare">Santé</option>
                              <option value="finance">Finance</option>
                              <option value="education">Éducation</option>
                            </select>
                            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                              <option value="">Taille de l'entreprise</option>
                              <option value="startup">Startup</option>
                              <option value="small">Small</option>
                              <option value="medium">Medium</option>
                              <option value="large">Large</option>
                            </select>
                          </div>
                            <Button className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Trouver des entreprises
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Job Stats */}
        <JobStats />

        {/* Featured Companies */}
        <FeaturedCompanies />

        {/* How It Works */}
        <HowItWorks />

        {/* Job Categories */}
        <JobCategories />

        {/* Featured Jobs */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Offres d'emplois</h2>
                <p className="text-muted-foreground">Découvrez notre sélection des meilleures offres d'emploi</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Link
                  href="/jobs"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Voir toutes les offres d'emploi
                </Link>
              </div>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobListings.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/jobs">
                  Voir toutes les offres d'emploi
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
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </section>

       

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 py-16 md:py-20 lg:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container relative flex flex-col items-center justify-center space-y-6 px-4 text-center md:px-6">
            <div className="space-y-3 md:space-y-4">
                <Badge className="inline-flex items-center rounded-full border-0 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Users className="mr-1 h-3.5 w-3.5" />
                Rejoignez des milliers de chercheurs d'emploi
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Prêt à passer à l'étape suivante ?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg lg:text-xl">
                Créez un compte pour postuler aux offres, enregistrer vos favoris et recevoir des recommandations personnalisées.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Créer un compte gratuit
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Se connecter
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                Aucune carte de crédit requise
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                Annulez à tout moment
              </div>
            </div>
          </div>
        </section>

        {/* For Employers */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex items-center rounded-full border-0 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Building className="mr-1 h-3.5 w-3.5" />
                    Pour les employeurs
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    Trouvez le candidat idéal pour votre équipe
                  </h2>
                  <p className="text-muted-foreground md:text-lg">
                    Publiez des offres, sélectionnez des candidats et planifiez des entretiens en un seul endroit. Notre plateforme rend le recrutement simple et efficace.
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Accédez à des milliers de candidats qualifiés</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Filtres avancés et algorithmes de correspondance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Profil d'entreprise personnalisé et publication d'offres</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                    <span>Outils de suivi et de gestion des candidatures</span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button asChild size="lg">
                    <Link href="/employers">
                      Publier une offre
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
                        className="ml-2 h-4 w-4"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-primary/5 blur-xl"></div>
                <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-xl">
                  <Image
                    src="/image_groupe.jpg"
                    alt="Employer dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

