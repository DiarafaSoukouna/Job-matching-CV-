"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Briefcase, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<any>({})

  const router = useRouter()

  const deconnect = (): void => {
    if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      localStorage.removeItem("user")
      setIsConnected(false)
      setUser({})
      router.push("/") 
    }
  }
  useEffect(() => {
  const userJson = localStorage.getItem("user");

    const storedUser = localStorage.getItem("user")
     const ex = userJson ? JSON.parse(userJson) : null;

    if (ex) {
      setIsConnected(true)
      setUser(ex)
    } else {
      setIsConnected(false)
      setUser({})
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between p-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span className="font-bold">JobMatch</span>
                </Link>
              </div>
              <div className="mt-8 flex w-full flex-col gap-3 px-7">
                <Link href="/jobs" className="flex w-full items-center py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>Find Jobs</Link>
                <Link href="/companies" className="flex w-full items-center py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>Companies</Link>
                <Link href="/resources" className="flex w-full items-center py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>Resources</Link>
                <Link href="/login" className="flex w-full items-center py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>Log in</Link>
                <Link href="/register" className="flex w-full items-center py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>Sign up</Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="hidden font-bold sm:inline-block">JobMatch</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Jobs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md" href="/jobs">
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Browse All Jobs</div>
                          <p className="text-sm leading-tight text-white/90">Explore thousands of opportunities across industries and locations</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/jobs/remote" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Remote Jobs</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Work from anywhere in the world</p>
                      </Link>
                    </li>
                    <li>
                      <Link href="/jobs/tech" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Tech Jobs</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Software, data, design, and more</p>
                      </Link>
                    </li>
                    <li>
                      <Link href="/jobs/entry-level" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Entry-Level</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Perfect for recent graduates</p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/companies" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Companies</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Resources</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {!isConnected ? (
          <div className="flex items-center gap-2">
            <Link href="/login" className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block">Log in</Link>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/register">Sign up</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
              <Link href="/employers">For Employers</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button size="sm" className="hidden sm:inline-flex" onClick={deconnect}>Déconnexion</Button>

            {user?.account_type === "ENTREPRISE" && (
              <div className="relative w-10 h-10 overflow-hidden bg-green-100 rounded-full dark:bg-gray-600 flex items-center justify-center p-6 cursor-pointer" onClick={() => router.push(`/compagnies/${user.id}`)}>
               <h1 className="text-sm font-semibold text-gray-700 uppercase">
                    {user?.full_name?.substring(0, 2)}
                  </h1>
              </div>
            )}

              {user?.account_type === "CANDIDATE" && (
                <div
                  className="relative w-10 h-10 overflow-hidden bg-green-100 rounded-full dark:bg-gray-600 flex items-center justify-center p-6 cursor-pointer"
                  onClick={() => router.push("/profil")}
                >
                  <h1 className="text-sm font-semibold text-gray-700 uppercase">
                    {user?.full_name?.substring(0, 2)}
                  </h1>
                </div>
          )}
          </div>
        )}
      </div>
    </header>
  )
}