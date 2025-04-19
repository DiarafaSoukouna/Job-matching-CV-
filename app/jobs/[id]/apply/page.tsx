"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { API_URL } from "@/api"
import { Progress } from "@/components/ui/progress"

interface ApplyPageProps {
  params: {
    id: string
  }
}

interface User {
  id: number
  account_type: string
  full_name: string
  username: string
  email: string
  phone_number: string
  address: string
  cv_file_path: string
  nif: string
  rc: string
  create_year: number
  about: string
  website: string
  business_category_id: number
}

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const job = jobListings.find((job) => job.id === id)

  if (!job) {
    notFound()
  }

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [matchScore, setMatchScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  //------------A efacer------------------
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      const fakeUser = {
        id: 100,
        account_type: "ADMIN",
        full_name: "Amadou Maiga",
        username: "Amadou21",
        email: "amadou@gmail.com",
        phone_number: "+22396111178",
        address: "Bamako, Mali",
        cv_file_path: "/Amadou_D_Maiga_CV.pdf",
      };

      localStorage.setItem("user", JSON.stringify(fakeUser));
      console.log("Utilisateur simulé ajouté au localStorage");
    }
  }, []);

  //--------------------------Fin-------------------------

 

  useEffect(() => {
    // Get user data from localStorage on client side
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (e) {
        setError("Failed to load user profile")
      }
    }
  }, [])

  if (!job) {
    notFound()
  }

  const handleApply = async () => {
    if (!user?.cv_file_path) {
      setError("No CV found in your profile. Please update your profile with a CV before applying.")
      return
    }
  
    setIsLoading(true)
    setError(null)
  
    try {
      // 1. Récupérer le fichier CV depuis le serveur
      const responseCv = await fetch(user.cv_file_path)
  
      if (!responseCv.ok) {
        throw new Error("Unable to fetch the CV file from the server.")
      }
  
      const cvBlob = await responseCv.blob()
      const cvFile = new File([cvBlob], "cv_from_server.pdf", { type: cvBlob.type })
  
      // 2. Créer un FormData pour le matching
      const formData = new FormData()
      formData.append("cv_file", cvFile)
      formData.append("job_description", job.description || "")
  
      // 3. Envoyer au endpoint de matching
      const response = await fetch(`${API_URL}/cv-match`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
  
      if (!response.ok) {
        throw new Error("Failed to process application")
      }
  
      const data = await response.json()
      const scoreMatch = data.message.match(/Matching score: ([\d.]+)%/)
  
      let parsedScore = 0
      if (scoreMatch && scoreMatch[1]) {
        parsedScore = parseFloat(scoreMatch[1])
        setMatchScore(parsedScore)
      } else {
        setMatchScore(0)
      }
  
      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }
  
  const getScoreColor = () => {
    if (matchScore === null) return "bg-gray-200";
    if (matchScore >= 80) return "bg-green-500";  // Vert pour score de 80 à 100
    if (matchScore >= 60) return "bg-yellow-500"; // Jaune pour score de 60 à 80
    if (matchScore >= 40) return "bg-gray-400";   // Gris pour score de 40 à 60
    if (matchScore >= 20) return "bg-red-400";    // Rouge moins critique pour score de 20 à 40
    return "bg-red-600";                          // Rouge critique pour score de 0 à 20
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href={`/jobs/${id}`}
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
            
            {/* Job Description Section */}
            <div className="mb-8 rounded-lg border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Employment Type: </span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Salary Range: </span>
                    <span className="font-medium">{job.salary}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Apply for this position</h2>
              
              {!user ? (
                <div className="p-4 border rounded-md bg-amber-50 text-amber-800 mb-6">
                  <p className="font-medium">Please sign in to apply for this job</p>
                  <p className="mt-2 text-sm">Your profile information will be used for the application</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-xl bg-gray-50 dark:bg-muted/50 p-6 border border-gray-200 dark:border-muted shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Application will be submitted with your profile
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-muted-foreground">Full Name</span>
                        <span className="font-medium text-right text-gray-800 dark:text-white">{user.full_name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-muted-foreground">Email</span>
                        <span className="text-right text-gray-700 dark:text-white">{user.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-muted-foreground">Phone</span>
                        <span className="text-right text-gray-700 dark:text-white">
                          {user.phone_number || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-muted-foreground">CV/Resume</span>
                        <span className={`text-right font-medium ${user.cv_file_path ? "text-green-600" : "text-red-500"}`}>
                          {user.cv_file_path ? "✓ Available" : "❌ Not available"}
                        </span>
                      </div>
                    </div>
                  </div>

                  
                  {!user.cv_file_path && (
                    <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
                      <p className="font-medium">CV not found in your profile</p>
                      <p className="mt-2 text-sm">Please update your profile with a CV before applying</p>
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-4 border rounded-md bg-destructive/10 text-destructive">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  {matchScore !== null && (
                    <div className="space-y-3 p-4 border rounded-md bg-background">
                      <h3 className="font-medium">CV Match Score</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Match percentage</span>
                          <span className="font-medium">{matchScore}%</span>
                        </div>
                        <div className="relative w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`absolute top-0 left-0 h-full ${getScoreColor()}`}
                            style={{ width: `${matchScore}%` }}
                          ></div>
                        </div>

                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {matchScore >= 80 
                          ? "Your profile is an excellent match for this position!" 
                          : matchScore >= 60 
                            ? "Your profile is a good match for this position." 
                            : "Your profile may not be the best match for this position."}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleApply} 
                      disabled={isLoading || !user.cv_file_path || success}
                      className="w-full"
                    >
                      {isLoading ? "Processing..." : success ? "Application Submitted" : "APPLY NOW"}
                    </Button>
                  </div>
                  
                  {success && matchScore !== null && (
                    <div className="p-4 border rounded-md bg-green-50 text-green-800 mt-4 animate-in fade-in duration-300">
                      <p className="font-medium">Application submitted successfully!</p>
                      <p className="mt-2 text-sm">
                        Your application has been received with a match score of {matchScore}%. 
                        The employer will review your application and contact you soon.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}