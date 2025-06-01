"use client";

import MainLayout from "@/components/MainLayout";
import AboutMe from "@/sections/AboutMe";
import Experience from "@/sections/Experience";
import Hero from "@/sections/Hero";
import Portfolio from "@/sections/Portfolio";
import TechStack from "@/sections/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout>
      <Hero title={'Software Engineer'} subtitle={'Engineer'} name={'Mukhlis Purnomo Aji'} />
      <Experience />
      <Portfolio heading={'My Works'} />
      <TechStack />
      <AboutMe />
    </MainLayout>
  );
}
