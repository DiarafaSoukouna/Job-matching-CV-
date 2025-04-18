"use client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Building2, Calendar, Globe, Mail, MapPin, Phone, ArrowLeft , Plus} from "lucide-react"
// import { companyListings } from "@/data/compagnies-listings"
import type { JobListing } from "@/types/job"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDataCompagny } from "@/data/compagnies-listings"
import { useState, useEffect } from "react"
import { use } from 'react'
import axios from "axios"
import { API_URL } from "@/api"
import { useRouter } from "next/navigation"


interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const { id } = use(params);
  const router = useRouter()
  const [businessCategories, setBusinessCategories] = useState<any[]>([])
  const [jobListings, setJobListings] = useState<any>({})
  const [account, setAccount] = useState(false)

  if (!id) return <div className="container mx-auto p-8 text-center">Chargement...</div>

const getDataJob= async () => {
  try{
    const response = await axios.get(`${API_URL}job/all`);
    const filtered = response.data.filter((job: any) => job.account_id === Number(id));
    setJobListings(filtered);
  }
  catch (error) {
    console.error("Erreur lors de la récupération des offres d'emploi :", error)
  }
}
  const dataFetchBussiness = async () => {
    try{
      const response = await axios.get(`${API_URL}businessCategory/all`);
      setBusinessCategories(response.data);

    }
    catch (error) {
      console.error("Erreur lors de la récupération des catégories d'entreprises :", error)
    }
  }

  const business = (id: any) => {
    const found = businessCategories.find(element => element.id === id)
    return found ? found.name : "Inconnu"
  }
  const [compagnies, setCompanies] = useState<any>('')

const Liste_Image = [
  {
    id:3,
    image: "/orange.png",
  },
  {
    id:4,
    image: "/total.svg",
  },
  {
    id:5,
    image: "/bankofafrica.png",
  },
  {
    id:7,
    image: "/sotelma.webp",
  },
  {
    id:8,
    image: "/africab.jpeg",
  }
]

const fetchData = async () => {
  const data = await getDataCompagny()
  
  data.map((company : any) => {
    const image = Liste_Image.find((img) => img.id === company.id) 
    if (image) {
      company.logo = image.image
    } else {
      company.logo = "/placeholder.svg"
    }
    return company
  },)
  const filteredCompanies = data.filter((company : any) => company.id === Number(id))[0]
  console.log("Filtered companies:", filteredCompanies)
  setCompanies(filteredCompanies)
  // console.log("Filtered companies:", filteredCompanies)
}
useEffect(() => {
  fetchData()
  dataFetchBussiness()
  getDataJob()
  const userJson = localStorage.getItem("user");
     const ex = userJson ? JSON.parse(userJson) : null;
     if (ex.id === Number(id)){
       setAccount(true)

     }
}, [])

  const company = compagnies

  if (!company) return <div className="container mx-auto p-8 text-center">Chargement...</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-12">
      {/* Hero Section with Company Banner */}
      <div className="relative h-60 w-full bg-muted">
      
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400">
        <div
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 p-6"
               onClick={()=> router.back()} >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Retour
              </div>
        </div>
        
        <div className="container relative mx-auto flex h-full items-end px-4">
          <div className="mb-[-64px] flex items-end space-x-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-xl border-4 border-background bg-background shadow-xl transition-transform duration-300 hover:scale-105">
              <Image
                src={company.logo || "/placeholder.svg?height=128&width=128"}
                alt={`${company.full_name} Logo`}
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
                  {business(company.business_category_id)}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  Fondée en {company.create_year}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {company.address}
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
              {account && (
                <Button onClick={() => router.push(`./create_job`)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une offre
              </Button>
              )

              }
              {!account && (
               <Button>
               <Mail className="mr-2 h-4 w-4" />
               Contacter
             </Button>
              )

              }

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
                <p className="text-pretty leading-relaxed text-muted-foreground">Depuis sa création en {company.create_year}, cette entreprise s’est imposée comme un acteur 
                  incontournable dans son secteur. Engagée pour l’innovation et la satisfaction de ses clients, elle développe des solutions durables et adaptées aux 
                  besoins actuels du marché. Forte d’une équipe passionnée et multidisciplinaire, elle œuvre chaque jour à améliorer la vie quotidienne de ses utilisateurs
                   tout en contribuant activement au développement économique local.</p>

                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-semibold">Offres d'emploi disponibles</h3>
                  {jobListings.length > 0 ? (
                    <div className="space-y-4" >
                      {jobListings?.slice(0, 3).map((job: JobListing) => (
                        <Card key={job.id} className="overflow-hidden transition-all hover:shadow-md" onClick={()=> router.push(`./jobs_apply/${jobListings.id}`)}>
                          <CardContent className="p-4">
                            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                              <div>
                                <h4 className="font-semibold">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {job.description.split(" ").slice(0, 30).join(" ")}...
                                </p>
                              </div>
                              <Badge className="w-fit" style={{minWidth : 80}}>{job.contract_type}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                     
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
            
          </div>
        </div>
      </div>
    </div>
  )
}

