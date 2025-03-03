'use client';
import { useState, useEffect } from 'react';
import { generateUserReport } from '@/lib/actions/user';
import { useUser } from '@clerk/nextjs';
import { jsPDF } from 'jspdf';
import { FaFileDownload, FaChartBar } from 'react-icons/fa';

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
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set up fonts and styles
      doc.setFont('helvetica', 'normal');
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(33, 33, 33);
      doc.text('DevDiscuss User Report', 105, 20, { align: 'center' });

      // Add user and date information
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated for: ${reportData.username}`, 105, 30, { align: 'center' });
      doc.text(`Generated on: ${new Date(reportData.reportGeneratedAt).toLocaleString()}`, 105, 40, { align: 'center' });

      // Add report metrics
      doc.setFontSize(14);
      doc.setTextColor(33, 33, 33);
      doc.text('Report Metrics', 105, 60, { align: 'center' });

      // Detailed metrics
      doc.setFontSize(12);
      doc.text(`Questions Asked: ${reportData.questionsAsked}`, 20, 80);
      doc.text(`Questions Answered: ${reportData.questionsAnswered}`, 20, 90);
      doc.text(`Total Upvotes: ${reportData.upvotes}`, 20, 100);
      doc.text(`Total Downvotes: ${reportData.downvotes}`, 20, 110);

      // Calculate voting percentages
      const totalVotes = reportData.upvotes + reportData.downvotes;
      const upvotePercentage = totalVotes > 0 
        ? Math.round((reportData.upvotes / totalVotes) * 100) 
        : 0;
      const downvotePercentage = totalVotes > 0 
        ? Math.round((reportData.downvotes / totalVotes) * 100) 
        : 0;

      doc.text(`Upvote Percentage: ${upvotePercentage}%`, 20, 120);
      doc.text(`Downvote Percentage: ${downvotePercentage}%`, 20, 130);

      // Generate filename
      const filename = `DevDiscuss_Report_${reportData.username}_${new Date().toISOString().split('T')[0]}.pdf`;

      // Save the PDF using window.open
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(pdfUrl);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert(`Failed to generate PDF: ${err.message}`);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white p-6 flex items-center">
          <FaChartBar className="mr-4 text-4xl" />
          <div>
            <h1 className="text-2xl font-bold">DevDiscuss User Report</h1>
            <p className="text-indigo-100">Your comprehensive activity overview</p>
          </div>
        </div>

        {reportData && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <h3 className="text-sm font-semibold text-gray-600">Questions Asked</h3>
                    <p className="text-2xl font-bold text-indigo-600">{reportData.questionsAsked}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <h3 className="text-sm font-semibold text-gray-600">Questions Answered</h3>
                    <p className="text-2xl font-bold text-green-600">{reportData.questionsAnswered}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <h3 className="text-sm font-semibold text-gray-600">Total Upvotes</h3>
                    <p className="text-2xl font-bold text-green-600">+{reportData.upvotes}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <h3 className="text-sm font-semibold text-gray-600">Total Downvotes</h3>
                    <p className="text-2xl font-bold text-red-600">-{reportData.downvotes}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={handleDownloadPDF}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
              >
                <FaFileDownload className="mr-2" /> Download PDF Report
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Generated on: {new Date(reportData.reportGeneratedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}