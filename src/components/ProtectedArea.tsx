import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, LockKeyhole, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Page } from '../types';

interface ProtectedAreaProps {
  onPageChange: (page: Page) => void;
}

export default function ProtectedArea({ onPageChange }: ProtectedAreaProps) {
  const openDeletePortal = () => {
    onPageChange('delete-account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="protected-area"
      className="py-20 sm:py-24 bg-[#0B1324] relative overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-red-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-red-300">
                <LockKeyhole className="h-3.5 w-3.5" />
                Protected Area
              </span>

              <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Sensitive account actions stay behind a secure flow.
                </h2>
                <p className="max-w-xl text-sm sm:text-base font-sans font-light leading-relaxed text-white/65">
                  We removed destructive actions from the main header. Account deletion now lives in this protected compliance area, where users must verify identity before any permanent change can happen.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/60">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D4AF37]" />
                  <span>OTP-based verification is required before the deletion request can be submitted.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  <span>The portal clearly warns users before any irreversible account erasure step.</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-[#0F172A]/80 p-5 sm:p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/40">
                    Compliance Access
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
                    Verified Only
                  </span>
                </div>

                <div className="rounded-2xl border border-red-500/20 bg-red-500/8 p-4">
                  <p className="text-sm font-semibold text-white">Delete Account Portal</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    Use this only when a user needs to permanently remove their account and associated loyalty data.
                  </p>
                </div>

                <button
                  id="protected-delete-account-btn"
                  onClick={openDeletePortal}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-4 py-3 text-sm font-bold text-white transition-all hover:brightness-110 shadow-lg shadow-red-950/20 cursor-pointer"
                >
                  Open Protected Portal
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
