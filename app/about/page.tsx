import type { Metadata } from "next";
import { About } from "@/components/About";
import { AboutStory, Interests, WhatIDo } from "@/components/AboutStory";
import { Beyond } from "@/components/Beyond";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Currently } from "@/components/Currently";
import { Inspirations, Quotes } from "@/components/Voices";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vihaan Gandhi is a Data Science student and founder in Mumbai. He runs Tekkloom, co-founded Supercore and is building Nothuman, and he is interested in AI agents, forecasting and financial markets.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flow">
      <About headingAs="h1" first />
      <AboutStory />
      <WhatIDo />
      <Interests />
      <Capabilities />
      <Currently />
      <Beyond />
      <Inspirations />
      <Quotes />
      <Contact />
    </div>
  );
}
