import { Search, FileText, CheckCircle } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Rechercher des offres",
      description: "Parcourez des milliers d'offres dans divers secteurs et lieux.",
      icon: <Search className="h-10 w-10" />,
    },
    {
      id: 2,
      title: "Postulez facilement",
      description: "Soumettez votre candidature en quelques clics avec votre profil JobMatch.",
      icon: <FileText className="h-10 w-10" />,
    },
    {
      id: 3,
      title: "Obtenez le poste",
      description: "Passez des entretiens avec les meilleures entreprises et décrochez l'emploi de vos rêves.",
      icon: <CheckCircle className="h-10 w-10" />,
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Comment ça marche ?</h2>
        
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl font-bold">
                {step.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
