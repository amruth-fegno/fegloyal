import React from 'react';
import { Gift, Zap, Award, ShieldCheck, Smartphone, ArrowUpRight } from 'lucide-react';

export default function GiftCatalog() {
  const features = [
    {
      icon: <Gift className="h-6 w-6 text-[#D4AF37]" />,
      title: "Extensive Partner Catalog",
      description: "Access curated rewards across multiple categories including global e-vouchers, premium lifestyle goods, eco-friendly tech, and active travel gear."
    },
    {
      icon: <Award className="h-6 w-6 text-[#D4AF37]" />,
      title: "Tier-Based VIP Benefits",
      description: "Unlock high-value exclusive items and priority redemptions automatically as you climb from Bronze to Elite Gold status."
    },
    {
      icon: <Zap className="h-6 w-6 text-[#D4AF37]" />,
      title: "Instant Digital Fulfillment",
      description: "Digital vouchers and merchant partner promo codes are generated and credited immediately directly within your secure wallet."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-[#D4AF37]" />,
      title: "Unified Mobile Experience",
      description: "Claim products, manage active reward codes, and check real-time stock availability on the go via the Fegno Loyalty app."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />,
      title: "Secure Verification Protocol",
      description: "Every redemption uses one-time dynamic QR codes to ensure fraud-proof, instantaneous processing at merchant checkout points."
    }
  ];

  return (
    <section id="rewards" className="py-24 bg-[#0F172A] border-t border-white/5 relative">
      {/* Subtle backdrop light */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-mono font-bold uppercase mb-4 backdrop-blur-md">
            <Gift className="h-3.5 w-3.5 text-[#D4AF37]" /> Curated Catalog Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Rewards Engine
          </h2>
          <p className="text-white/60 mt-4 text-base font-sans font-light leading-relaxed">
            Discover how Fegno turns your everyday invoice scanning into premium milestones. Our unified rewards catalog operates directly inside your companion mobile wallet.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="p-3 bg-white/5 rounded-xl w-fit mb-5 border border-white/5 group-hover:border-[#D4AF37]/20 transition-colors">
                  {feat.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-white/60 font-light font-sans leading-relaxed">
                  {feat.description}
                </p>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-white/60 transition-colors">
                <span>MOBILE APP FEATURE</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37]" />
              </div>
            </div>
          ))}

          {/* Prompt CTA card */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/25 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl w-fit mb-5 border border-[#D4AF37]/20">
                <Smartphone className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">
                Redeem Rewards Instantly
              </h3>
              <p className="text-xs text-white/70 font-light font-sans leading-relaxed">
                Connect your account in the Fegno Loyalty app. Point balances are verified instantly with zero manual delays or approval pipelines.
              </p>
            </div>
            
            <div className="pt-6 mt-6">
              <a 
                href="#download"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:brightness-110 px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#D4AF37]/10 cursor-pointer"
              >
                Get Fegno Mobile <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
