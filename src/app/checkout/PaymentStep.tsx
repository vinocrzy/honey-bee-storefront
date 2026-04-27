'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  type PaymentData,
  type RazorpayPaymentData,
  loadRazorpayScript,
  openRazorpayCheckout,
} from '@/services/payment';

interface PaymentStepProps {
  paymentData: PaymentData;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  onPaymentComplete: () => void;
  onPaymentFailed: (error: string) => void;
}

export function PaymentStep({
  paymentData,
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
  total,
  onPaymentComplete,
  onPaymentFailed,
}: PaymentStepProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'failed'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

  const handleRazorpayPayment = useCallback(
    async (data: RazorpayPaymentData) => {
      setStatus('processing');
      setProcessing(true);
      try {
        await openRazorpayCheckout(data, {
          order_number: orderNumber,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        });
        setStatus('success');
        onPaymentComplete();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Payment failed';
        if (message === 'Payment cancelled by user') {
          setStatus('ready');
          setProcessing(false);
          setErrorMessage('Payment was cancelled. You can retry or pay later.');
        } else {
          setStatus('failed');
          setErrorMessage(message);
          onPaymentFailed(message);
        }
      }
    },
    [orderNumber, customerName, customerEmail, customerPhone, onPaymentComplete, onPaymentFailed]
  );

  useEffect(() => {
    if (!paymentData || paymentData.gateway === 'manual') {
      onPaymentComplete();
      return;
    }

    if (paymentData.gateway === 'razorpay') {
      loadRazorpayScript().then((loaded) => {
        if (!loaded) {
          setStatus('failed');
          setErrorMessage('Failed to load payment gateway. Please try again.');
          return;
        }
        setStatus('ready');
        handleRazorpayPayment(paymentData);
      });
    } else if (paymentData.gateway === 'stripe') {
      setStatus('ready');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual/null payment — this shouldn't render, but safety net
  if (!paymentData || paymentData.gateway === 'manual') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface-container-lowest rounded-2xl sunlight-shadow p-8 max-w-md w-full mx-4 space-y-6 text-center">
        {/* Loading / Processing spinner */}
        {(status === 'loading' || status === 'processing') && (
          <>
            <div className="w-12 h-12 rounded-full border-3 border-outline-variant border-t-primary animate-spin mx-auto" />
            <h2 className="font-headline text-2xl text-[#1c1c19]">
              {status === 'loading' ? 'Loading Payment...' : 'Processing Payment...'}
            </h2>
            <p className="text-on-surface-variant text-sm">
              Please don&apos;t close this window. Your payment is being processed securely.
            </p>
          </>
        )}

        {/* Success */}
        {status === 'success' && (
          <>
            <span
              className="material-symbols-outlined text-green-600 mx-auto block"
              style={{ fontSize: '48px', fontVariationSettings: "'wght' 300" }}
            >
              check_circle
            </span>
            <h2 className="font-headline text-2xl text-[#1c1c19]">Payment Successful!</h2>
            <p className="text-on-surface-variant text-sm">
              Your payment of {fmt(total)} for order {orderNumber} has been received.
            </p>
            <p className="text-on-surface-variant text-xs">Redirecting to order confirmation...</p>
          </>
        )}

        {/* Ready / Cancelled — show retry for Razorpay */}
        {status === 'ready' && paymentData.gateway === 'razorpay' && (
          <>
            <span
              className="material-symbols-outlined text-primary mx-auto block"
              style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}
            >
              payment
            </span>
            <h2 className="font-headline text-2xl text-[#1c1c19]">Complete Your Payment</h2>
            <p className="text-on-surface-variant text-sm">
              Order {orderNumber} — {fmt(total)}
            </p>
            {errorMessage && (
              <p className="text-error text-sm bg-error/10 rounded-lg px-4 py-2">{errorMessage}</p>
            )}
            <div className="space-y-3">
              <button
                onClick={() => handleRazorpayPayment(paymentData)}
                disabled={processing}
                className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Pay Now — {fmt(total)}
              </button>
              <button
                onClick={() => {
                  router.push(`/orders/confirmation?order=${orderNumber}&payment=pending`);
                }}
                className="w-full text-on-surface-variant font-label uppercase tracking-widest text-xs py-3 hover:text-primary transition-colors"
              >
                Pay Later
              </button>
            </div>
          </>
        )}

        {/* Ready — Stripe (MVP placeholder) */}
        {status === 'ready' && paymentData.gateway === 'stripe' && (
          <>
            <span
              className="material-symbols-outlined text-primary mx-auto block"
              style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}
            >
              credit_card
            </span>
            <h2 className="font-headline text-2xl text-[#1c1c19]">Card Payment</h2>
            <p className="text-on-surface-variant text-sm">
              Stripe payment processing is being set up. Please contact us to complete your payment for order {orderNumber}.
            </p>
            <button
              onClick={() => {
                router.push(`/orders/confirmation?order=${orderNumber}&payment=pending`);
              }}
              className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              View Order Confirmation
            </button>
          </>
        )}

        {/* Failed */}
        {status === 'failed' && (
          <>
            <span
              className="material-symbols-outlined text-error mx-auto block"
              style={{ fontSize: '48px', fontVariationSettings: "'wght' 300" }}
            >
              error
            </span>
            <h2 className="font-headline text-2xl text-[#1c1c19]">Payment Failed</h2>
            <p className="text-on-surface-variant text-sm">{errorMessage}</p>
            <div className="space-y-3">
              {paymentData.gateway === 'razorpay' && (
                <button
                  onClick={() => {
                    setStatus('ready');
                    setErrorMessage(null);
                    handleRazorpayPayment(paymentData);
                  }}
                  className="honey-glow w-full text-white font-label font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Retry Payment
                </button>
              )}
              <button
                onClick={() => router.push(`/orders/confirmation?order=${orderNumber}&payment=pending`)}
                className="w-full text-on-surface-variant font-label uppercase tracking-widest text-xs py-3 hover:text-primary transition-colors"
              >
                Skip — Pay Later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
