"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building,
  Calendar,
  Edit,
  FileText,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Shield,
  Briefcase,
  ChevronRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Données fictives pour l'exemple
  const [userData, setUserData] = useState({
    full_name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    username: "thomasdubois",
    phone_number: "+33 6 12 34 56 78",
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    cv_file_path: "/uploads/cv_thomas_dubois.pdf",
    bio: "Développeur web passionné avec 5 ans d'expérience en React et Next.js. À la recherche de nouvelles opportunités dans le secteur de la tech.",
  })

  // Données fictives pour l'historique des candidatures
  const jobApplications = [
    {
      id: 1,
      company: "TechVision",
      position: "Développeur Frontend Senior",
      location: "Paris",
      type: "Temps plein",
      date: "15/04/2025",
      status: "En attente",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      company: "InnoSoft",
      position: "Ingénieur Fullstack",
      location: "Lyon",
      type: "Télétravail",
      date: "10/04/2025",
      status: "Entretien",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      company: "DataFlow",
      position: "Développeur React",
      location: "Bordeaux",
      type: "Temps plein",
      date: "05/04/2025",
      status: "Refusé",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      company: "WebSolutions",
      position: "Développeur Frontend",
      location: "Marseille",
      type: "Temps partiel",
      date: "01/04/2025",
      status: "Accepté",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleSaveProfile = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les modifications
    setIsEditing(false)
  }

  const getStatusColor = (status : string) => {
    switch (status) {
      case "En attente":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Entretien":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Refusé":
        return "bg-red-100 text-red-800 border-red-200"
      case "Accepté":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusProgress = (status : string) => {
    switch (status) {
      case "En attente":
        return 25
      case "Entretien":
        return 50
      case "Refusé":
        return 100
      case "Accepté":
        return 100
      default:
        return 0
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400 py-12 md:py-16 min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Formes décoratives */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-teal-500 opacity-20 blur-3xl"></div>

      <div className="container relative px-4 md:px-6 mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-teal-600">
            Mon Profil
          </h1>
          <p className="text-teal-800/70 mt-2 max-w-2xl mx-auto md:mx-0">
            Gérez vos informations personnelles et suivez vos candidatures
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Carte de profil */}
          <Card className="shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm h-fit">
            <div className="h-32 bg-gradient-to-r from-teal-400 to-teal-600 relative">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt={userData.full_name} />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                    {userData.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardHeader className="text-center pt-20 pb-4">
              <CardTitle className="text-2xl font-bold">{userData.full_name}</CardTitle>
              <CardDescription className="text-teal-600">@{userData.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 bg-teal-50/50 p-4 rounded-xl">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Mail className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">{userData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">{userData.phone_number}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-teal-100 p-2 rounded-full mt-0.5">
                    <MapPin className="h-4 w-4 text-teal-600" />
                  </div>
                  <span className="text-gray-700">{userData.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-teal-600" />
                  </div>
                  <Link
                    href={userData.cv_file_path}
                    className="text-teal-600 hover:text-teal-800 font-medium hover:underline"
                  >
                    Voir mon CV
                  </Link>
                </div>
              </div>
              <Separator className="bg-teal-100" />
              <div className="pt-2">
                <h3 className="text-sm font-medium text-teal-700 mb-2">À propos de moi</h3>
                <p className="text-sm text-gray-700 bg-teal-50/50 p-4 rounded-xl italic">{userData.bio}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-teal-200 hover:bg-teal-50 text-teal-700 hover:text-teal-800 transition-all"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Modifier mon profil
              </Button>
            </CardFooter>
          </Card>

          {/* Onglets */}
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-teal-100/50 p-1">
              <TabsTrigger
                value="applications"
                className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-md"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Mes candidatures
              </TabsTrigger>
              <TabsTrigger
                value="edit-profile"
                className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-md"
              >
                <User className="mr-2 h-4 w-4" />
                Éditer mon profil
              </TabsTrigger>
            </TabsList>

            {/* Onglet Candidatures */}
            <TabsContent value="applications" className="mt-6 space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
                  <CardTitle className="text-teal-800 flex items-center">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Historique des candidatures
                  </CardTitle>
                  <CardDescription>Suivez l'état de vos candidatures récentes</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {jobApplications.map((job) => (
                      <div
                        key={job.id}
                        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-teal-200 bg-white hover:bg-teal-50/50 transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center overflow-hidden">
                            <img
                              src={job.logo || "/placeholder.svg?height=48&width=48"}
                              alt={job.company}
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex-grow space-y-2">
                          <h3 className="font-medium text-gray-900">{job.position}</h3>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Building className="mr-1 h-3 w-3" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {job.date}
                            </div>
                          </div>
                          <div className="pt-1">
                            <Progress
                              value={getStatusProgress(job.status)}
                              className="h-1.5 bg-gray-100"
                              indicatorClassName = {
                                job.status === "Accepté"
                                  ? "bg-emerald-500"
                                  : job.status === "Refusé"
                                    ? "bg-red-500"
                                    : job.status === "Entretien"
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(job.status)} px-3 py-1 text-xs font-medium`}
                          >
                            {job.status}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-full h-8 w-8 p-0 text-teal-600 hover:text-teal-800 hover:bg-teal-100"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Détails</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
                  <CardTitle className="text-teal-800">Statistiques</CardTitle>
                  <CardDescription>Aperçu de votre activité de recherche d'emploi</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl text-center border border-teal-200 shadow-sm">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Briefcase className="h-6 w-6 text-teal-600" />
                      </div>
                      <p className="text-3xl font-bold text-teal-800">{jobApplications.length}</p>
                      <p className="text-sm text-teal-600 font-medium">Candidatures</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl text-center border border-amber-200 shadow-sm">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Calendar className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-3xl font-bold text-amber-800">
                        {jobApplications.filter((j) => j.status === "En attente").length}
                      </p>
                      <p className="text-sm text-amber-600 font-medium">En attente</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border border-blue-200 shadow-sm">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-800">
                        {jobApplications.filter((j) => j.status === "Entretien").length}
                      </p>
                      <p className="text-sm text-blue-600 font-medium">Entretiens</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl text-center border border-emerald-200 shadow-sm">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <FileText className="h-6 w-6 text-emerald-600" />
                      </div>
                      <p className="text-3xl font-bold text-emerald-800">
                        {jobApplications.filter((j) => j.status === "Accepté").length}
                      </p>
                      <p className="text-sm text-emerald-600 font-medium">Acceptées</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Édition du profil */}
            <TabsContent value="edit-profile" className="mt-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
                  <CardTitle className="text-teal-800 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>Mettez à jour vos informations de profil</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="full_name" className="text-gray-700">
                          Nom complet
                        </Label>
                        <Input
                          id="full_name"
                          value={userData.full_name}
                          onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-700">
                          Nom d'utilisateur
                        </Label>
                        <Input
                          id="username"
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          value={userData.phone_number}
                          onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-gray-700">
                          Adresse
                        </Label>
                        <Input
                          id="address"
                          value={userData.address}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio" className="text-gray-700">
                          Biographie
                        </Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={userData.bio}
                          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200 min-h-[120px]"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="cv" className="text-gray-700">
                          CV
                        </Label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Input
                            id="cv"
                            type="file"
                            className="border-gray-200 focus:border-teal-300 focus:ring-teal-200 file:bg-teal-50 file:text-teal-700 file:border-teal-100 hover:file:bg-teal-100 file:transition-colors"
                          />
                          {userData.cv_file_path && (
                            <Link
                              href={userData.cv_file_path}
                              className="text-teal-600 hover:text-teal-800 hover:underline text-sm flex items-center"
                            >
                              <FileText className="mr-1 h-4 w-4" />
                              CV actuel
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="border-gray-200 hover:bg-gray-50 text-gray-700"
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden mt-6">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 border-b border-teal-100">
                  <CardTitle className="text-teal-800 flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Sécurité
                  </CardTitle>
                  <CardDescription>Mettez à jour votre mot de passe</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current_password" className="text-gray-700">
                          Mot de passe actuel
                        </Label>
                        <Input
                          id="current_password"
                          type="password"
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new_password" className="text-gray-700">
                          Nouveau mot de passe
                        </Label>
                        <Input
                          id="new_password"
                          type="password"
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm_password" className="text-gray-700">
                          Confirmer le mot de passe
                        </Label>
                        <Input
                          id="confirm_password"
                          type="password"
                          className="border-gray-200 focus:border-teal-300 focus:ring-teal-200"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
                        Mettre à jour le mot de passe
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
