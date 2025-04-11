import { JobListing } from './job';
export interface CompagnyListing {
    id: string,
    name: string,
    logo: string,
    slug: string,
    yearFounded: number,
    sector: string,
    description: string,
    email: string,
    location: string,
    employees: number,
    website: string,
    phoneNumber: string,
    address: string,
    socialLinks: {
      linkedin: string,
      twitter: string,
    },
    jobCount : number,
    jobListings?: JobListing[]
}
