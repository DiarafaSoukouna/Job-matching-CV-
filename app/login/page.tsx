"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase } from "lucide-react"
import { useState } from "react"
import axios from 'axios';
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const response = await axios.post('https://data.mrv-mali.org/api/auth/login', {
        username,
        password,
      });
  
      const token = response.data.token;
      console.log('Connexion réussie ! Token sauvegardé.',token );
       
      
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log('Échec de connexion :', error.response.data.message);
        alert(error.response.data.message || 'Identifiants incorrects');
      } else {
        console.error('Erreur lors de la connexion :', error.message);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">JobMatch</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-2">
                <Input 
                    id="email" 
                    name="email" 
                    type="text" 
                    autoComplete="email" 
                    required 
                    className="block w-full" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-primary hover:text-primary/90">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="ml-2 text-sm">
                  Remember me
                </Label>
              </div>

              <div>
              <Button 
                  type="button" 
                  className="w-full" 
                  onClick={(e) => {
                    e.preventDefault();
                    login();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
