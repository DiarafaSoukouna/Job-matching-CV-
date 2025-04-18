"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Award, Calendar, Mail, Phone, User, FileText, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { API_URL } from "@/api"
import { useRouter } from "next/navigation"


interface Applicant {
  id: number
  name: string
  email: string
  phone: string
  score: number
  resumeUrl: string
  appliedDate: string
  status: "pending" | "reviewed" | "interviewed" | "accepted" | "rejected"
  skills: string[]
  experience: number
}

export default function ApplicantsPage() {
  const { id } = useParams()
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [jobDetails, setJobDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
    const router = useRouter()

  // Simulated data fetch - in a real app, you would fetch from your API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // In a real app, replace with actual API call
        // const response = await axios.get(`${API_URL}job/${id}/applicants`)

        // Simulated job data
        const jobResponse = await axios.get(`${API_URL}job/all`)
        const job = jobResponse.data.find((j: any) => j.id === Number(id))
        setJobDetails(job)

        // Simulated applicants data
        const mockApplicants: Applicant[] = [
          {
            id: 1,
            name: "Sophie Martin",
            email: "sophie.martin@example.com",
            phone: "+223 76 45 12 89",
            score: 92,
            resumeUrl: "/resumes/sophie-martin.pdf",
            appliedDate: "2023-04-15",
            status: "interviewed",
            skills: ["React", "TypeScript", "Node.js"],
            experience: 4,
            
          },
          {
            id: 2,
            name: "Amadou Diallo",
            email: "amadou.diallo@example.com",
            phone: "+223 65 78 23 41",
            score: 87,
            resumeUrl: "/resumes/amadou-diallo.pdf",
            appliedDate: "2023-04-12",
            status: "reviewed",
            skills: ["JavaScript", "CSS", "HTML"],
            experience: 2,
            
          },
          {
            id: 3,
            name: "Fatou Keita",
            email: "fatou.keita@example.com",
            phone: "+223 77 89 34 56",
            score: 95,
            resumeUrl: "/resumes/fatou-keita.pdf",
            appliedDate: "2023-04-10",
            status: "accepted",
            skills: ["React", "Next.js", "UI/UX"],
            experience: 5,
            
          },
          {
            id: 4,
            name: "Ibrahim Touré",
            email: "ibrahim.toure@example.com",
            phone: "+223 66 12 45 78",
            score: 78,
            resumeUrl: "/resumes/ibrahim-toure.pdf",
            appliedDate: "2023-04-18",
            status: "pending",
            skills: ["JavaScript", "React", "MongoDB"],
            experience: 1,
            
          },
          {
            id: 5,
            name: "Aminata Coulibaly",
            email: "aminata.coulibaly@example.com",
            phone: "+223 79 56 23 87",
            score: 89,
            resumeUrl: "/resumes/aminata-coulibaly.pdf",
            appliedDate: "2023-04-14",
            status: "interviewed",
            skills: ["Python", "Django", "SQL"],
            experience: 3,
            
          },
        ]

        setApplicants(mockApplicants)
      } catch (error) {
        console.error("Erreur lors de la récupération des candidats :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

 

  

  if (loading) {
    return (
      <div className="container mx-auto flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-lg text-muted-foreground">Chargement des candidats...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-12">
      {/* Header */}
      <div className="bg-muted/50 border-b">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
               onClick={()=> router.back()} >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Retour à l'offre
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Candidats pour {jobDetails?.title || "l'offre"}</h1>
              <p className="text-muted-foreground mt-1">
                {applicants.length} candidat{applicants.length > 1 ? "s" : ""} postulant
                {applicants.length > 1 ? "s" : ""}
              </p>
            </div>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Liste des candidats ({applicants.length})</h2>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Trier par:</span>
            <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
              <option value="score">Score (décroissant)</option>
              <option value="date">Date de candidature</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ApplicantCard({ applicant }: { applicant: Applicant }) {
  const scoreColor =
    applicant.score >= 90
      ? "bg-green-500"
      : applicant.score >= 80
        ? "bg-emerald-500"
        : applicant.score >= 70
          ? "bg-yellow-500"
          : applicant.score >= 60
            ? "bg-orange-500"
            : "bg-red-500"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 relative">
        <div className="absolute right-6 top-6">
          <div
            className={`flex items-center justify-center h-16 w-16 rounded-full ${scoreColor} text-white font-bold text-xl shadow-lg transition-transform hover:scale-105`}
          >
            {applicant.score}
          </div>
        </div>
        <div className="flex items-center gap-4">
         
          <div>
            <CardTitle className="text-xl">{applicant.name}</CardTitle>
            
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${applicant.email}`} className="text-sm hover:underline">
              {applicant.email}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{applicant.phone}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Postulé le {new Date(applicant.appliedDate).toLocaleDateString("fr-FR")}</span>
          </div>
        
          <div className="pt-2">
            <p className="text-sm font-medium mb-2">Compétences</p>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-muted">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" size="sm" className="gap-1">
          <FileText className="h-4 w-4" />
          CV
        </Button>
       
      </CardFooter>
    </Card>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "reviewed":
      return "bg-blue-100 text-blue-800"
    case "interviewed":
      return "bg-purple-100 text-purple-800"
    case "accepted":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
