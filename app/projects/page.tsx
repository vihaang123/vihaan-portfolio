import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Work } from "@/components/Work";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Vihaan Gandhi: a published crime forecasting study, Nothuman, StockIQ, SalesBuddy and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Work all headingAs="h1" first />
      <Contact />
    </>
  );
}
