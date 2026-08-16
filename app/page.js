"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ContactPage from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div className="grid-bg" />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <CTA />
      <ContactPage />
      <Footer />
    </>
  );
}
