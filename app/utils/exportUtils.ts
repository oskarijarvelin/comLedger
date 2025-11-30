/**
 * Export Utilities for Transcript Management
 * 
 * Provides functions to export transcripts in multiple formats:
 * - CSV: Excel-compatible with UTF-8 BOM encoding
 * - PDF: Print-ready format with highlights and timestamps
 * 
 * @module exportUtils
 */

import { HighlightRule } from '../hooks/useSettings';
import { applyHighlightsToHTML } from './highlightUtils';

/**
 * Represents a single transcript entry with timestamp
 */
interface TranscriptItem {
  timestamp: string;
  text: string;
}

/**
 * Export Transcripts as CSV File
 * 
 * Creates a CSV file with UTF-8 BOM (Byte Order Mark) for proper encoding
 * in Microsoft Excel and other spreadsheet applications.
 * 
 * CSV Format:
 * - Header row: "Timestamp,Text"
 * - Each transcript as a row with timestamp and text
 * - Text fields are quoted and escaped for CSV safety
 * 
 * Filename Format: `{filename}_{YYYY-MM-DD}.csv`
 * 
 * @param transcripts - Array of transcript items to export
 * @param filename - Base filename (default: 'transcripts')
 * 
 * @example
 * ```typescript
 * const transcripts = [
 *   { timestamp: '14:30:45', text: 'Hello world' },
 *   { timestamp: '14:30:50', text: 'Second transcript' }
 * ];
 * exportAsCSV(transcripts, 'meeting_notes');
 * // Downloads: meeting_notes_2025-11-30.csv
 * ```
 */
export function exportAsCSV(transcripts: TranscriptItem[], filename: string = 'transcripts') {
  // Create CSV content
  const headers = ['Timestamp', 'Text'];
  const rows = transcripts.map(item => [
    item.timestamp,
    `"${item.text.replace(/"/g, '""')}"` // Escape quotes in CSV
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export Transcripts as PDF via Browser Print Dialog
 * 
 * Opens a new browser window with formatted HTML content optimized for printing.
 * User can save as PDF using browser's print dialog (Ctrl+P -> Save as PDF).
 * 
 * Features:
 * - Professional layout with header and metadata
 * - Preserves text highlights with colors (print-color-adjust CSS)
 * - Timestamped filename for easy organization
 * - Print-optimized styling (margins, page breaks, fonts)
 * - Partial match indicators preserved in PDF
 * 
 * Filename Format: `comLedger_{YYYY-MM-DD}_{HH-MM-SS}.pdf`
 * 
 * Technical Details:
 * - Uses window.open() to create print preview
 * - Automatically triggers print dialog on load
 * - Closes preview window after printing
 * - Requires popup permission from browser
 * 
 * @param transcripts - Array of transcript items to export
 * @param title - Application title for PDF header
 * @param confirmedTitle - Section title for transcripts
 * @param dateLabel - Label for date field (localized)
 * @param totalLabel - Label for transcript count (localized)
 * @param highlightRules - Array of highlight rules to apply
 * @param partialMatchHighlight - Enable partial word matching
 * @returns true if print window opened successfully, false if blocked
 * 
 * @example
 * ```typescript
 * const success = exportAsPDF(
 *   transcripts,
 *   'comLedger',
 *   'Confirmed Transcripts',
 *   'Date',
 *   'Total Transcripts',
 *   highlightRules,
 *   true
 * );
 * if (!success) {
 *   alert('Please allow popups to export PDF');
 * }
 * ```
 */
export function exportAsPDF(
  transcripts: TranscriptItem[], 
  title: string, 
  confirmedTitle: string,
  dateLabel: string = 'Date',
  totalLabel: string = 'Total Transcripts',
  highlightRules: HighlightRule[] = [],
  partialMatchHighlight: boolean = true
): boolean {
  const printWindow = window.open('', '', 'width=800,height=600');
  if (!printWindow) {
    return false;
  }

  const currentDate = new Date().toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Generate timestamp for filename (YYYY-MM-DD_HH-MM-SS format)
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  const filename = `comLedger_${timestamp}`;

  // Generate HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      <style>
        @page {
          margin: 2cm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #2196F3;
          border-bottom: 3px solid #2196F3;
          padding-bottom: 10px;
          margin-bottom: 30px;
          font-size: 24px;
        }
        .meta {
          color: #666;
          font-size: 13px;
          margin-bottom: 30px;
        }
        .transcript {
          margin-bottom: 25px;
          padding: 15px;
          border-left: 4px solid #2196F3;
          background-color: #f5f5f5;
          page-break-inside: avoid;
        }
        .timestamp {
          color: #2196F3;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .text {
          font-size: 14px;
          line-height: 1.8;
        }
        /* Print-specific styles to ensure colors show */
        @media print {
          body {
            padding: 0;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      </style>
    </head>
    <body>
      <h1>${confirmedTitle}</h1>
      <div class="meta">
        <strong>${dateLabel}:</strong> ${currentDate}<br>
        <strong>${totalLabel}:</strong> ${transcripts.length}
      </div>
      ${transcripts.map((item, index) => `
        <div class="transcript">
          <div class="timestamp">🕒 ${item.timestamp}</div>
          <div class="text">${applyHighlightsToHTML(item.text, highlightRules, partialMatchHighlight)}</div>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then print
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    // Close window after printing (with a delay)
    setTimeout(() => {
      printWindow.close();
    }, 100);
  };

  return true;
}
