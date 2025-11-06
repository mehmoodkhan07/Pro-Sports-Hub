// app/contact/page.tsx
import ContactForm from "@/components/ContactForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Pro Sports Hub - Get in Touch",
  description:
    "Contact us for queries about our sports gear, orders, or bulk purchases. We're here to help athletes and fitness lovers with all their sporting needs.",
}

export default function ContactPage() {
  return <ContactForm />
}
