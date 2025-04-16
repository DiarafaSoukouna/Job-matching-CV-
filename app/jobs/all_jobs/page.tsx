"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, SlidersHorizontal, X } from "lucide-react"
import JobCard from "@/components/job-card"
import { Badge } from "@/components/ui/badge"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"


export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filtrer les jobs en fonction des critères de recherche
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !location || job.location.includes(location)
    const matchesType = !jobType || job.type === jobType

    return matchesSearch && matchesLocation && matchesType
  })

  // Ajouter un filtre actif
  const addFilter = (type: string, value: string) => {
    const newFilter = `${type}:${value}`
    setActiveFilters((prev) => (value && !prev.includes(newFilter) ? [...prev, newFilter] : prev))
  }

  // Supprimer un filtre actif
  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))

    // Réinitialiser les états correspondants
    if (filter.startsWith("location:")) setLocation("")
    if (filter.startsWith("type:")) setJobType("")
  }

  // Appliquer les filtres
  const applyFilters = () => {
    if (location) addFilter("location", location)
    if (jobType) addFilter("type", jobType)
  }

  // Effacer tous les filtres
  const clearAllFilters = () => {
    setActiveFilters([])
    setLocation("")
    setJobType("")
  }

  return (
    <div className="flex min-h-screen flex-col p-2">
       <Header />
      <h1 className="text-3xl font-bold mb-6">Trouvez votre prochain emploi</h1>

      {/* Barre de recherche principale */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher par titre, entreprise ou mot-clé..."
          className="pl-10 h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtres */}
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Lieu" className="pl-10" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="w-full">
            <div className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Type d'emploi" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Temps plein">Temps plein</SelectItem>
            <SelectItem value="Temps partiel">Temps partiel</SelectItem>
            <SelectItem value="Freelance">Freelance</SelectItem>
            <SelectItem value="Télétravail">Télétravail</SelectItem>
            <SelectItem value="Stage">Stage</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          {activeFilters.length > 0 && (
            <Button variant="outline" onClick={clearAllFilters}>
              Effacer
            </Button>
          )}
        </div>
      </div>

      {/* Filtres actifs */}
      {activeFilters.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(":")
            return (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {type === "location" ? "Lieu: " : "Type: "}
                {value}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Supprimer le filtre</span>
                </Button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Onglets et résultats */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tous les emplois ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="featured">
            Emplois mis en avant ({filteredJobs.filter((job) => job.featured).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} featured={job.featured} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">Aucun emploi trouvé</h3>
                <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.filter((job) => job.featured).length > 0 ? (
              filteredJobs
                .filter((job) => job.featured)
                .map((job) => <JobCard key={job.id} job={job} featured={true} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium mb-2">Aucun emploi mis en avant trouvé</h3>
                <p className="text-muted-foreground">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}