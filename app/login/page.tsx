"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import {API_URL} from "@/api"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const login = async () => {
    if (!username || !password) {
      setError("Veuillez entrer à la fois l'email et le mot de passe")
      return
    }
    const data = new FormData()
    data.append("usernameOrEmailOrPhone", username)
    data.append("password", password)
 
    try {
      setIsLoading(true)
      setError("")

      const response = await axios.post(`${API_URL}account/login`, data)

      // const token = response.data
      // console.log("Connexion réussie ! Token sauvegardé.", token)
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/")
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log("Échec de connexion :", error.response.data.message)
        setError(error.response.data.message || "Identifiants incorrects")
      } else {
        console.error("Erreur lors de la connexion :", error.message)
        setError("Une erreur est survenue. Veuillez réessayer.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4 py-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex flex-col items-center space-y-2 p-2 rounded-lg shadow-lg" style={{ backgroundColor: '#4FA497' }}>
     
          <Link href='/'>
          <h1 className="mt-4 text-center text-xl font-extrabold tracking-tight sm:text-2xl">Bienvenue sur JobMatch</h1>
          </Link>
        </div>

        <Card className="border-muted/40 shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-1">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">Connexion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Adresse e-mail</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    className="border-input/60"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Mot de passe</span>
                    </Label>
                    <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/90">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="border-input/60"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se souvenir de moi
                  </Label>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    login()
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Ou continuez avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Se connecter avec Google</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                              fill="currentColor"
                            />
                          </svg>
                          LinkedIn
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Se connecter avec LinkedIn</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardFooter>
            </div>

            <div className="hidden md:block md:w-1/2 bg-muted/20 rounded-r-lg overflow-hidden">
              <Image
                src="/ima_job.jpg"
                alt="Illustration de connexion"
                width={500}
                height={500}
                className="object-cover w-full h-full"
                style={{ height: "100%" }}
              />
            </div>
          </div>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Vous n'avez pas de compte ?{" "}
          <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  )
}

