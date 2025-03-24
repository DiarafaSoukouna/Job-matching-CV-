import { Users, Briefcase, Building, Globe } from "lucide-react"

export default function JobStats() {
  const stats = [
    {
      id: 1,
      value: "10K+",
      label: "Companies",
      icon: <Building className="h-6 w-6" />,
    },
    {
      id: 2,
      value: "45K+",
      label: "Job Listings",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: 3,
      value: "2M+",
      label: "Job Seekers",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 4,
      value: "100+",
      label: "Countries",
      icon: <Globe className="h-6 w-6" />,
    },
  ]

  return (
    <section className="border-y bg-background py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

