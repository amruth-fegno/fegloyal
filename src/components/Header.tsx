import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Smartphone, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (page: Page) => {
    onPageChange(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);

    const scrollToSection = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (currentPage !== 'home') {
      onPageChange('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.setTimeout(scrollToSection, 120);
      return;
    }

    scrollToSection();
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0F172A]/60 backdrop-blur-xl border-b border-white/10 py-3 shadow-xl'
          : 'bg-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <div
            id="logo-container"
            onClick={() => handleNavClick('home')}
            className="flex min-w-0 items-center gap-1.5 sm:gap-2 cursor-pointer group"
          >
            <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] text-[#0F172A] shadow-lg shadow-[#D4AF37]/20 transition-transform group-hover:scale-105">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-display font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight text-white flex items-center gap-1 sm:gap-1.5">
                FEGNO <span className="text-[#D4AF37] font-light text-[10px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em]">LOYALTY</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-wider">COMPANION</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden xl:flex items-center gap-5 2xl:gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-sans text-sm font-semibold tracking-wider uppercase transition-colors hover:text-[#D4AF37] cursor-pointer ${
                currentPage === 'home' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]/80 pb-0.5' : 'text-white/70'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleSectionClick('tiers')}
              className="font-sans text-sm font-semibold tracking-wider uppercase text-white/70 transition-colors hover:text-[#D4AF37]"
            >
              Benefits & Tiers
            </button>
            <button
              onClick={() => handleSectionClick('goals')}
              className="font-sans text-sm font-semibold tracking-wider uppercase text-white/70 transition-colors hover:text-[#D4AF37]"
            >
              Goal Journeys
            </button>
            <button
              onClick={() => handleSectionClick('rewards')}
              className="font-sans text-sm font-semibold tracking-wider uppercase text-white/70 transition-colors hover:text-[#D4AF37]"
            >
              Rewards Catalog
            </button>
            <button
              onClick={() => handleSectionClick('transactions')}
              className="font-sans text-sm font-semibold tracking-wider uppercase text-white/70 transition-colors hover:text-[#D4AF37]"
            >
              Transactions
            </button>
          </nav>

          {/* CTA / Quick Access Buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <button
              onClick={() => handleSectionClick('download')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0F172A] transition-all hover:brightness-110 shadow-lg shadow-[#D4AF37]/20"
            >
              <Smartphone className="h-3.5 w-3.5" />
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-3 absolute top-full left-0 right-0 shadow-2xl"
        >
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-base font-semibold uppercase tracking-wider ${
              currentPage === 'home' ? 'text-[#D4AF37] bg-white/5 border-l-4 border-[#D4AF37] pl-2' : 'text-white/70'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleSectionClick('tiers')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#D4AF37]"
          >
            Benefits & Tiers
          </button>
          <button
            onClick={() => handleSectionClick('goals')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#D4AF37]"
          >
            Goal Journeys
          </button>
          <button
            onClick={() => handleSectionClick('rewards')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#D4AF37]"
          >
            Rewards Catalog
          </button>
          <button
            onClick={() => handleSectionClick('transactions')}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-[#D4AF37]"
          >
            Transactions
          </button>
          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => handleSectionClick('download')}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0F172A]"
            >
              <Smartphone className="h-4 w-4" />
              Download App Now
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
