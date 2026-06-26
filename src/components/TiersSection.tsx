import React from 'react';
import { Shield, Sparkles, Zap, Star, ShieldAlert, Timer } from 'lucide-react';

export default function TiersSection() {
  const upcomingTiers = [
    {
      name: 'Bronze Club',
      pointsRequired: '0 - 999 Pts',
      multiplier: '1.0x Multiplier',
      description: 'The foundation of your loyalty journey. Access standard redemptions and digital point cards.',
      color: 'text-amber-500/80'
    },
    {
      name: 'Silver Club',
      pointsRequired: '1,000 - 2,499 Pts',
      multiplier: '1.2x Multiplier',
      description: 'Unlock priority ticket response and dynamic flash-sale catalog redemptions.',
      color: 'text-slate-300'
    },
    {
      name: 'Gold Club',
      pointsRequired: '2,500 - 7,499 Pts',
      multiplier: '1.5x Multiplier',
      description: 'Free physical shipping, exclusive member events, and golden lifestyle options.',
      color: 'text-[#D4AF37]'
    },
    {
      name: 'Platinum Club',
      pointsRequired: '7,500+ Pts',
      multiplier: '2.0x Multiplier',
      description: 'Enjoy infinite point expiration, dedicated concierge, and luxury reward tiering.',
      color: 'text-cyan-400'
    }
  ];

  return (
    <section id="tiers" className="py-24 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-mono font-bold uppercase mb-4 backdrop-blur-md animate-pulse">
            <Timer className="h-3.5 w-3.5 text-[#D4AF37]" /> Feature Coming Soon
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tier & Multiplier System
          </h2>
          <p className="text-white/60 mt-4 text-base font-sans font-light leading-relaxed">
            We are currently developing the Fegno Tier Architecture. Soon, your verified invoice points will dynamically determine your loyalty rank, unlocking accelerated multipliers and premium perks.
          </p>
        </div>

        {/* Coming Soon Showcase Layout */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-md relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
          
          {/* Subtle gold decoration */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Box: Development Status Indicator */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl w-fit">
                <Shield className="h-8 w-8 text-[#D4AF37]" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase font-bold">SYSTEM STATUS: PENDING INTEGRATION</span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                  Loyalty Progression
                </h3>
                <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                  Our development team is configuring the real-time point-to-tier accumulation rules within the main companion database. Stay tuned for a seamless experience in the upcoming version update.
                </p>
              </div>

              {/* Progress status representation */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-white/40">INTEGRATION MILESTONES</span>
                  <span className="text-[#D4AF37] font-bold">85% PREPARED</span>
                </div>
                <div className="w-full h-2 bg-[#0F172A] rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-500 rounded-full w-[85%]" />
                </div>
                <p className="text-[9px] font-mono text-white/40 text-center pt-0.5">
                  Final security checks & multiplier stress-tests are in progress.
                </p>
              </div>
            </div>

            {/* Right Box: Upcoming Tiers Preview Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingTiers.map((tier) => (
                <div 
                  key={tier.name}
                  className="bg-[#0F172A]/50 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors relative group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                      {tier.name}
                    </h4>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${tier.color}`}>
                      {tier.pointsRequired}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 font-sans font-light leading-relaxed mb-4">
                    {tier.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
                    <Zap className="h-3 w-3 text-[#D4AF37]" />
                    <span>{tier.multiplier}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom informational footline */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-white/40">
            <span className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-[#D4AF37] animate-pulse" /> Unified Rank Governance Protocol
            </span>
            <span>ESTIMATED AVAILABILITY: COMPANION BUILD V1.1</span>
          </div>

        </div>

      </div>
    </section>
  );
}

