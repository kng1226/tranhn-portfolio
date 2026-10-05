/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tranhn.work@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-heading"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#06141a]/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-lg rounded-2xl border border-[#F3E7D0]/20 bg-[#0e242d]/90 backdrop-blur-2xl p-8 sm:p-10 text-[#F3E7D0] shadow-[0_24px_60px_rgba(0,0,0,0.5)] z-10 transition-transform duration-300">
        {/* Top bar with close button */}
        <div className="flex items-center justify-between pb-6 border-b border-[#F3E7D0]/10">
          <div>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#F3E7D0]/50 block">
              COMMUNICATION
            </span>
            <h3 id="contact-heading" className="font-serif text-2xl text-[#F3E7D0] mt-1 font-normal">
              Direct Inquiries
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full border border-[#F3E7D0]/20 flex items-center justify-center text-[#F3E7D0]/60 hover:text-[#F3E7D0] hover:bg-[#F3E7D0]/10 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F3E7D0]/60 cursor-pointer"
            aria-label="Close contact dialog"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <span className="font-serif text-2xl text-[#F3E7D0] block mb-2">Message Dispatched</span>
            <p className="font-sans text-xs text-[#F3E7D0]/60 max-w-xs mx-auto">
              Thank you for reaching out. Trâm Anh will respond promptly.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Copy Contact Line */}
            <div className="mt-6 flex items-center justify-between p-3.5 rounded-lg border border-[#F3E7D0]/15 bg-white/5">
              <div>
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#F3E7D0]/40 block">
                  PRIMARY CORRESPONDENCE
                </span>
                <a
                  href="mailto:tranhn.work@gmail.com"
                  className="font-sans text-xs text-[#F3E7D0]/90 tracking-wide font-medium hover:text-[#F3E7D0] hover:underline transition-colors"
                >
                  tranhn.work@gmail.com
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="px-3 py-1.5 rounded border border-[#F3E7D0]/25 text-[9px] uppercase font-sans tracking-[0.14em] text-[#F3E7D0] hover:bg-[#F3E7D0]/15 transition-all cursor-pointer"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* Note form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/60 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F3E7D0]/20 bg-black/25 text-[#F3E7D0] placeholder-[#F3E7D0]/30 font-sans text-xs focus:outline-none focus:border-[#F3E7D0]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/60 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F3E7D0]/20 bg-black/25 text-[#F3E7D0] placeholder-[#F3E7D0]/30 font-sans text-xs focus:outline-none focus:border-[#F3E7D0]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/60 mb-1.5">
                  Topic & Context
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Brief overview of partnership, investment, or technological collaboration..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#F3E7D0]/20 bg-black/25 text-[#F3E7D0] placeholder-[#F3E7D0]/30 font-sans text-xs focus:outline-none focus:border-[#F3E7D0]/50 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[10px] uppercase font-sans tracking-[0.16em] text-[#F3E7D0]/60 hover:text-[#F3E7D0] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full border border-[#F3E7D0]/30 bg-[#F3E7D0]/15 px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0] hover:bg-[#F3E7D0]/25 transition-all cursor-pointer"
                >
                  Send Transmission ↗
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
