import { MotionConfig } from "motion/react";
import { WhatsAppFloat } from "@/components/whatsapp";
import { Breathe } from "@/sections/Breathe";
import { Hero, Nav } from "@/sections/Hero";
import { Proof } from "@/sections/Proof";
import { Solutions } from "@/sections/Solutions";
import { Finale, Formats, PlatformRates, Programming, Results, Services, Start } from "@/sections/Sections";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Services />
        <Breathe />
        <Formats />
        <Programming />
        <Results />
        <Solutions />
        <Start />
        <PlatformRates />
      </main>
      <Finale />
      <WhatsAppFloat />
    </MotionConfig>
  );
}
