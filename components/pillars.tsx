import { Rocket, Bot, Target, Shield, Brain } from "lucide-react"

export default function Pillars() {
  const pillars = [
    {
      id: 1,
      title: "Performance Marketing",
      subtitle: "Maximise every click. Scale what works. Cut what doesn’t.",
      description:
        "Whether you're running Google Ads, Performance Max, or YouTube campaigns, I help you build media plans that deliver results — not just reach.",
      icon: Rocket,
    },
    {
      id: 2,
      title: "Automation & AI Workflows",
      subtitle: "Automate the boring. Accelerate the smart.",
      description:
        "I build AI-powered systems that eliminate manual tasks and unlock scale — so you can focus on strategy, not spreadsheets.",
      icon: Bot,
    },
    {
      id: 3,
      title: "Tracking & Attribution",
      subtitle: "Data you can trust. Results you can act on.",
      description:
        "I fix broken tracking setups, align them with your funnel, and build attribution models that reflect what’s actually working.",
      icon: Target,
    },
    {
      id: 4,
      title: "Privacy-First Strategy",
      subtitle: "Grow with confidence. Stay compliant. Win customer trust.",
      description:
        "Privacy isn’t just a legal box to tick — it’s a strategic advantage. I help you build data systems that are compliant, future-proof, and performance-ready.",
      icon: Shield,
    },
    {
      id: 5,
      title: "AI-Ready Data Infrastructure",
      subtitle: "Grow with confidence. Stay compliant. Win customer trust.", // Updated subtitle
      description:
        "Privacy isn’t just a legal box to tick — it’s a strategic advantage. I help you build data systems that are compliant, future-proof, and performance-ready.", // Updated description
      icon: Brain,
    },
  ]

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Smarter Path to Growth</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
            My comprehensive approach to growing your business with AI-powered solutions.
          </p>
          <div className="mx-auto mt-8 mb-8 w-24 border-b-2 border-gray-300"></div>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-gray-600">
            I take a holistic and strategic approach to growth by leveraging AI, automation, and first-party data across
            the entire customer journey, from awareness to conversion to retention. My 5-pillar methodology combines
            performance marketing, automation, privacy-safe tracking, and intelligent data systems to make your
            marketing more scalable, intelligent, and effective.
          </p>
          <div className="mx-auto mt-12 mb-12 w-full border-b-2 border-gray-300"></div> {/* Added long line breaker */}
        </div>

        <div className="mt-16 space-y-10">
          {pillars.map((pillar, index) => (
            <div key={pillar.id} className="pb-10">
              <div
                className={`flex flex-col ${pillar.id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12`}
              >
                <div className="flex flex-1 items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#101C3C] text-white">
                    <pillar.icon className="h-12 w-12" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFA64C] text-white">
                      <span className="text-lg font-bold">{pillar.id}</span>
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">{pillar.title}</h3>
                  </div>
                  <p className="text-lg font-medium text-gray-700">{pillar.subtitle}</p>
                  <p className="text-gray-600">{pillar.description}</p>
                </div>
              </div>
              {index < pillars.length - 1 && <div className="mt-10 border-b-2 border-gray-300"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
