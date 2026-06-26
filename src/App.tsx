import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import TiersSection from './components/TiersSection';
import GoalJourneys from './components/GoalJourneys';
import GiftCatalog from './components/GiftCatalog';
import Transactions from './components/Transactions';
import ProtectedArea from './components/ProtectedArea';
import DeleteAccount from './components/DeleteAccount';
import Footer from './components/Footer';
import { Smartphone, QrCode, Sparkles, Star, ChevronDown, Award } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Sync state with URL Hash for seamless App Store deep-linking support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#delete-account' || hash === '#/delete-account') {
        setCurrentPage('delete-account');
      } else {
        setCurrentPage('home');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'delete-account' ? 'delete-account' : '';
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 selection:bg-[#D4AF37] selection:text-slate-950 flex flex-col justify-between">
      
      {/* Header */}
      <Header currentPage={currentPage} onPageChange={handlePageChange} />

      {/* Main Content with dynamic page transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-0"
            >
              {/* Marketing Landing Components */}
              <Hero onPageChange={handlePageChange} />
              
              {/* Interactive Loyalty Tiers Grid */}
              <TiersSection />

              {/* Goal Journeys Interactive Simulator */}
              <GoalJourneys />

              {/* Gift Catalog Section */}
              <GiftCatalog />

              {/* Transactions History auditing */}
              <Transactions />

              {/* Elegant App Install QR Banner Section */}
              <section id="download" className="py-24 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                  <div className="max-w-3xl mx-auto space-y-6">
                    <span className="inline-flex items-center gap-1.5 bg-white/5 text-[#D4AF37] border border-white/10 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase backdrop-blur-md">
                      <Smartphone className="h-3 w-3" /> Get Started Instantly
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      Ready to Claim Your <span className="text-gold-gradient">Gold Status</span>?
                    </h2>
                    <p className="text-white/60 font-sans font-light text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                      Scan the secure encryption QR code below with your mobile camera or click the app store badges to download Fegno Loyalty and link your profile now.
                    </p>

                    {/* QR and badging box */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 bg-white/5 border border-white/10 p-8 rounded-3xl max-w-xl mx-auto shadow-2xl backdrop-blur-md mt-8">
                      {/* Live Mock QR */}
                      <div className="bg-white p-3.5 rounded-2xl shadow-inner relative group">
                        <QrCode className="h-32 w-32 text-slate-950" />
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer">
                          <span className="text-[10px] font-mono font-bold text-slate-950 flex flex-col items-center gap-1.5">
                            <Star className="h-5 w-5 text-[#D4AF37] animate-bounce" />
                            SCAN COMPLETED
                          </span>
                        </div>
                      </div>

                      {/* Store badge redirect lists */}
                      <div className="space-y-4 text-center sm:text-left flex-1">
                        <p className="text-xs font-mono text-white/40 font-bold uppercase tracking-wider">Download Channels</p>
                        
                        <div className="space-y-3">
                          {/* Store Button A */}
                          <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-xl px-4 py-2.5 transition-all text-xs text-left shadow-md cursor-pointer">
                            <Smartphone className="h-5 w-5 text-[#D4AF37]" />
                            <div>
                              <p className="text-[9px] text-white/40 font-mono">iOS VERSION 2.0.4</p>
                              <p className="font-bold text-white">Apple App Store</p>
                            </div>
                          </button>

                          {/* Store Button B */}
                          <button className="w-full flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-xl px-4 py-2.5 transition-all text-xs text-left shadow-md cursor-pointer">
                            <QrCode className="h-5 w-5 text-[#D4AF37]" />
                            <div>
                              <p className="text-[9px] text-white/40 font-mono">ANDROID VERSION 2.0.1</p>
                              <p className="font-bold text-white">Google Play Store</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Micro footnote */}
                    <p className="text-[10px] font-mono text-white/40 pt-2">
                      Minimum Requirements: iOS 14.0+ or Android 9.0+ • SSL Encrypted Pipeline
                    </p>
                  </div>
                </div>
              </section>

              {/* Protected compliance entry point for sensitive actions */}
              <ProtectedArea onPageChange={handlePageChange} />
            </motion.div>
          ) : (
            <motion.div
              key="delete-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Apple and Google Compliant Account Deletion flow */}
              <DeleteAccount />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onPageChange={handlePageChange} />

    </div>
  );
}
