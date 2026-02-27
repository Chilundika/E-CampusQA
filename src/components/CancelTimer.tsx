'use client';

import { useState, useEffect, useCallback } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { X, Clock, Loader2, Check } from 'lucide-react';

interface CancelTimerProps {
    registrationId: string;
    createdAt: string;
    eventId: string;
}

const CANCEL_WINDOW_MS = 60000; // 60 seconds

export default function CancelTimer({ registrationId, createdAt, eventId }: CancelTimerProps) {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<number>(CANCEL_WINDOW_MS);
    const [isCancelable, setIsCancelable] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const calculateTimeLeft = useCallback(() => {
        const created = new Date(createdAt);
        const now = new Date();
        const elapsed = differenceInMilliseconds(now, created);
        const remaining = CANCEL_WINDOW_MS - elapsed;
        return Math.max(0, remaining);
    }, [createdAt]);

    useEffect(() => {
        const remaining = calculateTimeLeft();
        if (remaining <= 0) {
            setIsCancelable(false);
            setTimeLeft(0);
            return;
        }

        setTimeLeft(remaining);
        const interval = setInterval(() => {
            const left = calculateTimeLeft();
            setTimeLeft(left);
            if (left <= 0) {
                setIsCancelable(false);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [calculateTimeLeft]);

    const handleCancel = async () => {
        if (!isCancelable || cancelling) return;
        setCancelling(true);

        try {
            const { error } = await supabase
                .from('registrations')
                .delete()
                .eq('id', registrationId);

            if (error) {
                console.error('Cancel error:', error);
                setCancelling(false);
                return;
            }

            // Clear registration cookie for this event
            try {
                const cookieName = 'campus_registered_events';
                const match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
                if (match) {
                    const events: string[] = JSON.parse(decodeURIComponent(match[2]));
                    const updated = events.filter((id: string) => id !== eventId);
                    const d = new Date();
                    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
                    document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(updated))};expires=${d.toUTCString()};path=/;SameSite=Lax`;
                }
            } catch { /* ignore cookie errors */ }

            setCancelled(true);
            setTimeout(() => {
                router.push(`/events/${eventId}`);
            }, 1500);
        } catch {
            setCancelling(false);
        }
    };

    if (cancelled) {
        return (
            <div className="glass-card p-6 text-center animate-fade-in">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-green-400 font-semibold">Registration cancelled successfully.</p>
                <p className="text-gray-500 text-sm mt-1">Redirecting...</p>
            </div>
        );
    }

    const seconds = Math.ceil(timeLeft / 1000);
    const progress = (timeLeft / CANCEL_WINDOW_MS) * 100;

    return (
        <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {isCancelable ? (
                    <span>You can cancel within <strong className="text-gray-900">{seconds}s</strong></span>
                ) : (
                    <span>Cancellation window has expired</span>
                )}
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                        width: `${progress}%`,
                        background: isCancelable
                            ? `linear-gradient(90deg, #f59e0b, #ef4444)`
                            : '#334155',
                    }}
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleCancel}
                    disabled={!isCancelable || cancelling}
                    className="btn-danger flex items-center justify-center gap-1.5 py-2 px-4 text-sm flex-1"
                >
                    {cancelling ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Cancelling…
                        </>
                    ) : (
                        <>
                            <X className="w-3.5 h-3.5" />
                            Cancel
                        </>
                    )}
                </button>
                <button
                    onClick={() => router.push('/?registered=true')}
                    className="btn-primary flex items-center justify-center gap-1.5 py-2 px-4 text-sm flex-1"
                >
                    <Check className="w-3.5 h-3.5" />
                    Confirm Registration
                </button>
            </div>
        </div>
    );
}
