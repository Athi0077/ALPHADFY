import React, { useState, useEffect, useRef } from 'react';

const rawApiUrl = (import.meta.env.VITE_API_URL || 'https://alphadfy.onrender.com').trim();
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');
const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiries`;

export default function QuoteModal({ isOpen, onClose, initialPlan = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: initialPlan,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const nameInputRef = useRef(null);

  // Sync initialPlan when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        plan: initialPlan || prev.plan,
      }));
      setMessage({ type: '', text: '' });
      setIsSubmitting(false);

      // Focus first input
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialPlan]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    const { name, email, phone, plan } = formData;

    // Client-side validations
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your full name.' });
      nameInputRef.current?.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setMessage({ type: 'error', text: 'Please enter a valid phone number.' });
      return;
    }

    if (!plan) {
      setMessage({ type: 'error', text: 'Please select a product / insurance type.' });
      return;
    }

    // Clear previous messages and start loading
    setMessage({ type: '', text: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          insuranceType: plan,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        // Success state
        setMessage({
          type: 'success',
          text: 'Enquiry submitted successfully. Our team will contact you shortly.',
        });

        // Reset form
        setFormData({ name: '', email: '', phone: '', plan: '' });

        // Close modal after a short delay
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        // Server or email failure
        setMessage({
          type: 'error',
          text: result?.message || 'Unable to submit your enquiry. Please try again.',
        });
      }
    } catch (err) {
      console.error('[Enquiry submission network error]:', err);
      // Network or connection error: keep entered data
      setMessage({
        type: 'error',
        text: 'Unable to submit your enquiry. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      className="fixed inset-0 z-50 bg-[#0B1220]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-[#101827] rounded-3xl border-2 border-[#D9A441]/35 p-7 sm:p-10 shadow-2xl animate-modal overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-radial from-[#D9A441]/15 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close enquiry modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-[#D9A441]/20 border border-slate-300 dark:border-white/10 hover:border-[#D9A441] text-slate-500 dark:text-slate-300 hover:text-[#B88328] dark:hover:text-[#F4C65D] flex items-center justify-center text-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2px] uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]" />
            GET A FREE QUOTE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Find Your
            <span className="text-gold-gradient ml-2">Coverage</span>
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#18243C] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20 transition-all text-sm disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#18243C] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20 transition-all text-sm disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. +91 9600669737"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#18243C] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20 transition-all text-sm disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1">
              Product / Insurance Type
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#18243C] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white focus:outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20 transition-all text-sm disabled:opacity-70 cursor-pointer"
            >
              <option value="">Select Insurance Type</option>
              <option value="Health Insurance">Health Insurance</option>
              <option value="General Insurance">General Insurance</option>
              <option value="Life Insurance">Life Insurance</option>
              <option value="Other Insurance">Other Insurance</option>
            </select>
          </div>

          {/* Submit Button with Loading State */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-base tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#0B1220]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <span>Submit Enquiry</span>
              )}
            </button>
          </div>

          {/* Feedback Message */}
          {message.text && (
            <div
              className={`p-3.5 rounded-xl text-sm font-semibold transition-all ${
                message.type === 'success'
                  ? 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/30'
                  : 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/30'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
