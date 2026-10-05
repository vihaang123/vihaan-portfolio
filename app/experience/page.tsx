import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience and education: Founder & CEO of Tekkloom, co-founder of Supercore, published crime forecasting research at NMIMS, and a B.Tech in Data Science.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <Experience headingAs="h1" first />
      <Contact />
    </>
  );
}
