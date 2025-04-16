"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import {
  Loader2,
  Mail,
  Lock,
  User,
  Building,
  AlertCircle,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Globe,
  Calendar,
  FileText,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import {API_URL} from "@/api"


export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");

  // User form state
  const [userData, setUserData] = useState({
    account_type: "CANDIDATE",
    fullName: "",
    email: "",
    password: "",
    username:"",
    phone_number: "",
    address: "",
    cv_file_path: "",
  
  })

  // Company form state
  const [companyData, setCompanyData] = useState({
    account_type: "ENTREPRISE",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    create_year: "",
    about: "",
    nif: "",
    rc: "",
    contactPerson: "",
    phone_number: "",
    address: "",
    website: "",
    employeeCount: "",
    business_category_id: "",
    logo: null as File | null,

  })

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, field: string, formType: "user" | "company") => {
    if (formType === "user") {
      setUserData((prev) => ({ ...prev, [field]: value }))
    } else {
      setCompanyData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
  
    setCompanyData((prev) => ({
      ...prev,
      logo: file,
    }));
  };

  const registerUser = async () => {

    if (!userData.email || !userData.password || !userData.fullName) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    if (userData.password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }
    console.log(userData)
    try {
      setIsLoading(true)
      setError("")

      const response = await axios.post(`${API_URL}account/create`, {
        ...userData,
        userType: "individual",
      })

      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.")
      router.push('/login')

    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Échec de l'inscription")
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.")
      }
      console.error("Erreur lors de l'inscription :", error)
    } finally {
      setIsLoading(false)
    }
  }

  const registerCompany = async () => {
    if (!companyData.email || !companyData.password || !companyData.companyName) {
      setError("Veuillez remplir tous les champs obligatoires")
      return
    }

    if (companyData.password !== companyData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      setIsLoading(true)
      setError("")

      // Create FormData for file upload
      const formData = new FormData()
      Object.entries(companyData).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value as string | Blob)
        }
      })
      formData.append("userType", "company")

      // Replace with your actual API endpoint
      const response = await axios.post("https://data.mrv-mali.org/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.")
      console.log("Inscription réussie !", response.data)
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Échec de l'inscription")
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.")
      }
      console.error("Erreur lors de l'inscription :", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-8">
      <div className="w-full max-w-5xl">
        <div
          className="mb-8 flex flex-col items-center space-y-2 p-2 rounded-lg shadow-lg"
          style={{ backgroundColor: "#4FA497" }}
        >
          <Link href="/">
            <h1 className="mt-4 text-center text-xl font-extrabold tracking-tight sm:text-2xl">
              Bienvenue sur JobMatch
            </h1>
          </Link>
        </div>

        <Card className="border-muted/40 shadow-lg overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Créer un compte</CardTitle>
          </CardHeader>

          {error && (
            <div className="mx-6 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 flex items-center gap-2 rounded-md bg-green-100 p-3 text-sm text-green-800">
              <p>{success}</p>
            </div>
          )}

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mx-auto px-6 py-2">
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <User className="mr-2 h-4 w-4" />
                Utilisateur
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Building className="mr-2 h-4 w-4" />
                Entreprise
              </TabsTrigger>
            </TabsList>

            {/* User Registration Form */}
            <TabsContent value="user" className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-6">
                  <CardContent className="space-y-4 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>Nom complet*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          placeholder="Jean Dupont"
                          className="border-input/60"
                          value={userData.fullName}
                          onChange={handleUserChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>Username*</span>
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          required
                          placeholder="jeandupont23"
                          className="border-input/60"
                          value={userData.username}
                          onChange={handleUserChange}
                        />
                      </div>
                      <div className="space-y-2">
                      <Label htmlFor="logo" className="flex items-center gap-1">
                        <span>Curriculum vitae</span>
                      </Label>
                      <Input
                        id="cv_file_path"
                        name="cv_file_path"
                        type="file"
                        accept="image/*"
                        className="border-input/60"
                        value={userData.cv_file_path}
                        onChange={handleUserChange}
                      />
                    </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Adresse e-mail*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="border-input/60"
                          value={userData.email}
                          onChange={handleUserChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Mot de passe*</span>
                        </Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="border-input/60"
                          value={userData.password}
                          onChange={handleUserChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Confirmer le mot de passe*</span>
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="border-input/60"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                      </div>
                    </div>

                 

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone_number" className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          <span>Numéro de téléphone</span>
                        </Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          placeholder="+223 XX XX XX XX"
                          className="border-input/60"
                          value={userData.phone_number}
                          onChange={handleUserChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Adresse</span>
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="Votre adresse"
                          className="border-input/60"
                          value={userData.address}
                          onChange={handleUserChange}
                        />
                      </div>
                    </div>


                    <Button type="button" className="w-full" disabled={isLoading} onClick={registerUser}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        "S'inscrire"
                      )}
                    </Button>
                  </CardContent>
                </div>
              </div>
            </TabsContent>

            {/* Company Registration Form */}
            <TabsContent value="company" className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-6">
                  <CardContent className="space-y-4 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5" />
                          <span>Nom de l'entreprise*</span>
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          required
                          placeholder="Nom de votre entreprise"
                          className="border-input/60"
                          value={companyData.companyName}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyEmail" className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Adresse e-mail*</span>
                        </Label>
                        <Input
                          id="companyEmail"
                          name="email"
                          type="email"
                          required
                          placeholder="contact@entreprise.com"
                          className="border-input/60"
                          value={companyData.email}
                          onChange={handleCompanyChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyPassword" className="flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Mot de passe*</span>
                        </Label>
                        <Input
                          id="companyPassword"
                          name="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="border-input/60"
                          value={companyData.password}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyConfirmPassword" className="flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" />
                          <span>Confirmer le mot de passe*</span>
                        </Label>
                        <Input
                          id="companyConfirmPassword"
                          name="confirmPassword"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="border-input/60"
                          value={companyData.confirmPassword}
                          onChange={handleCompanyChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="create_year" className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Année de création</span>
                        </Label>
                        <Input
                          id="create_year"
                          name="create_year"
                          placeholder="2010"
                          className="border-input/60"
                          value={companyData.create_year}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business_category_id" className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span>Secteur d'activité</span>
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange(value, "business_category_id", "company")}
                          value={companyData.business_category_id}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre secteur" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technologie</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="sante">Santé</SelectItem>
                            <SelectItem value="education">Éducation</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nif" className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          <span>NIF (Numéro d'Identification Fiscale)</span>
                        </Label>
                        <Input
                          id="nif"
                          name="nif"
                          placeholder="Votre NIF"
                          className="border-input/60"
                          value={companyData.nif}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employeeCount" className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span>Nombre d'employés</span>
                        </Label>
                        <Select
                          onValueChange={(value) => handleSelectChange(value, "employeeCount", "company")}
                          value={companyData.employeeCount}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Taille de l'entreprise" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employés</SelectItem>
                            <SelectItem value="11-50">11-50 employés</SelectItem>
                            <SelectItem value="51-200">51-200 employés</SelectItem>
                            <SelectItem value="201-500">201-500 employés</SelectItem>
                            <SelectItem value="501+">Plus de 500 employés</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson" className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          <span>Personne de contact</span>
                        </Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          placeholder="Nom du responsable"
                          className="border-input/60"
                          value={companyData.contactPerson}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyPhone" className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          <span>Numéro de téléphone</span>
                        </Label>
                        <Input
                          id="companyPhone"
                          name="phone_number"
                          placeholder="+223 XX XX XX XX"
                          className="border-input/60"
                          value={companyData.phone_number}
                          onChange={handleCompanyChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress" className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Adresse</span>
                        </Label>
                        <Input
                          id="companyAddress"
                          name="address"
                          placeholder="Adresse de l'entreprise"
                          className="border-input/60"
                          value={companyData.address}
                          onChange={handleCompanyChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5" />
                          <span>Site web</span>
                        </Label>
                        <Input
                          id="website"
                          name="website"
                          placeholder="https://www.entreprise.com"
                          className="border-input/60"
                          value={companyData.website}
                          onChange={handleCompanyChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo" className="flex items-center gap-1">
                        <span>Logo de l'entreprise</span>
                      </Label>
                      <Input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        className="border-input/60"
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about" className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5" />
                        <span>about de l'entreprise</span>
                      </Label>
                      <Textarea
                        id="about"
                        name="about"
                        placeholder="Décrivez votre entreprise"
                        className="border-input/60 min-h-[100px]"
                        value={companyData.about}
                        onChange={handleCompanyChange}
                      />
                    </div>

                    <Button type="button" className="w-full" disabled={isLoading} onClick={registerCompany}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription en cours...
                        </>
                      ) : (
                        "S'inscrire"
                      )}
                    </Button>
                  </CardContent>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Ou inscrivez-vous avec</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>

              <Button variant="outline" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    fill="currentColor"
                  />
                </svg>
                LinkedIn
              </Button>
            </div>
          </CardFooter>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  )
}
