'use client';

import { Registration } from '@/lib/types';

interface DataTableProps {
    registrations: Registration[];
}

export default function DataTable({ registrations }: DataTableProps) {
    if (registrations.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-3">📋</div>
                <p>No registrations yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>WhatsApp</th>
                        <th>Year</th>
                        <th>Program</th>
                        <th>Attend</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((reg, index) => (
                        <tr key={reg.id}>
                            <td className="text-gray-400 font-mono text-sm">{index + 1}</td>
                            <td className="font-medium text-gray-900">
                                {reg.first_name} {reg.last_name}
                            </td>
                            <td className="text-blue-400">{reg.email}</td>
                            <td>{reg.contact_number || '—'}</td>
                            <td>{reg.whatsapp_number || '—'}</td>
                            <td className="text-center">{reg.year_of_study || '—'}</td>
                            <td>{reg.program_name || '—'}</td>
                            <td>
                                <span className={`badge ${reg.will_attend === 'YES'
                                        ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                    }`}>
                                    {reg.will_attend}
                                </span>
                            </td>
                            <td className="text-gray-400 text-sm">
                                {new Date(reg.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
