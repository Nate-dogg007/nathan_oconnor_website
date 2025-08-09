import { getServices } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Nathan O'Connor's portfolio of work, including performance marketing, automation & AI workflows, and tracking & attribution, showcasing how I help businesses grow.",
  alternates: {
    canonical: `${BASE_URL}/work`,
  },
  openGraph: {
    title: "My Work | Nathan O'Connor - Performance Marketing & AI Portfolio",
    description:
      "Explore Nathan O'Connor's portfolio of work, including performance marketing, automation & AI workflows, and tracking & attribution, showcasing how I help businesses grow.",
    url: `${BASE_URL}/work`,
    siteName: "Nathan O'Connor",
    images: [
      {
        url: `${BASE_URL}/hero-photo.png`, // Use a relevant image
        width: 800,
        height: 600,
        alt: "My Work",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Work | Nathan O'Connor - Performance Marketing & AI Portfolio",
    description:
      "Explore Nathan O'Connor's portfolio of work, including performance marketing, automation & AI workflows, and tracking & attribution, showcasing how I help businesses grow.",
    creator: "@yourtwitterhandle",
    images: [`${BASE_URL}/hero-photo.png`],
  },
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Explore my range of solutions designed to help your business grow.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => (
            <div key={service._id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="relative h-48 w-full">
                <Image
                  src={service.image || "/placeholder.svg?height=192&width=384"}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-base text-gray-500">{service.description}</p>
                <div className="mt-4">
                  <Link href={`/work/${service.slug.current}`} className="text-blue-600 hover:text-blue-800">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
