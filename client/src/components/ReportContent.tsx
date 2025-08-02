import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const ReportContent = ({ report }:any) => {
  if (!report) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mx-2 sm:mx-auto mt-6 px-4 sm:px-6 py-6 sm:py-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 md:overflow-auto md:max-h-[85vh] sm:max-w-4xl"
    >
      {/* Glare Box */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-indigo-100 via-white to-purple-100 opacity-30 blur-xl pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600 animate-pulse" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">Resume Analysis Report</h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Resume: <span className="font-medium">{report?.resume?.title}</span> | JD:{" "}
                <span className="font-medium">{report?.jd?.title}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs sm:text-sm text-gray-500">
            Generated: {new Date(report.createdAt).toLocaleString("en-IN")}
          </p>
        </motion.div>
      </div>

      {/* Score Bar */}
      <motion.div
        className="relative z-10 mb-5"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="font-semibold text-sm mb-1">Match Score</p>
        <div className="w-full bg-gray-200 h-4 rounded-full md:overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${report.score}%` }}
            transition={{ duration: 0.8 }}
            className={`h-4 rounded-full ${
              report.score > 70
                ? 'bg-green-500'
                : report.score > 40
                ? 'bg-yellow-400'
                : 'bg-red-400'
            }`}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {report.score}% match with the job description
        </p>
      </motion.div>

      {/* Feedback */}
      <motion.div
        className="relative z-10 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm sm:text-md font-semibold mb-1">Feedback</h3>
        <p className="text-sm text-gray-700">{report.feedback}</p>
      </motion.div>

      {/* Mistakes */}
      <motion.div
        className="relative z-10 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-sm sm:text-md font-semibold mb-2 text-red-600">Mistakes Found</h3>
        <ul className="list-disc pl-4 sm:pl-5 text-sm text-gray-700 space-y-1">
          {report?.mistakes?.map((item :any, index:any) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </motion.div>

      {/* Keywords */}
      <motion.div
        className="relative z-10 grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div>
          <h3 className="text-sm font-semibold text-green-600 mb-2">Matched Keywords</h3>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {report.keywordMatch.map((kw:any, index:any) => (
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-md border border-green-300 cursor-pointer"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-red-600 mb-2">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
            {report?.keywordMiss?.map((kw:any, index:any) => (
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={index}
                className="bg-red-100 text-red-700 px-2 py-1 rounded-md border border-red-300 cursor-pointer"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tone and Readability */}
      <motion.div
        className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-600 border-t pt-4 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>
          🗣️ Tone: <span className="font-medium text-gray-800">{report.tone}</span>
        </p>
        <p>
          📖 Readability: <span className="font-medium text-gray-800">{report.readability}</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ReportContent;
