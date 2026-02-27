'use server';

import { headers } from 'next/headers';

export async function getClientIp(): Promise<string> {
    const headersList = await headers();

    // Try various headers in order of reliability
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
        // x-forwarded-for can contain multiple IPs; first one is the client
        return forwardedFor.split(',')[0].trim();
    }

    const realIp = headersList.get('x-real-ip');
    if (realIp) {
        return realIp.trim();
    }

    // Fallback
    return headersList.get('cf-connecting-ip')
        || headersList.get('x-client-ip')
        || 'unknown';
}
