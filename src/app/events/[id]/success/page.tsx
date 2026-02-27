'use client';

import { Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation';
import CancelTimer from '@/components/CancelTimer';
import { CheckCircle, PartyPopper } from 'lucide-react';
import Link from 'next/link';

function SuccessContent({ eventId }: { eventId: string }) {
    const searchParams = useSearchParams();
    const registrationId = searchParams.get('rid') || '';
    const createdAt = searchParams.get('created') || new Date().toISOString();

    return (
        <div className="max-w-lg mx-auto px-4 py-16">
            <div className="text-center mb-8 animate-slide-up">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
                    style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.2))' }}>
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">You&apos;re Registered!</h1>
                <p className="text-gray-500 flex items-center justify-center gap-2">
                    <PartyPopper className="w-5 h-5" />
                    Your spot has been secured.
                </p>
            </div>

            {/* Cancel Timer */}
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <CancelTimer
                    registrationId={registrationId}
                    createdAt={createdAt}
                    eventId={eventId}
                />
            </div>

            <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm transition">
                    ← Browse more events
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent eventId={resolvedParams.id} />
        </Suspense>
    );
}
