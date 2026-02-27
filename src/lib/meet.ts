/**
 * Generate a Gmail Compose URL with BCC for all attendee emails.
 * This opens Gmail in a new tab with all fields pre-filled.
 * Much more reliable than mailto: links.
 */
export function generateGmailComposeLink(
    emails: string[],
    meetUrl: string,
    eventTitle: string
): string {
    const bcc = emails.join(',');
    const subject = encodeURIComponent(`Join Us: ${eventTitle} — Google Meet Link`);
    const body = encodeURIComponent(
        `Hello!\n\nYou are registered for "${eventTitle}".\n\nJoin the session using the link below:\n${meetUrl}\n\nSee you there!\n\n— Campus Events Team`
    );

    return `https://mail.google.com/mail/?view=cm&fs=1&bcc=${bcc}&su=${subject}&body=${body}`;
}

/**
 * Legacy mailto: link generator (fallback)
 */
export function generateMailtoLink(
    emails: string[],
    meetUrl: string,
    eventTitle: string
): string {
    const bcc = emails.join(',');
    const subject = encodeURIComponent(`Join Us: ${eventTitle} — Google Meet Link`);
    const body = encodeURIComponent(
        `Hello!\n\nYou are registered for "${eventTitle}".\n\nJoin the session using the link below:\n${meetUrl}\n\nSee you there!\n\n— Campus Events Team`
    );

    return `mailto:?bcc=${bcc}&subject=${subject}&body=${body}`;
}

/**
 * Scaffold: Google Calendar API integration
 * 
 * To use this, you need:
 * 1. A Google Cloud project with Calendar API enabled
 * 2. A service account or OAuth2 credentials
 * 3. npm install google-auth-library googleapis
 * 
 * Example usage:
 * ```
 * import { google } from 'googleapis';
 * 
 * const auth = new google.auth.GoogleAuth({
 *   keyFile: 'path/to/service-account.json',
 *   scopes: ['https://www.googleapis.com/auth/calendar'],
 * });
 * 
 * const calendar = google.calendar({ version: 'v3', auth });
 * 
 * // Add attendees to an existing event
 * await calendar.events.patch({
 *   calendarId: 'primary',
 *   eventId: 'your-event-id',
 *   requestBody: {
 *     attendees: emails.map(email => ({ email })),
 *     conferenceData: {
 *       createRequest: { requestId: 'unique-id' },
 *     },
 *   },
 *   sendUpdates: 'all',
 *   conferenceDataVersion: 1,
 * });
 * ```
 */
export function scaffoldGoogleCalendarIntegration() {
    console.log(
        'Google Calendar API integration is scaffolded. ' +
        'See comments in src/lib/meet.ts for implementation details.'
    );
}
