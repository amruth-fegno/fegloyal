import React from 'react';
import { Flag, Trophy, Flame, TrendingUp, Bell, Sparkles, ArrowUpRight } from 'lucide-react';

export default function GoalJourneys() {
  const features = [
    {
      icon: <Flag className="h-6 w-6 text-[#D4AF37]" />,
      title: "Set Personal Goals",
      description: "Pick any premium item or high-value voucher from our catalog and designate it as your active Goal. This highlights your target and creates a dedicated tracking milestone."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#D4AF37]" />,
      title: "Visual Progress Velocity",
      description: "As you scan checkout invoices and earn points, watch your real-time visual progress bar fill up, indicating exactly how close you are to claiming your reward."
    },
    {
      icon: <Bell className="h-6 w-6 text-[#D4AF37]" />,
      title: "Milestone Notifications",
      description: "Get smart push notifications on your mobile device as you hit major benchmarks (e.g., 25%, 50%, and 75% progress), keeping you motivated on your loyalty journey."
    },
    {
      icon: <Flame className="h-6 w-6 text-[#D4AF37]" />,
      title: "Streak Multipliers",
      description: "Maintain a daily scanning streak in the app to unlock point multipliers, accelerating your journey towards unlocking locked goals even faster."
    }
  ];

  return (
    <section id="goals" className="py-24 bg-[#0F172A] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-mono font-bold uppercase mb-4 backdrop-blur-md">
            <Flag className="h-3.5 w-3.5 text-[#D4AF37]" /> Goal Tracking Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Targeted Goal Journeys
          </h2>
          <p className="text-white/60 mt-4 text-base font-sans font-light leading-relaxed">
            In the Fegno Loyalty app, point accumulation is purposeful. Define your aspirations, set rewards as milestones, and observe your dynamic progress with each verified purchase receipt.
          </p>
        </div>

        {/* Feature Grid / Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Core Journey features list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 bg-white/5 rounded-xl w-fit mb-5 border border-white/5 group-hover:border-[#D4AF37]/20 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-white/60 font-light font-sans leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Premium feature visual mock card (Non-simulation) */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8 relative backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Ambient gold mesh */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase">JOURNEY ARCHITECTURE</span>
              <h3 className="font-display font-extrabold text-2xl text-white leading-tight">Gamified Milestones</h3>
              <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                Our user testing proves that goal-oriented incentives elevate retention rate by 42%. By defining specific rewards as milestones, members scan physical invoices up to 3x more frequently.
              </p>
            </div>

            {/* Static Visual progress indicator mockup */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">ACTIVE GOAL TARGET</span>
                  <p className="font-display font-bold text-sm text-white">ANC Noise-Cancelling Headphones</p>
                </div>
                <Trophy className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
              </div>

              {/* Progress bar visualizer mockup */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-white/40">JOURNEY PROGRESS</span>
                  <span className="font-bold text-[#D4AF37]">74% COMPLETE</span>
                </div>
                
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 w-[74%]" />
                </div>

                <div className="flex justify-between text-[8px] font-mono text-white/40">
                  <span>4,800 PTS EARNED</span>
                  <span>6,500 PTS GOAL</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-[#D4AF37]" /> UNIFIED METRIC ENGINE</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#D4AF37]" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
