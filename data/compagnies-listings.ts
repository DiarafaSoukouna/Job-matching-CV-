import type { CompagnyListing } from "@/types/company";

export const companyListings: CompagnyListing[] = [
  {
    id: "1",
    name: "Acme Inc",
    logo: "/image.png",
    slug: "acme",
    location: "Bamako, Mali",
    yearFounded: 1998,
    sector: "Technologie",
    description: "Acme Inc est une entreprise leader dans le développement de logiciels et services numériques innovants.",
    email: "contact@acme.com",
    employees: 350,
    website: "https://www.acme.com",
    phoneNumber: "+223 20 22 22 22",
    address: "Avenue de l'Indépendance, Bamako",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/acme",
      twitter: "https://twitter.com/acme",
    },
    jobCount: 12,
    jobListings: [
      {
        id: "1",
        title: "Développeur Frontend Senior",
        companyName: "Acme Inc",
        companyLogo: "/image.png",
        companySlug: "acme",
        location: "Bamako (Télétravail)",
        type: "Full-time",
        salary: "72,000,000 - 90,000,000 FCFA",
        description:
          "Nous recherchons un Développeur Frontend Senior pour rejoindre notre équipe. Vous serez responsable de la construction d'interfaces utilisateur pour nos applications web en utilisant React et TypeScript.",
        tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        featured: true,
        postedAt: "2022-01-01"
      },
      {
        id: "2",
        title: "Développeur Backend",
        companyName: "Acme Inc",
        companyLogo: "/image.png",
        companySlug: "acme",
        location: "Bamako, Mali",
        type: "Full-time",
        salary: "60,000,000 - 80,000,000 FCFA",
        description:
          "Nous recherchons un Développeur Backend pour rejoindre notre équipe afin de construire des API robustes et évolutives.",
        tags: ["Node.js", "Express", "MongoDB"],
        featured: false,
        postedAt: "2022-02-15"
      }
    ]
  },
  {
    id: "2",
    name: "Globex",
    logo: "/image2.jpg",
    slug: "globex",
    location: "Sikasso, Mali",
    yearFounded: 2005,
    sector: "Agriculture",
    description: "Globex est spécialisée dans la transformation et l'exportation de produits agricoles en Afrique de l'Ouest.",
    email: "info@globex.com",
    employees: 120,
    website: "https://www.globex.com",
    phoneNumber: "+223 20 33 33 33",
    address: "Route de Sikasso, Sikasso",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/globex",
      twitter: "https://twitter.com/globex",
    },
    jobCount: 5,
    jobListings: [
      {
        id: "1",
        title: "Chef de Projet Agriculture",
        companyName: "Globex",
        companyLogo: "/image2.jpg",
        companySlug: "globex",
        location: "Sikasso, Mali",
        type: "Full-time",
        salary: "48,000,000 - 60,000,000 FCFA",
        description:
          "Globex recherche un Chef de Projet Agriculture pour superviser les projets de production et d'exportation de produits agricoles.",
        tags: ["Agriculture", "Gestion de projet", "Supply Chain"],
        featured: true,
        postedAt: "2022-03-01"
      }
    ]
  },
  {
    id: "3",
    name: "Initech",
    logo: "/image3.jpg",
    slug: "initech",
    location: "Télétravail",
    yearFounded: 2010,
    sector: "Design & Créativité",
    description: "Initech est une agence de design spécialisée dans la création d'interfaces utilisateur modernes et intuitives.",
    email: "hello@initech.com",
    employees: 50,
    website: "https://www.initech.com",
    phoneNumber: "+223 20 44 44 44",
    address: "Aucune adresse physique (Télétravail)",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/initech",
      twitter: "https://twitter.com/initech",
    },
    jobCount: 8,
    jobListings: [
      {
        id: "1",
        title: "Designer UI/UX",
        companyName: "Initech",
        companyLogo: "/image3.jpg",
        companySlug: "initech",
        location: "Télétravail",
        type: "Freelance",
        salary: "30,000,000 - 50,000,000 FCFA",
        description:
          "Initech recherche un Designer UI/UX talentueux pour créer des interfaces utilisateur exceptionnelles pour des clients internationaux.",
        tags: ["UI/UX", "Design", "Adobe XD", "Figma"],
        featured: true,
        postedAt: "2022-04-10"
      },
      {
        id: "2",
        title: "Développeur Frontend",
        companyName: "Initech",
        companyLogo: "/image3.jpg",
        companySlug: "initech",
        location: "Télétravail",
        type: "Full-time",
        salary: "45,000,000 - 60,000,000 FCFA",
        description:
          "Nous recherchons un Développeur Frontend passionné par le design pour rejoindre notre équipe créative.",
        tags: ["React", "JavaScript", "CSS", "Frontend"],
        featured: false,
        postedAt: "2022-05-05"
      }
    ]
  },
  {
    id: "4",
    name: "Umbrella Corp",
    logo: "/image.png",
    slug: "umbrella",
    location: "Kayes, Mali",
    yearFounded: 2000,
    sector: "Recherche & Développement",
    description: "Umbrella Corp est une société de biotechnologie dédiée à la recherche de solutions médicales avancées.",
    email: "contact@umbrella.com",
    employees: 500,
    website: "https://www.umbrella.com",
    phoneNumber: "+223 20 55 55 55",
    address: "Boulevard de la Santé, Kayes",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/umbrella",
      twitter: "https://twitter.com/umbrella",
    },
    jobCount: 3,
    jobListings: [
      {
        id: "1",
        title: "Scientifique en Biotechnologie",
        companyName: "Umbrella Corp",
        companyLogo: "/image.png",
        companySlug: "umbrella",
        location: "Kayes, Mali",
        type: "Full-time",
        salary: "90,000,000 - 120,000,000 FCFA",
        description:
          "Nous recherchons un Scientifique en Biotechnologie pour mener des recherches sur des solutions médicales avancées.",
        tags: ["Biotechnologie", "Recherche", "Médecine"],
        featured: true,
        postedAt: "2022-06-01"
      }
    ]
  },
  {
    id: "5",
    name: "Stark Industries",
    logo: "/image2.jpg",
    slug: "stark",
    location: "Ségou, Mali",
    yearFounded: 1980,
    sector: "Industrie & Technologie",
    description: "Stark Industries se concentre sur le développement de technologies de pointe pour divers secteurs industriels.",
    email: "info@starkindustries.com",
    employees: 1000,
    website: "https://www.starkindustries.com",
    phoneNumber: "+223 20 66 66 66",
    address: "Zone Industrielle, Ségou",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/starkindustries",
      twitter: "https://twitter.com/starkindustries",
    },
    jobCount: 15,
    jobListings: [
      {
        id: "1",
        title: "Ingénieur en Robotique",
        companyName: "Stark Industries",
        companyLogo: "/image2.jpg",
        companySlug: "stark",
        location: "Ségou, Mali",
        type: "Full-time",
        salary: "80,000,000 - 100,000,000 FCFA",
        description:
          "Stark Industries recherche un Ingénieur en Robotique pour concevoir des systèmes robotiques pour l'industrie.",
        tags: ["Robotique", "Ingénierie", "Automatisation"],
        featured: true,
        postedAt: "2022-07-10"
      },
      {
        id: "2",
        title: "Technicien en Maintenance",
        companyName: "Stark Industries",
        companyLogo: "/image2.jpg",
        companySlug: "stark",
        location: "Ségou, Mali",
        type: "Full-time",
        salary: "45,000,000 - 60,000,000 FCFA",
        description:
          "Nous recherchons un Technicien en Maintenance pour entretenir nos équipements industriels.",
        tags: ["Maintenance", "Industrie", "Technicien"],
         featured: true,
        postedAt: "2022-07-10"
      },
    ]
}]