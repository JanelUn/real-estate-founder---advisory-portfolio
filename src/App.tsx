/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrajectorySection } from './components/TrajectorySection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EcosystemSection } from './components/EcosystemSection';
import { ContactSection } from './components/ContactSection';
import { SiteFooter } from './components/SiteFooter';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink selection:bg-mist relative font-sans">

      <CustomCursor />

      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-ink focus:text-white focus:text-sm focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <TrajectorySection />
        <ServicesSection />
        <ProjectsSection />
        <EcosystemSection />
        <ContactSection />
      </main>

      <SiteFooter />

    </div>
  );
}
