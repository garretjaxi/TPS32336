import React, { useState, useEffect } from 'react';
import { X, Mail, Gift, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface VIPSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIPSignupModal: React.FC<VIPSignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [shouldShow, setShouldShow] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or signed up
    if (!isOpen) return;
    
    const vipDismissed = localStorage.getItem('vipModalDismissed');
    const vipSignedUp = localStorage.getItem('vipModalSignedUp');
    
    if (vipDismissed || vipSignedUp) {
      setShouldShow(false);
    }
  }, [isOpen]);

  const signupMutation = trpc.vip.signup.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setEmail('');
      setIsSubmitting(false);
      // Remember that user signed up
      localStorage.setItem('vipModalSignedUp', 'true');
      
      // Auto-close after 5 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 5000);
    },
    onError: (err: any) => {
      const errorMessage = err?.message || 'Failed to sign up. Please try again.';
      setError(errorMessage);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    signupMutation.mutate({ email });
  };

  // Don't render if modal is closed or already shown
  if (!isOpen) return null;
  if (!shouldShow) return null;

  const handleClose = () => {
    // Remember that user dismissed the modal
    localStorage.setItem('vipModalDismissed', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-8 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
            title="Close"
          >
            <X size={20} className="text-amber-900" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <Gift size={28} className="text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Join Our VIP List
            </h2>
          </div>
          <p className="text-amber-800 text-sm">
            Get exclusive deals and a 10% discount on your first booking
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-emerald-100 rounded-full p-4">
                  <Check size={32} className="text-emerald-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">You're In!</h3>
              <p className="text-gray-600 mb-4">
                Check your email for your exclusive discount code.
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">Your Discount Code:</p>
                <p className="text-2xl font-bold text-amber-600 font-mono">Online10</p>
                <p className="text-xs text-gray-600 mt-2">10% off your booking</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vip-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="vip-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting ? 'Signing Up...' : 'Get My 10% Discount'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
