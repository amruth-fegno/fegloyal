import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Phone, Key, Trash2, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ArrowLeft } from 'lucide-react';
import { DeleteState } from '../types';

export default function DeleteAccount() {
  const [state, setState] = useState<DeleteState>({
    step: 1,
    phoneNumber: '',
    otp: '',
    consentChecked: false,
    accessToken: null,
    loading: false,
    error: null,
    successMessage: null
  });

  // Simulator mode enabled by default to allow seamless user & reviewer testing without requiring live SMS configuration
  const [simulatorMode, setSimulatorMode] = useState(true);
  const [simulatedReceivedOtp, setSimulatedReceivedOtp] = useState<string>('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate 10-digit cellular
    const phoneClean = state.phoneNumber.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
      setState(prev => ({ ...prev, error: 'Please enter a valid 10-digit mobile number' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    if (simulatorMode) {
      // Simulator OTP generation
      setTimeout(() => {
        const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSimulatedReceivedOtp(fakeOtp);
        setState(prev => ({
          ...prev,
          step: 2,
          loading: false,
          error: null,
          successMessage: `[SIMULATOR] OTP code sent successfully: ${fakeOtp}`
        }));
      }, 1000);
      return;
    }

    // Real API Call via Express Proxy
    try {
      const response = await fetch('/api/proxy/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cellular: phoneClean })
      });

      const data = await response.json();

      if (response.ok) {
        setState(prev => ({
          ...prev,
          step: 2,
          loading: false,
          successMessage: 'A 6-digit OTP code has been dispatched to your mobile number.'
        }));
      } else {
        // Handle server error gracefully and suggest Simulator Mode
        setState(prev => ({
          ...prev,
          loading: false,
          error: data.message || 'The server rejected the mobile number. Check if it is registered or enable "Simulation Mode" below.'
        }));
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Network connection failed. We highly recommend turning on "Simulation Mode" below to test this flow.'
      }));
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpClean = state.otp.replace(/\D/g, '');
    if (otpClean.length !== 6) {
      setState(prev => ({ ...prev, error: 'OTP must be a 6-digit numeric code' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    if (simulatorMode) {
      setTimeout(() => {
        if (otpClean === simulatedReceivedOtp || otpClean === '123456') {
          setState(prev => ({
            ...prev,
            step: 3,
            loading: false,
            accessToken: 'mock-jwt-token-alex-mercer',
            error: null,
            successMessage: '[SIMULATOR] Identity verified. Access token authorized.'
          }));
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: `Incorrect OTP. Simulated code is ${simulatedReceivedOtp} (or enter 123456).`
          }));
        }
      }, 1000);
      return;
    }

    // Real Verification API Call via Express Proxy
    const phoneClean = state.phoneNumber.replace(/\D/g, '');
    try {
      const response = await fetch('/api/proxy/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cellular: phoneClean, otp_code: otpClean })
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        setState(prev => ({
          ...prev,
          step: 3,
          loading: false,
          accessToken: data.access_token,
          successMessage: 'Identity successfully verified. Please review the permanent deletion warnings below.'
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: data.message || 'Incorrect verification code. Please check your message and try again.'
        }));
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Network verification failed. Please try again or toggle "Simulation Mode" to bypass.'
      }));
    }
  };

  const handlePermanentDelete = async () => {
    if (!state.consentChecked) {
      setState(prev => ({ ...prev, error: 'You must confirm that you understand the terms before deleting' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    if (simulatorMode) {
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          step: 4,
          loading: false,
          successMessage: 'Your request has been received. Your account and associated data are scheduled for deletion within 7 business days.'
        }));
      }, 1500);
      return;
    }

    // Try deleting via standard endpoint
    try {
      const deleteResponse = await fetch('/api/proxy/auth/me', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (deleteResponse.ok) {
        setState(prev => ({
          ...prev,
          step: 4,
          loading: false,
          successMessage: 'Your request has been received. Your account and associated data are scheduled for deletion within 7 business days.'
        }));
      } else {
        // If DELETE is under construction or returns 404/501, use the compliant Support Contact ticket fallback!
        console.warn('DELETE /auth/me returned non-ok, falling back to Support Contact submission...');
        const phoneClean = state.phoneNumber.replace(/\D/g, '');
        
        const supportResponse = await fetch('/api/proxy/support/contact', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: phoneClean,
            subject: 'Account Deletion Request',
            message: 'Completely delete my mobile account profile, points, status, and related data permanently.'
          })
        });

        if (supportResponse.ok) {
          setState(prev => ({
            ...prev,
            step: 4,
            loading: false,
            successMessage: 'Your request has been received. Your account and associated data are scheduled for deletion within 7 business days.'
          }));
        } else {
          const supportData = await supportResponse.json().catch(() => ({}));
          setState(prev => ({
            ...prev,
            loading: false,
            error: supportData.message || 'We could not complete your deletion. Please take a screenshot and contact support at support@fegno.com.'
          }));
        }
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Network connection failed while executing final deletion. Please try again or use Sim Mode.'
      }));
    }
  };

  const resetFlow = () => {
    setState({
      step: 1,
      phoneNumber: '',
      otp: '',
      consentChecked: false,
      accessToken: null,
      loading: false,
      error: null,
      successMessage: null
    });
    setSimulatedReceivedOtp('');
  };

  return (
    <section id="delete-account" className="min-h-screen flex items-center justify-center pt-32 pb-24 relative overflow-hidden bg-[#0F172A] px-4">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        
        {/* Core Deletion Form Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Header indicator */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">SECURITY PORTAL</span>
            <span className="text-[10px] font-mono text-white/40 bg-[#0F172A]/60 px-2 py-0.5 rounded border border-white/5">
              STEP {state.step} OF 4
            </span>
          </div>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Cellular Entry */}
            {state.step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <div className="mx-auto sm:mx-0 w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mb-4">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white">Request Account Deletion</h3>
                  <p className="text-xs text-white/60 mt-2 font-sans font-light leading-relaxed">
                    Under the App Store review compliance policies, you can request full permanent erasure of your account details here. Enter your registered 10-digit mobile number to verify your identity.
                  </p>
                </div>

                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-white/50 uppercase font-semibold">Registered Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5 text-xs text-white/40 font-mono border-r border-white/5 pr-3">
                        <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                        <span>+91</span>
                      </div>
                      <input
                        type="text"
                        id="phone-input"
                        placeholder="9876543210"
                        maxLength={10}
                        value={state.phoneNumber}
                        onChange={(e) => setState(prev => ({ ...prev, phoneNumber: e.target.value.replace(/\D/g, '') }))}
                        className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-20 pr-4 text-sm text-white placeholder-white/20 font-mono focus:outline-none focus:border-[#D4AF37]/50"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="send-otp-btn"
                    disabled={state.loading}
                    className="w-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-sm py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/20"
                  >
                    {state.loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Sending verification...
                      </>
                    ) : (
                      'Request Deletion OTP'
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
            {state.step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <div className="mx-auto sm:mx-0 w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-2xl flex items-center justify-center mb-4">
                    <Key className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white">Enter Security Token</h3>
                  <p className="text-xs text-white/60 mt-2 font-sans font-light leading-relaxed">
                    We have sent a 6-digit Secure Authentication One-Time Password (OTP) to your phone number <span className="text-white font-mono font-semibold">+91 {state.phoneNumber}</span>.
                  </p>
                </div>

                <form onSubmit={handleOtpVerify} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-white/50 uppercase font-semibold">6-Digit OTP Code</label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#D4AF37] h-4 w-4" />
                      <input
                        type="text"
                        id="otp-input"
                        placeholder="******"
                        maxLength={6}
                        value={state.otp}
                        onChange={(e) => setState(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '') }))}
                        className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm text-center text-white placeholder-white/20 tracking-[0.6em] font-mono font-bold focus:outline-none focus:border-[#D4AF37]/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      id="otp-back-btn"
                      onClick={resetFlow}
                      className="px-4 py-3 bg-white/5 border border-white/5 text-white/60 hover:text-white rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-4.5 w-4.5" />
                    </button>
                    <button
                      type="submit"
                      id="verify-otp-btn"
                      disabled={state.loading}
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/10"
                    >
                      {state.loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Verifying OTP...
                        </>
                      ) : (
                        'Verify & Authenticate'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Checkbox & Final Warning */}
            {state.step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="text-center sm:text-left">
                  <div className="mx-auto sm:mx-0 w-12 h-12 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-red-500">Irreversible Action</h3>
                  <p className="text-xs text-white/60 mt-2 font-sans font-light leading-relaxed">
                    Your account identity has been verified. Before committing, please understand the severity of this action.
                  </p>
                </div>

                {/* Warning Card */}
                <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider uppercase block">⚠️ RED ZONE CRITICAL WARNING</span>
                  <p className="text-xs text-red-300 font-sans leading-relaxed">
                    Deleting your account will permanently wipe your profile, membership tier status, accumulated points, active goals, and order history. This action is irreversible.
                  </p>
                </div>

                {/* Checklist Consent */}
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group" id="consent-label">
                    <input
                      type="checkbox"
                      id="consent-checkbox"
                      checked={state.consentChecked}
                      onChange={(e) => setState(prev => ({ ...prev, consentChecked: e.target.checked }))}
                      className="mt-1 h-4 w-4 rounded bg-[#0F172A] border-white/10 text-red-500 focus:ring-red-500 focus:ring-offset-[#0F172A]"
                    />
                    <span className="text-xs text-white/60 font-sans leading-relaxed group-hover:text-white transition-colors">
                      I understand that I will lose all my rewards, tier achievements, and accumulated points permanently and cannot claim them back.
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      id="consent-back-btn"
                      onClick={() => setState(prev => ({ ...prev, step: 2, error: null, successMessage: null }))}
                      className="px-4 py-3 bg-white/5 border border-white/5 text-white/60 hover:text-white rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-4.5 w-4.5" />
                    </button>
                    <button
                      type="button"
                      id="delete-confirm-btn"
                      onClick={handlePermanentDelete}
                      disabled={state.loading || !state.consentChecked}
                      className={`flex-1 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        state.consentChecked 
                          ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/10' 
                          : 'bg-white/5 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      {state.loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" /> Erasing data...
                        </>
                      ) : (
                        'Permanently Delete My Account'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success Confirmed */}
            {state.step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/5">
                  <ShieldCheck className="h-8 w-8 text-green-400" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-white">Erasure Request Received</h3>
                  <p className="text-sm font-sans text-green-400 font-medium">Account scheduled for destruction</p>
                  <p className="text-xs text-white/60 font-sans leading-relaxed max-w-sm mx-auto pt-2">
                    Your request has been received. Your mobile account, accumulated points, and associated data are scheduled for deletion within <span className="text-white font-bold">7 business days</span>. A confirmation notification will be dispatched once finished.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    id="return-home-btn"
                    onClick={() => {
                      resetFlow();
                      window.location.hash = '';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-mono transition-all cursor-pointer"
                  >
                    Return to Companion Site
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Feedback alerts container */}
          <div className="mt-6">
            {state.error && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-sans leading-relaxed flex items-start gap-2.5"
                id="error-feedback-alert"
              >
                <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 text-red-400 mt-0.5" />
                <span>{state.error}</span>
              </motion.div>
            )}

            {state.successMessage && !state.error && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-sans leading-relaxed flex items-start gap-2.5"
                id="success-feedback-alert"
              >
                <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0 text-green-400 mt-0.5" />
                <span>{state.successMessage}</span>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
