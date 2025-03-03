'use client';
import { useState, useEffect, useRef } from 'react';
import { generateUserReport } from '@/lib/actions/user';
import { useUser } from '@clerk/nextjs';
import { jsPDF } from 'jspdf';

export default function ReportPage() {
  const { user } = useUser();
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (user) {
          const report = await generateUserReport(user.id);
          setReportData(report);
        }
      } catch (err) {
        console.error('Failed to fetch report:', err);
        setError('Could not fetch report data');
      }
    };
    fetchReport();
  }, [user]);

  const handleDownloadPDF = () => {
    if (!reportData) {
      alert('No report data available');
      return;
    }

    try {
      // Create a new PDF document
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.text('DevDiscuss User Report', 10, 20);

      // Add user and date information
      doc.setFontSize(12);
      doc.text(`Generated for: ${reportData.username}`, 10, 30);
      doc.text(`Generated on: ${new Date(reportData.reportGeneratedAt).toLocaleString()}`, 10, 40);

      // Add report metrics
      doc.setFontSize(14);
      doc.text('Report Metrics:', 10, 60);

      doc.setFontSize(12);
      doc.text(`Questions Asked: ${reportData.questionsAsked}`, 10, 70);
      doc.text(`Questions Answered: ${reportData.questionsAnswered}`, 10, 80);
      doc.text(`Total Upvotes: ${reportData.upvotes}`, 10, 90);
      doc.text(`Total Downvotes: ${reportData.downvotes}`, 10, 100);

      // Generate filename
      const filename = `DevDiscuss_Report_${reportData.username}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Save the PDF
      doc.save(filename);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert(`Failed to generate PDF: ${err.message}`);
    }
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {reportData && (
        <div className="bg-white shadow-md rounded p-6 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold">DevDiscuss User Report</h2>
            <p className="text-gray-600">Generated for {reportData.username}</p>
            <p className="text-sm text-gray-500">
              Generated on: {new Date(reportData.reportGeneratedAt).toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Questions Asked</h2>
              <p className="text-3xl font-bold">{reportData.questionsAsked}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Questions Answered</h2>
              <p className="text-3xl font-bold">{reportData.questionsAnswered}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Total Upvotes</h2>
              <p className="text-3xl font-bold text-green-600">{reportData.upvotes}</p>
            </div>
            <div className="bg-red-100 p-4 rounded">
              <h2 className="text-lg font-semibold mb-2">Total Downvotes</h2>
              <p className="text-3xl font-bold text-red-600">{reportData.downvotes}</p>
            </div>
          </div>
        </div>
      )}
      {reportData && (
        <div className="mt-4 text-center">
          <button 
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
}