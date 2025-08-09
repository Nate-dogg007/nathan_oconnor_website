"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

export default function FAQ() {
  // Sample FAQ data - replace with your actual FAQs
  const faqData = [
    {
      question: "Are you an agency?", // Updated question
      answer:
        "No, I'm a consultant and strategic partner. I work directly with businesses or as a fractional performance lead alongside internal teams. You get expertise without the overhead of an agency.", // Updated answer
    },
    {
      question: "Do you run campaigns for us or just advise?", // Updated question
      answer:
        "I can do both. I offer fully managed setups for things like Google Ads, tracking, and automation, or I can plug into your team to guide strategy, build frameworks, and ensure systems are working efficiently.", // Updated answer
    },
    {
      question: "Can you help me implement AI workflows or is this just theory?", // Updated question
      answer:
        "I build hands-on AI-powered systems using tools like n8n, Airtable, and OpenAI. Whether you want to automate content, reporting, or internal operations, I can design, implement, and train your team on it.", // Updated answer
    },
    {
      question: "I'm concerned about GDPR, can you help me stay compliant?", // Updated question
      answer:
        "Absolutely. I specialise in privacy-first marketing strategies, including Consent Mode v2, hashed user IDs, and server-side tracking. You'll get performance without sacrificing compliance.", // Updated answer
    },
    {
      question: "How long does it take to see results?", // Updated question
      answer:
        "That depends on your goals. In most cases, clients start seeing clarity and performance lifts within the first 30–60 days through improved tracking, budget control, or workflow automation.", // Updated answer
    },
    {
      question: "What's my process?", // Updated question
      answer: (
        <div>
          <p className="mb-3">I follow a simple 4-phase approach:</p>
          <ol className="list-decimal list-inside space-y-2 mb-3">
            <li>
              <strong>Audit</strong> – I assess your ads, automation, tracking, and data setup.
            </li>
            <li>
              <strong>Roadmap</strong> – You get a clear plan with prioritised actions.
            </li>
            <li>
              <strong>Build</strong> – I implement or support your team in executing the work.
            </li>
            <li>
              <strong>Optimise</strong> – We refine, automate, and scale what works.
            </li>
          </ol>
          <p>It's lean, flexible, and built to drive results fast.</p>
        </div>
      ), // Updated answer with formatted list
    },
  ]

  // State to track which questions are expanded
  const [expandedItems, setExpandedItems] = useState({})

  // Toggle function for expanding/collapsing questions
  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="container mx-auto px-6 py-16 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
          Find answers to common questions about my services and solutions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        {faqData.map((faq, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-lg font-medium text-gray-900">{faq.question}</span>
              <span className="ml-2 flex-shrink-0 text-gray-500">
                {expandedItems[index] ? (
                  <Minus className="h-5 w-5 text-[#FFA64C]" />
                ) : (
                  <Plus className="h-5 w-5 text-[#FFA64C]" />
                )}
              </span>
            </button>
            {expandedItems[index] && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="text-gray-700">{typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
