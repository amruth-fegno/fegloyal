import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Sparkles, Smartphone, CheckCircle, Flame, ArrowRight, RotateCw, QrCode } from 'lucide-react';
import { Page } from '../types';

interface HeroProps {
  onPageChange: (page: Page) => void;
}

export default function Hero({ onPageChange }: HeroProps) {
  const [points, setPoints] = useState(3240);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'perks' | 'qr'>('card');

  // Simulate points updating periodically for high-fidelity interactive feel
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        if (prev >= 3500) return 3240;
        return prev + 10;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#0F172A]">
      {/* Background gradients and glowing effects (Frosted Glass theme) */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mx-auto lg:mx-0 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#D4AF37]" />
              The Ultimate Loyalty Companion
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
            >
              Track Points.<br />
              <span className="text-gold-gradient">Set Goals.</span><br />
              Redeem Rewards.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-sans font-light leading-relaxed"
            >
              Elevate your shopping experience with the premium Fegno Loyalty ecosystem. Track your balances, build custom point milestones for objects you desire, and claim vouchers or devices with full transparency.
            </motion.p>

            {/* App Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              {/* Apple App Store */}
              <a
                href="#download"
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/40 text-white rounded-xl px-5 py-3 transition-all duration-300 w-full sm:w-auto shadow-md backdrop-blur-md"
              >
                <svg className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Download on the</p>
                  <p className="text-sm font-bold font-sans text-white">App Store</p>
                </div>
              </a>

              {/* Google Play Store */}
              <a
                href="#download"
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/45 text-white rounded-xl px-5 py-3 transition-all duration-300 w-full sm:w-auto shadow-md backdrop-blur-md"
              >
                <svg className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.25 3.016A1.5 1.5 0 0 0 4 4.5v15a1.5 1.5 0 0 0 1.25 1.484l9.167-9.167L5.25 3.016zm10.584 7.667L19.5 12l-3.666 1.317 1.341-1.317-1.341-1.317zm.916-.849l-1.934-1.934L19.5 12l-2.75 1.1 1.934-1.934zm-1.841-2.45L6.666 3.667c.7-.7 1.9-.3 2.15.75l6.091 2.966zm.925.45l2.25 2.25L14 10.5l1.925-3.117z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Get it on</p>
                  <p className="text-sm font-bold font-sans text-white">Google Play</p>
                </div>
              </a>
            </motion.div>

            {/* Micro proofs */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 pt-4 text-xs font-mono text-white/40"
            >
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#D4AF37]" /> Instant Balance Sync</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#D4AF37]" /> Gold-Tier Perks</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-[#D4AF37]" /> Secure Verification</span>
            </motion.div>
          </div>

           {/* Right Mockup Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative w-[310px] h-[610px] sm:w-[320px] bg-white/5 rounded-[48px] p-3.5 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              {/* Phone Speaker/Camera notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-white/5 border-b border-x border-white/10 rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-12 h-1 bg-white/10 rounded-full mb-1" />
              </div>

              {/* Internal Screen Area */}
              <div className="w-full h-full rounded-[38px] bg-[#0F172A]/90 p-4 pt-10 flex flex-col justify-between relative overflow-hidden border border-white/10">
                {/* Embedded dynamic glow */}
                <div className="absolute top-[-100px] right-[-50px] w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* App Screen Header */}
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] flex items-center justify-center text-[#0F172A] font-bold text-xs">
                      F
                    </div>
                    <div>
                      <h4 className="text-[10px] font-display font-semibold text-slate-300">Fegno Loyalty</h4>
                      <p className="text-[8px] font-mono text-white/50">Alex Mercer</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[8px] font-mono flex items-center gap-1">
                    <Flame className="h-2 w-2" /> Gold Member
                  </div>
                </div>

                {/* Main Card Widget Area */}
                <div className="my-auto py-4 flex flex-col gap-4">
                  {/* Sliding control tabs */}
                  <div className="flex gap-1 p-0.5 bg-white/5 rounded-lg border border-white/10 text-[10px] z-10">
                    <button 
                      onClick={() => { setActiveTab('card'); setIsFlipped(false); }}
                      className={`flex-1 py-1 rounded text-center font-bold tracking-tight transition-all uppercase text-[9px] ${activeTab === 'card' ? 'bg-[#D4AF37] text-[#0F172A]' : 'text-white/50 hover:text-white'}`}
                    >
                      Card
                    </button>
                    <button 
                      onClick={() => { setActiveTab('perks'); setIsFlipped(false); }}
                      className={`flex-1 py-1 rounded text-center font-bold tracking-tight transition-all uppercase text-[9px] ${activeTab === 'perks' ? 'bg-[#D4AF37] text-[#0F172A]' : 'text-white/50 hover:text-white'}`}
                    >
                      Perks
                    </button>
                    <button 
                      onClick={() => { setActiveTab('qr'); setIsFlipped(true); }}
                      className={`flex-1 py-1 rounded text-center font-bold tracking-tight transition-all uppercase text-[9px] ${activeTab === 'qr' ? 'bg-[#D4AF37] text-[#0F172A]' : 'text-white/50 hover:text-white'}`}
                    >
                      Scan QR
                    </button>
                  </div>

                  {/* Interactive Flip Card Container */}
                  <div className="relative w-full h-[180px] perspective-[1000px] group cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-full h-full relative transform-style-3d duration-500"
                    >
                      {/* CARD FRONT */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-[#E6F4FE]/5 border border-white/10 flex flex-col justify-between backface-hidden shadow-lg overflow-hidden">
                        {/* Metallic Gold card decoration */}
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full border border-white/10" />
                        <div className="absolute right-4 top-4 opacity-15">
                          <Award className="h-16 w-16 text-[#D4AF37]" />
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[8px] font-mono text-[#D4AF37]/80 tracking-widest uppercase">Loyalty Premium Card</p>
                            <h3 className="text-sm font-display font-bold text-white mt-0.5 tracking-tight">Fegno Club</h3>
                          </div>
                          <div className="w-8 h-6 bg-gradient-to-tr from-[#D4AF37] to-[#F59E0B] rounded opacity-80 flex items-center justify-center text-[#0F172A] font-bold text-[8px] tracking-tighter">
                            CHIP
                          </div>
                        </div>

                        <div>
                          <p className="text-[9px] font-mono text-white/40">ACCUMULATED POINTS</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-display font-extrabold text-white tracking-tight">{points.toLocaleString()}</span>
                            <span className="text-xs font-mono font-bold text-[#D4AF37]">PTS</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-white/10 pt-2 text-[9px] font-mono">
                          <div>
                            <p className="text-white/40 text-[7px]">CARDHOLDER</p>
                            <p className="text-white/80 font-medium">Alex Mercer</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white/40 text-[7px]">MEMBERSHIP</p>
                            <p className="text-[#D4AF37] font-bold">GOLD LEVEL</p>
                          </div>
                        </div>
                      </div>

                      {/* CARD BACK */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl p-4 bg-[#0F172A] border border-white/10 flex flex-col justify-between rotate-y-180 backface-hidden shadow-lg">
                        <div className="w-full h-6 bg-white/5 rounded mt-1 border border-white/5" />
                        
                        <div className="flex flex-col items-center justify-center flex-1 py-2">
                          <div className="p-2.5 bg-white rounded-lg shadow-inner">
                            <QrCode className="h-14 w-14 text-slate-950" />
                          </div>
                          <p className="text-[8px] font-mono text-white/50 mt-2">Scan at register for credits</p>
                        </div>

                        <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
                          <span>Card Ref: #9048-1299</span>
                          <span className="text-[#D4AF37] font-bold">FEGNO LOYALTY ENG</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Subcard Dynamic Information Details */}
                  <div className="h-[145px] overflow-hidden">
                    {activeTab === 'card' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2 text-left"
                      >
                        <p className="text-[10px] font-mono text-white/50 font-bold tracking-wider uppercase mb-1">Recent Activity</p>
                        
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-[9px] font-sans font-bold text-white">Starbucks Coffee Roast</p>
                            <p className="text-[7px] font-mono text-white/40">Invoice: #A8201 • 10:20 AM</p>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#D4AF37]">+120 pts</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                          <div>
                            <p className="text-[9px] font-sans font-bold text-white">Apple Accessories Store</p>
                            <p className="text-[7px] font-mono text-white/40">Invoice: #B9440 • Yesterday</p>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#D4AF37]">+450 pts</span>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'perks' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-1.5 text-left text-[9.5px] text-white/70 font-sans"
                      >
                        <p className="text-[10px] font-mono text-white/50 font-bold tracking-wider uppercase mb-1">Active Gold Perks</p>
                        <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-[#D4AF37] flex-shrink-0" /> 1.5x Multiplier on scanning</div>
                        <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-[#D4AF37] flex-shrink-0" /> Free Shipping on catalog physical rewards</div>
                        <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-[#D4AF37] flex-shrink-0" /> Exclusive VIP ticket catalog access</div>
                        <div className="flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-[#D4AF37] flex-shrink-0" /> Priority 24/7 customer support line</div>
                      </motion.div>
                    )}

                    {activeTab === 'qr' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center p-2"
                      >
                        <p className="text-[10px] font-bold text-[#D4AF37] animate-pulse mb-1 tracking-wider">SCANNER ACTIVE</p>
                        <p className="text-[9px] text-white/50 max-w-[200px]">Hold the barcode or QR code on your loyalty card back under the counter camera to verify points immediately.</p>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Simulated Phone Bar Footer */}
                <div className="h-1 w-24 bg-white/20 rounded-full mx-auto" />
              </div>
            </motion.div>

            {/* Quick Helper under Mockup */}
            <p className="text-xs font-mono text-white/40 mt-4 flex items-center gap-1">
              <RotateCw className="h-3 w-3 text-[#D4AF37] animate-spin-slow" /> Tap on card mockup to flip & test
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
