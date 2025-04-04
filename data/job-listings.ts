import type { JobListing } from "@/types/job"

export const jobListings: JobListing[] = [
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
    postedAt: "2023-05-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Ingénieur Backend",
    companyName: "Globex",
    companyLogo: "/image2.jpg",
    companySlug: "globex",
    location: "Sikasso",
    type: "Full-time",
    salary: "78,000,000 - 96,000,000 FCFA",
    description:
      "Nous recherchons un Ingénieur Backend pour concevoir et mettre en œuvre des API et des services évolutifs. Vous travaillerez avec notre équipe pour construire des systèmes robustes qui alimentent nos applications.",
    tags: ["Node.js", "Python", "AWS", "PostgreSQL"],
    featured: false,
    postedAt: "2023-05-02T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Designer Produit",
    companyName: "Initech",
    companyLogo: "/image3.jpg",
    companySlug: "initech",
    location: "Télétravail",
    type: "Full-time",
    salary: "60,000,000 - 78,000,000 FCFA",
    description:
      "Rejoignez notre équipe de design pour créer des expériences utilisateur belles et intuitives. Vous collaborerez avec des chefs de produit et des ingénieurs pour donner vie aux produits.",
    tags: ["UI/UX", "Figma", "Design Systems", "User Research"],
    featured: true,
    postedAt: "2023-05-03T00:00:00.000Z",
  },
  {
    id: "4",
    title: "Scientifique des Données",
    companyName: "Umbrella Corp",
    companyLogo: "/image.png",
    companySlug: "umbrella",
    location: "Kayes",
    type: "Full-time",
    salary: "84,000,000 - 102,000,000 FCFA",
    description:
      "Nous recherchons un Scientifique des Données pour nous aider à extraire des informations de nos données. Vous travaillerez avec de grands ensembles de données et construirez des modèles pour résoudre des problèmes commerciaux complexes.",
    tags: ["Python", "Machine Learning", "SQL", "Data Analysis"],
    featured: false,
    postedAt: "2023-05-04T00:00:00.000Z",
  },
  {
    id: "5",
    title: "Ingénieur DevOps",
    companyName: "Stark Industries",
    companyLogo: "/image2.jpg",
    companySlug: "stark",
    location: "Ségou (Hybride)",
    type: "Full-time",
    salary: "75,000,000 - 93,000,000 FCFA",
    description:
      "Rejoignez notre équipe d'infrastructure pour construire et maintenir notre infrastructure cloud. Vous travaillerez avec des outils modernes pour garantir que nos systèmes sont fiables, évolutifs et sécurisés.",
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    featured: false,
    postedAt: "2023-05-05T00:00:00.000Z",
  },
  {
    id: "6",
    title: "Développeur Full Stack",
    companyName: "Wayne Enterprises",
    companyLogo: "/image3.jpg",
    companySlug: "wayne",
    location: "Télétravail",
    type: "Full-time",
    salary: "66,000,000 - 84,000,000 FCFA",
    description:
      "Nous recherchons un Développeur Full Stack pour travailler sur nos applications web. Vous serez responsable du développement frontend et backend, en utilisant des technologies modernes.",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    featured: true,
    postedAt: "2023-05-06T00:00:00.000Z",
  },
  {
    id: "7",
    title: "Responsable Marketing",
    companyName: "Acme Inc",
    companyLogo: "/image.png",
    companySlug: "acme",
    location: "Mopti",
    type: "Full-time",
    salary: "54,000,000 - 72,000,000 FCFA",
    description:
      "Nous recherchons un Responsable Marketing pour diriger nos efforts marketing. Vous serez responsable de l'élaboration et de l'exécution de stratégies marketing pour stimuler la croissance.",
    tags: ["Digital Marketing", "Content Strategy", "SEO", "Analytics"],
    featured: false,
    postedAt: "2023-05-07T00:00:00.000Z",
  },
  {
    id: "8",
    title: "Chercheur UX",
    companyName: "Globex",
    companyLogo: "/image2.jpg",
    companySlug: "globex",
    location: "Gao (Hybride)",
    type: "Full-time",
    salary: "57,000,000 - 75,000,000 FCFA",
    description:
      "Rejoignez notre équipe UX pour mener des recherches utilisateur et des tests d'utilisabilité. Vous nous aiderez à comprendre les besoins et les comportements des utilisateurs pour éclairer nos décisions produit.",
    tags: ["User Research", "Usability Testing", "Interviews", "Data Analysis"],
    featured: false,
    postedAt: "2023-05-08T00:00:00.000Z",
  },
  {
    id: "9",
    title: "Chef de Produit",
    companyName: "Initech",
    companyLogo: "/image3.jpg",
    companySlug: "initech",
    location: "Koulikoro",
    type: "Full-time",
    salary: "78,000,000 - 96,000,000 FCFA",
    description:
      "Nous recherchons un Chef de Produit pour diriger le développement de produits. Vous travaillerez avec des équipes interfonctionnelles pour définir la vision, la stratégie et la feuille de route du produit.",
    tags: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    featured: true,
    postedAt: "2023-05-09T00:00:00.000Z",
  },
]
