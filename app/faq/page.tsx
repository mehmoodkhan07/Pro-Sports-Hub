import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Pro-Sport HUB | Shipping, Returns & Product Info",
  description:
    "Find answers to common questions about Pro-Sport HUB sports gear, shipping policies, returns, sizing, and more. Get the info you need for a smooth shopping experience.",
}

const faqData = [
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "What are your shipping options and costs?",
        answer:
          "We offer free standard shipping on orders above $100. Standard delivery (5–7 business days) costs $9.95, express shipping (2–3 business days) costs $19.95, and next-day delivery costs $39.95. All orders are processed within 1–2 business days.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship sports gear worldwide. International shipping rates vary by location and will be shown at checkout. Customers are responsible for customs duties or import taxes where applicable.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you’ll receive a confirmation email with your tracking number. You can track your delivery on our website or the courier’s tracking page.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unused sports gear in its original packaging with all tags attached. Personalised or custom items are non-returnable unless defective.",
      },
      {
        question: "How do I return an item?",
        answer:
          "To start a return, contact our customer service team. You’ll receive a prepaid return label and simple return instructions. Refunds are processed within 5–7 business days after we receive your parcel.",
      },
      {
        question: "Can I exchange an item for a different size?",
        answer:
          "Yes! We provide free size exchanges within 30 days of purchase, as long as the product is unused and in its original packaging.",
      },
    ],
  },
  {
    category: "Product Information",
    questions: [
      {
        question: "How do I choose the right size?",
        answer:
          "Each product page includes a detailed size chart. Measure yourself and compare it with our guide. For compression wear, we recommend a snug fit; for casual apparel, go one size up for comfort.",
      },
      {
        question: "Are your products officially certified or tested?",
        answer:
          "All our sports equipment and apparel meet international quality and safety standards. Each product undergoes performance testing before it reaches you.",
      },
      {
        question: "How do I care for my sports gear?",
        answer:
          "Machine-wash activewear in cold water and avoid fabric softeners. Wipe down equipment with mild soap and a damp cloth. Store in a cool, dry place away from direct sunlight to extend product life.",
      },
    ],
  },
  {
    category: "Orders & Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, Google Pay, and secure online banking. All payments are processed using SSL-encrypted connections for safety.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "Orders can be updated or cancelled within 2 hours after placement. After that, they enter fulfilment and can’t be changed. Please contact us immediately for urgent changes.",
      },
      {
        question: "Do you offer custom-made sportswear or team gear?",
        answer:
          "Yes! We offer custom team jerseys, printed activewear, and personalised accessories. Custom orders usually take 2–4 weeks to complete depending on design complexity.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-900 font-rye mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">Quick answers about our gear, delivery, and customer service</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {faqData.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-center mt-12 bg-amber-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Still Have Questions?</h2>
        <p className="text-gray-700 mb-6">
          Can’t find what you’re looking for? Our support team is here to help 7 days a week.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Contact Us
          </a>
          <a
            href="https://wa.me/03111241639"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  )
}
