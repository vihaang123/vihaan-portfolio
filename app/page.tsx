import { About } from "@/components/About";
import { Beyond } from "@/components/Beyond";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Currently } from "@/components/Currently";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Experience />
      <Capabilities />
      <Currently />
      <Beyond />
      <Contact />
    </>
  );
}
