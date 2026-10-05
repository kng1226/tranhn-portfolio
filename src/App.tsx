/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BackgroundScene } from './components/BackgroundScene';
import { TopLeftName } from './components/TopLeftName';
import { FloatingNav, NavItem } from './components/FloatingNav';
import { ContactButton } from './components/ContactButton';
import { HeroContent } from './components/HeroContent';
import { ScrollControl } from './components/ScrollControl';
import { HeroMicrocopy } from './components/HeroMicrocopy';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { DesignsSection } from './components/DesignsSection';
import { EpilogueSection } from './components/EpilogueSection';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('Journey');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [navOpacity, setNavOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isDesignsModalOpen, setIsDesignsModalOpen] = useState(false);

  const isAnyModalOpen =
    isExperienceModalOpen || isProjectsModalOpen || isDesignsModalOpen || isContactOpen;

  // Track scroll position for hero fade-out and sticky control flip
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight || 800;

      // scrollProgress: 0 at top, 1 when scrolled beyond 70% of hero height
      const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.7)));
      setScrollProgress(progress);

      // Past hero threshold (flips scroll arrow between ↓ and ↑)
      const past = scrollY > heroHeight * 0.45;
      setIsPastHero(past);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to accurately track Section 01, 02, 03, 04, and 05
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'top') {
            setActiveTab('Journey');
            setThemeMode('dark');
          } else if (entry.target.id === 'experience-section') {
            setActiveTab('Experience');
            setThemeMode('light');
          } else if (entry.target.id === 'projects-section') {
            setActiveTab('Projects');
            setThemeMode('light');
          } else if (entry.target.id === 'designs-section') {
            setActiveTab('Designs');
          } else if (entry.target.id === 'epilogue-section') {
            setActiveTab('About');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const s1 = document.getElementById('top');
    const s2 = document.getElementById('experience-section');
    const s3 = document.getElementById('projects-section');
    const s4 = document.getElementById('designs-section');
    const s5 = document.getElementById('epilogue-section');

    if (s1) observer.observe(s1);
    if (s2) observer.observe(s2);
    if (s3) observer.observe(s3);
    if (s4) observer.observe(s4);
    if (s5) observer.observe(s5);

    return () => observer.disconnect();
  }, []);

  // Smooth scroll down to next section
  const handleScrollToNext = useCallback(() => {
    const expSection = document.getElementById('experience-section');
    if (expSection) {
      expSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  // Smooth scroll to top
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Smart toggle for bottom-right sticky control
  const handleStickyScrollToggle = useCallback(() => {
    if (isPastHero) {
      handleScrollToTop();
    } else {
      handleScrollToNext();
    }
  }, [isPastHero, handleScrollToTop, handleScrollToNext]);

  // Precise scroll function that avoids scrollIntoView horizontal/weird shifts
  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  // Tab selection handler
  const handleSelectTab = useCallback(
    (tab: NavItem) => {
      setActiveTab(tab);
      if (tab === 'Journey') {
        handleScrollToTop();
      } else if (tab === 'Experience') {
        scrollToSection('experience-section');
      } else if (tab === 'Projects') {
        scrollToSection('projects-section');
      } else if (tab === 'Designs') {
        scrollToSection('designs-section');
      } else if (tab === 'About') {
        scrollToSection('epilogue-section');
      }
    },
    [handleScrollToTop, scrollToSection]
  );

  return (
    <div className="relative min-h-screen w-full text-[#F3E7D0] selection:bg-[#F3E7D0]/20 selection:text-[#F3E7D0]">
      {/* 1. EXISTING PORTFOLIO BACKGROUND (Open sea in hero -> meadow inland in sections 02, 03, 04) */}
      <BackgroundScene />

      {/* 2. PERSISTENT FIXED CONTROLS (Adaptive dark/light contrast; subdued when modal is open or at epilogue resting state) */}
      <div
        style={{
          opacity: isAnyModalOpen ? 0.2 : navOpacity,
          pointerEvents: isAnyModalOpen ? 'none' : 'auto',
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <TopLeftName themeMode={themeMode} />
        <FloatingNav
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          themeMode={themeMode}
        />
        <ContactButton
          onClick={() => setIsContactOpen(true)}
          themeMode={themeMode}
        />
        <ScrollControl
          isPastHero={isPastHero}
          onScrollToTarget={handleStickyScrollToggle}
          themeMode={themeMode}
        />
      </div>

      {/* 3. MAIN HERO SECTION (Full Viewport Height) */}
      <div id="top" className="relative h-screen w-full overflow-hidden">
        {/* Main Hero Content (Asymmetrical Editorial Hierarchy, Hook, Prompt) */}
        <HeroContent
          scrollProgress={scrollProgress}
          onFollowHawk={handleScrollToNext}
        />

        {/* Hero Microcopy (Position Open Water, Scroll to Follow) */}
        <HeroMicrocopy scrollProgress={scrollProgress} />
      </div>

      {/* 4. SECTION 02 — EXPERIENCE & LEADERSHIP (Meadow setting, FPT & TEC Interactive Chapters) */}
      <ExperienceSection onModalChange={setIsExperienceModalOpen} />

      {/* 5. SECTION 03 — PROJECTS (Interactive living specimens: IntelliLex & VnDrops) */}
      <ProjectsSection onModalChange={setIsProjectsModalOpen} />

      {/* 6. SECTION 04 — DESIGNS (Pinned horizontal exhibition: 3D, UI/UX, Graphic, Video) */}
      <DesignsSection
        onModalChange={setIsDesignsModalOpen}
        onThemeChange={setThemeMode}
      />

      {/* 7. SECTION 05 — EPILOGUE & INTEGRATED FOOTER (Second Coast -> Open Ocean Again) */}
      <EpilogueSection
        onContactClick={() => setIsContactOpen(true)}
        onThemeChange={setThemeMode}
        onNavOpacityChange={setNavOpacity}
      />

      {/* 8. CONTACT MODAL OVERLAY */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
