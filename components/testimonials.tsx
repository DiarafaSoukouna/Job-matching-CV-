import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content:
        "JobMatch helped me find my dream job in just two weeks! The platform is intuitive and the job recommendations were spot on.",
      author: "Sarah Johnson",
      position: "UX Designer at Acme Inc",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      content:
        "As a hiring manager, I've found exceptional talent through JobMatch. The quality of candidates and the ease of use make it our go-to platform.",
      author: "Michael Chen",
      position: "Engineering Manager at Globex",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      content:
        "After months of searching elsewhere, I found the perfect role through JobMatch within days. The detailed job descriptions and company profiles made all the difference.",
      author: "Emily Rodriguez",
      position: "Marketing Specialist at Initech",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="bg-muted/30 py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What People Are Saying</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Don't just take our word for it — hear from job seekers and employers who've found success with JobMatch
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4 text-muted-foreground">"{testimonial.content}"</p>
                <div className="mt-6 flex items-center space-x-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

