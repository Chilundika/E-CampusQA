import * as XLSX from 'xlsx';
import { Registration } from './types';

export function exportToExcel(data: Registration[], filename: string = 'registrations') {
    const exportData = data.map((reg) => ({
        'First Name': reg.first_name,
        'Last Name': reg.last_name,
        'Email': reg.email,
        'Contact Number': reg.contact_number || '',
        'WhatsApp': reg.whatsapp_number || '',
        'Year of Study': reg.year_of_study || '',
        'Program': reg.program_name || '',
        'Will Attend': reg.will_attend,
        'Registered At': new Date(reg.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Auto-size columns
    const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
        wch: Math.max(key.length, ...exportData.map((row) => String((row as Record<string, unknown>)[key] || '').length)),
    }));
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `${filename}.xlsx`);
}
