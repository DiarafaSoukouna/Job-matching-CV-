"use client"

import Link from "next/link"
import { Edit, FileText, Mail, MapPin, Phone, Save, User, Shield, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import {API_URL} from "@/api"
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  // Données fictives pour l'exemple
  const [userData, setUserData] = useState<any>({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    bio: "",
    cv_file_path: ""
  })
  

  const handleSaveProfile = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les modifications
    setIsEditing(false)
  }
useEffect(() => {
  const localiD = localStorage.getItem('user')
  const ex = localiD ? JSON.parse(localiD) : null;

  const fecthData = async () => {
    try {
      const response = await axios.get(`${API_URL}account/all`)
      const data =  response.data.filter((user: any) => user.id === ex.id)[0]
      setUserData(data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  fecthData()
})
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-100 via-teal-200 to-teal-400 py-12 md:py-16 min-h-screen">
       <div
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2 p-6"
               onClick={()=> router.back()} >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Retour
              </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
     

      {/* Formes décoratives */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-teal-300 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-teal-500 opacity-20 blur-3xl"></div>

      <div className="container relative px-4 md:px-6 mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-teal-600">
            Mon profil
          </h1>
          <p className="text-teal-800/70 mt-2 max-w-2xl mx-auto md:mx-0">Gérez vos informations personnelles</p>
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
                     }
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
              <Separator className="bg-teal-100" />
             
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

          {/* Section Édition du profil */}
          <div className="w-full">
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

            
          </div>
        </div>
      </div>
    </section>
  )
}
