"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Building2, MapPin, Users, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { companyListings } from "@/data/compagnies-listings"
import type { CompagnyListing } from "@/types/company"

// Données fictives pour les entreprises
const entreprisesData = companyListings
export default function EntreprisesPage() {
  const router = useRouter()

  // États pour la liste et les filtres
  const [entreprises, setEntreprises] = useState<CompagnyListing[]>(entreprisesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [secteur, setSecteur] = useState("")
  const [minEmployes, setMinEmployes] = useState("")

  // Fonction pour trier les entreprises
  const handleSort = (value: string) => {
    setSortBy(value)
    const sortedEntreprises = [...entreprises]

    switch (value) {
      case "name":
        sortedEntreprises.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "employees":
        sortedEntreprises.sort((a, b) => b.employees - a.employees)
        break
      case "yearFounded":
        sortedEntreprises.sort((a, b) => b.yearFounded - a.yearFounded)
        break
      default:
        break
    }

    setEntreprises(sortedEntreprises)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSecteur("")
    setMinEmployes("")
    setEntreprises(entreprisesData)
  }

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filteredEntreprises = [...entreprisesData]

    if (secteur) {
      filteredEntreprises = filteredEntreprises.filter((e) => e.sector.toLowerCase() === secteur.toLowerCase())
    }

    if (minEmployes) {
      filteredEntreprises = filteredEntreprises.filter((e) => e.employees >= Number.parseInt(minEmployes))
    }

    if (searchTerm) {
      filteredEntreprises = filteredEntreprises.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setEntreprises(filteredEntreprises)
  }

  // Fonction pour rechercher
  const handleSearch = (term: string) => {
    setSearchTerm(term)

    if (!term) {
      setEntreprises(entreprisesData)
      return
    }

    const filteredEntreprises = entreprisesData.filter(
      (e) =>
        e.name.toLowerCase().includes(term.toLowerCase()) ||
        e.sector.toLowerCase().includes(term.toLowerCase()) ||
        e.address.toLowerCase().includes(term.toLowerCase()),
    )

    setEntreprises(filteredEntreprises)
  }

  // Fonction pour rediriger vers la page de détails d'une entreprise
  const navigateToCompanyDetails = (entreprise: CompagnyListing) => {
    router.push(`/compagnies/${entreprise.id}`)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mes Entreprises</h1>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une entreprise..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Affinez votre recherche d'entreprises avec les filtres ci-dessous.</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="secteur">Secteur d'activité</Label>
                  <Select value={secteur} onValueChange={setSecteur}>
                    <SelectTrigger id="secteur">
                      <SelectValue placeholder="Tous les secteurs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technologie">Technologie</SelectItem>
                      <SelectItem value="energie">Énergie</SelectItem>
                      <SelectItem value="sante">Santé</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minEmployes">Nombre minimum d'employés</Label>
                  <Select value={minEmployes} onValueChange={setMinEmployes}>
                    <SelectTrigger id="minEmployes">
                      <SelectValue placeholder="Tous" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">Plus de 10</SelectItem>
                      <SelectItem value="50">Plus de 50</SelectItem>
                      <SelectItem value="100">Plus de 100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter className="mt-6 flex-row justify-between sm:space-x-2">
                <Button variant="outline" onClick={resetFilters}>
                  Réinitialiser
                </Button>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>Appliquer les filtres</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-6">
          <div className="flex justify-end">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Trier par:</span>
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="employees">Nombre d'employés</SelectItem>
                  <SelectItem value="yearFounded">Année de création</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {entreprises.map((entreprise) => (
              <div
                key={entreprise.id}
                className="block transition-transform hover:scale-[1.02] cursor-pointer"
                onClick={() => navigateToCompanyDetails(entreprise)}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {entreprise.logo && (
                          <div className="h-8 w-8 overflow-hidden rounded-full">
                            <img
                              src={entreprise.logo || "/placeholder.svg"}
                              alt={`${entreprise.name} logo`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-semibold">{entreprise.name}</h3>
                      </div>
                      <Badge variant="outline">{entreprise.jobCount} offres</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{entreprise.sector}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{entreprise.location || entreprise.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{entreprise.employees} employés</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">Fondée en {entreprise.yearFounded}</p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
