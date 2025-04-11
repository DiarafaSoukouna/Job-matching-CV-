"use client"

import type React from "react"

import { useState } from "react"
import {
  Building2,
  MapPin,
  Users,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  Edit,
  Phone,
  Mail,
  Globe,
  Trash2,
  PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CompagnyListing } from "../../types"

// Données fictives pour les entreprises
const entreprisesData: Entreprise[] = [
  {
    id: "1",
    nom: "Tech Solutions",
    secteur: "Technologie",
    adresse: "15 rue de l'Innovation, 75001 Paris",
    employes: 45,
    statut: "active",
    dateCreation: "2018-05-12",
    description:
      "Tech Solutions est une entreprise spécialisée dans le développement de solutions logicielles innovantes pour les entreprises de toutes tailles.",
    contact: {
      email: "contact@techsolutions.fr",
      telephone: "+33 1 23 45 67 89",
      site: "www.techsolutions.fr",
    },
  },
  {
    id: "2",
    nom: "Green Energy",
    secteur: "Énergie",
    adresse: "8 avenue des Champs-Élysées, 75008 Paris",
    employes: 120,
    statut: "active",
    dateCreation: "2015-11-23",
    description:
      "Green Energy est un leader dans le domaine des énergies renouvelables. Nous développons et installons des solutions énergétiques durables.",
    contact: {
      email: "info@greenenergy.fr",
      telephone: "+33 1 98 76 54 32",
      site: "www.greenenergy.fr",
    },
  },
  {
    id: "3",
    nom: "Santé Plus",
    secteur: "Santé",
    adresse: "22 boulevard Haussmann, 75009 Paris",
    employes: 78,
    statut: "inactive",
    dateCreation: "2019-03-07",
    description: "Santé Plus propose des solutions innovantes dans le domaine de la santé et du bien-être.",
    contact: {
      email: "contact@santeplus.fr",
      telephone: "+33 1 45 67 89 10",
      site: "www.santeplus.fr",
    },
  },
  {
    id: "4",
    nom: "Finance Conseil",
    secteur: "Finance",
    adresse: "5 place de la Bourse, 75002 Paris",
    employes: 35,
    statut: "active",
    dateCreation: "2020-01-15",
    description: "Finance Conseil accompagne les entreprises et les particuliers dans leurs projets financiers.",
    contact: {
      email: "info@financeconseil.fr",
      telephone: "+33 1 23 45 67 89",
      site: "www.financeconseil.fr",
    },
  },
  {
    id: "5",
    nom: "Éco Construction",
    secteur: "Construction",
    adresse: "17 rue de Rivoli, 75004 Paris",
    employes: 92,
    statut: "active",
    dateCreation: "2017-08-30",
    description: "Éco Construction est spécialisée dans la construction écologique et durable.",
    contact: {
      email: "contact@ecoconstruction.fr",
      telephone: "+33 1 34 56 78 90",
      site: "www.ecoconstruction.fr",
    },
  },
  {
    id: "6",
    nom: "Digital Marketing",
    secteur: "Marketing",
    adresse: "3 rue du Commerce, 75015 Paris",
    employes: 28,
    statut: "inactive",
    dateCreation: "2021-06-18",
    description: "Digital Marketing propose des solutions de marketing digital pour les entreprises de toutes tailles.",
    contact: {
      email: "info@digitalmarketing.fr",
      telephone: "+33 1 87 65 43 21",
      site: "www.digitalmarketing.fr",
    },
  },
]

export default function EntreprisesPage() {
  // États pour gérer les différentes vues
  const [view, setView] = useState<"list" | "details" | "add">("list")
  const [selectedEntreprise, setSelectedEntreprise] = useState<Entreprise | null>(null)

  // États pour la liste et les filtres
  const [entreprises, setEntreprises] = useState<Entreprise[]>(entreprisesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("nom")
  const [secteur, setSecteur] = useState("")
  const [statut, setStatut] = useState("")
  const [minEmployes, setMinEmployes] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // États pour le formulaire d'ajout
  const [newEntreprise, setNewEntreprise] = useState<Partial<Entreprise>>({
    nom: "",
    secteur: "",
    adresse: "",
    employes: 0,
    statut: "active",
    dateCreation: "",
    description: "",
    contact: {
      email: "",
      telephone: "",
      site: "",
    },
  })

  // Fonction pour trier les entreprises
  const handleSort = (value: string) => {
    setSortBy(value)
    const sortedEntreprises = [...entreprises]

    switch (value) {
      case "nom":
        sortedEntreprises.sort((a, b) => a.nom.localeCompare(b.nom))
        break
      case "employes":
        sortedEntreprises.sort((a, b) => b.employes - a.employes)
        break
      case "dateCreation":
        sortedEntreprises.sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime())
        break
      default:
        break
    }

    setEntreprises(sortedEntreprises)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSecteur("")
    setStatut("")
    setMinEmployes("")
    setEntreprises(entreprisesData)
  }

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filteredEntreprises = [...entreprisesData]

    if (secteur) {
      filteredEntreprises = filteredEntreprises.filter((e) => e.secteur.toLowerCase() === secteur.toLowerCase())
    }

    if (statut) {
      filteredEntreprises = filteredEntreprises.filter((e) => e.statut === statut)
    }

    if (minEmployes) {
      filteredEntreprises = filteredEntreprises.filter((e) => e.employes >= Number.parseInt(minEmployes))
    }

    if (searchTerm) {
      filteredEntreprises = filteredEntreprises.filter(
        (e) =>
          e.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.secteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.adresse.toLowerCase().includes(searchTerm.toLowerCase()),
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
        e.nom.toLowerCase().includes(term.toLowerCase()) ||
        e.secteur.toLowerCase().includes(term.toLowerCase()) ||
        e.adresse.toLowerCase().includes(term.toLowerCase()),
    )

    setEntreprises(filteredEntreprises)
  }

  // Fonction pour voir les détails d'une entreprise
  const viewEntrepriseDetails = (entreprise: Entreprise) => {
    setSelectedEntreprise(entreprise)
    setView("details")
  }

  // Fonction pour supprimer une entreprise
  const handleDelete = () => {
    setIsDeleting(true)

    // Simuler un délai de suppression
    setTimeout(() => {
      if (selectedEntreprise) {
        const updatedEntreprises = entreprises.filter((e) => e.id !== selectedEntreprise.id)
        setEntreprises(updatedEntreprises)
      }

      setIsDeleting(false)
      setOpenDialog(false)
      setView("list")
    }, 1500)
  }

  // Fonction pour gérer la soumission du formulaire d'ajout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simuler un délai d'envoi
    setTimeout(() => {
      const newId = (Number.parseInt(entreprises[entreprises.length - 1].id) + 1).toString()

      const entrepriseToAdd: Entreprise = {
        id: newId,
        nom: newEntreprise.nom || "",
        secteur: newEntreprise.secteur || "",
        adresse: newEntreprise.adresse || "",
        employes: newEntreprise.employes || 0,
        statut: newEntreprise.statut || "active",
        dateCreation: newEntreprise.dateCreation || new Date().toISOString().split("T")[0],
        description: newEntreprise.description || "",
        contact: {
          email: newEntreprise.contact?.email || "",
          telephone: newEntreprise.contact?.telephone || "",
          site: newEntreprise.contact?.site || "",
        },
      }

      setEntreprises([...entreprises, entrepriseToAdd])
      setIsSubmitting(false)
      setView("list")

      // Réinitialiser le formulaire
      setNewEntreprise({
        nom: "",
        secteur: "",
        adresse: "",
        employes: 0,
        statut: "active",
        dateCreation: "",
        description: "",
        contact: {
          email: "",
          telephone: "",
          site: "",
        },
      })
    }, 1500)
  }

  // Fonction pour mettre à jour les champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setNewEntreprise({
        ...newEntreprise,
        [parent]: {
          ...(newEntreprise[parent as keyof typeof newEntreprise] as object),
          [child]: value,
        },
      })
    } else {
      setNewEntreprise({
        ...newEntreprise,
        [name]: value,
      })
    }
  }

  // Rendu de la liste des entreprises
  const renderEntreprisesList = () => (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mes Entreprises</h1>
          <Button onClick={() => setView("add")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une entreprise
          </Button>
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
                  <Label htmlFor="statut">Statut</Label>
                  <Select value={statut} onValueChange={setStatut}>
                    <SelectTrigger id="statut">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
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
                  <SelectItem value="nom">Nom</SelectItem>
                  <SelectItem value="employes">Nombre d'employés</SelectItem>
                  <SelectItem value="dateCreation">Date de création</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {entreprises.map((entreprise) => (
              <div
                key={entreprise.id}
                className="block transition-transform hover:scale-[1.02] cursor-pointer"
                onClick={() => viewEntrepriseDetails(entreprise)}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{entreprise.nom}</h3>
                      <Badge variant={entreprise.statut === "active" ? "default" : "secondary"}>
                        {entreprise.statut === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span>{entreprise.secteur}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{entreprise.adresse}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{entreprise.employes} employés</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Créée le {new Date(entreprise.dateCreation).toLocaleDateString("fr-FR")}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Rendu des détails d'une entreprise
  const renderEntrepriseDetails = () => {
    if (!selectedEntreprise) return null

    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => setView("list")}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Retour</span>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{selectedEntreprise.nom}</h1>
          </div>

          <div className="space-y-6">
            <Tabs defaultValue="informations">
              <TabsList>
                <TabsTrigger value="informations">Informations</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="informations" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Informations générales</CardTitle>
                        <CardDescription>Détails de l'entreprise {selectedEntreprise.nom}</CardDescription>
                      </div>
                      <Badge variant={selectedEntreprise.statut === "active" ? "default" : "secondary"}>
                        {selectedEntreprise.statut === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Building2 className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Secteur d'activité</p>
                            <p className="text-muted-foreground">{selectedEntreprise.secteur}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Adresse</p>
                            <p className="text-muted-foreground">{selectedEntreprise.adresse}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Nombre d'employés</p>
                            <p className="text-muted-foreground">{selectedEntreprise.employes}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Date de création</p>
                            <p className="text-muted-foreground">
                              {new Date(selectedEntreprise.dateCreation).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Description</h3>
                      <p className="text-muted-foreground">{selectedEntreprise.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de contact</CardTitle>
                    <CardDescription>Coordonnées de l'entreprise {selectedEntreprise.nom}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">{selectedEntreprise.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Téléphone</p>
                        <p className="text-muted-foreground">{selectedEntreprise.contact.telephone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Site web</p>
                        <p className="text-muted-foreground">{selectedEntreprise.contact.site}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>

              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer la suppression</DialogTitle>
                    <DialogDescription>
                      Êtes-vous sûr de vouloir supprimer l'entreprise {selectedEntreprise.nom} ? Cette action est
                      irréversible.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>
                      Annuler
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? "Suppression..." : "Supprimer"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Rendu du formulaire d'ajout d'entreprise
  const renderAddEntrepriseForm = () => (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setView("list")}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Retour</span>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Ajouter une entreprise</h1>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'entreprise</CardTitle>
              <CardDescription>
                Veuillez remplir les informations ci-dessous pour ajouter une nouvelle entreprise.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom de l'entreprise *</Label>
                  <Input id="nom" name="nom" value={newEntreprise.nom} onChange={handleInputChange} required />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="secteur">Secteur d'activité *</Label>
                    <Select
                      value={newEntreprise.secteur}
                      onValueChange={(value) => setNewEntreprise({ ...newEntreprise, secteur: value })}
                    >
                      <SelectTrigger id="secteur">
                        <SelectValue placeholder="Sélectionner un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technologie">Technologie</SelectItem>
                        <SelectItem value="Énergie">Énergie</SelectItem>
                        <SelectItem value="Santé">Santé</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="statut">Statut *</Label>
                    <Select
                      value={newEntreprise.statut}
                      onValueChange={(value) => setNewEntreprise({ ...newEntreprise, statut: value })}
                    >
                      <SelectTrigger id="statut">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse *</Label>
                  <Textarea
                    id="adresse"
                    name="adresse"
                    value={newEntreprise.adresse}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="employes">Nombre d'employés *</Label>
                    <Input
                      id="employes"
                      name="employes"
                      type="number"
                      min="1"
                      value={newEntreprise.employes}
                      onChange={(e) =>
                        setNewEntreprise({ ...newEntreprise, employes: Number.parseInt(e.target.value) })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateCreation">Date de création *</Label>
                    <Input
                      id="dateCreation"
                      name="dateCreation"
                      type="date"
                      value={newEntreprise.dateCreation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={newEntreprise.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informations de contact</h3>

                  <div className="space-y-2">
                    <Label htmlFor="contact.email">Email</Label>
                    <Input
                      id="contact.email"
                      name="contact.email"
                      type="email"
                      value={newEntreprise.contact?.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact.telephone">Téléphone</Label>
                    <Input
                      id="contact.telephone"
                      name="contact.telephone"
                      value={newEntreprise.contact?.telephone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact.site">Site web</Label>
                    <Input
                      id="contact.site"
                      name="contact.site"
                      value={newEntreprise.contact?.site}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setView("list")}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enregistrement..." : "Enregistrer l'entreprise"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )

  // Rendu conditionnel en fonction de la vue active
  switch (view) {
    case "details":
      return renderEntrepriseDetails()
    case "add":
      return renderAddEntrepriseForm()
    default:
      return renderEntreprisesList()
  }
}

