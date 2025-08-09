import { CheckCircle, Shield, Zap, Clock } from "lucide-react"

const features = [
  {
    name: "Feature 1",
    description: "Description of your first feature. Explain the benefits and value it provides to your customers.",
    icon: CheckCircle,
  },
  {
    name: "Feature 2",
    description: "Description of your second feature. Explain the benefits and value it provides to your customers.",
    icon: Shield,
  },
  {
    name: "Feature 3",
    description: "Description of your third feature. Explain the benefits and value it provides to your customers.",
    icon: Zap,
  },
  {
    name: "Feature 4",
    description: "Description of your fourth feature. Explain the benefits and value it provides to your customers.",
    icon: Clock,
  },
]

export default function Features() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Features</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            Discover what makes our services stand out from the competition.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
