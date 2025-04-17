'use client'
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { jobListings } from "@/data/job-listings"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchCategories, addJobs} from "@/api"

export default function PostJob() {
    const [categories, setCategories] = useState([])
    const [job, setJob] = useState('')
    const [category, setCategory] = useState('')
    const [contrat, setContrat] = useState('')
    const [description, setDescription] = useState('')
    const getContact = async () => {
        try {
            const response  = await fetchCategories()
             console.log('response cat',response)
             setCategories(response)
        }
        catch (error) {
            console.error("Error fetching contacts:", error)
        }
       
    }
    const postJob = async () => {
        const data = {
            title: job,
            category_id: category,
            contract_type: 'Full-Time',
            description: description,
        }
        try {
            const response  = await addJobs(data)
             console.log('response cat',response)
        }
        catch (error) {
            console.error("Error to adding contacts:", error)
        }
       
    }
    useEffect(() => {
        getContact()

    }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex items-center space-x-4">
            
            </div>
            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">Créer un job </h2>
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault()
                postJob()
              }}>
      
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Nom du job </Label>
                    <Input id="first-name" onChange={(e) => setJob(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg font-medium text-gray-700">Categories</Label>
                    <select
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        id="category"
                        className="w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-800"
                    >
                        {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Contrat" className="text-lg font-medium text-gray-700">Contrat</Label>
                    <select
                        name="contrat"
                        onChange={(e) => setContrat(e.target.value)}
                        id="contrat"
                        className="w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-800"
                    >
                    <option value="">Type d'emploi</option>
                        <option value="full-time">Temps plein</option>
                        <option value="part-time">Temps partiel</option>
                        <option value="contract">Contrat</option>
                        <option value="internship">Stage</option>                     
                    </select>
                </div>
          
                <div className="space-y-2">
                  <Label htmlFor="cover-letter">Description ( Mettez toutes les informations )</Label>
                  <Textarea onChange={(e) => setDescription(e.target.value)} id="cover-letter" rows={10} />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Créer le job
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

