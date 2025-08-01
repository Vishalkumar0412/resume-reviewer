import { Loader2 } from "lucide-react";

const ReportLoading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center">
      <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center gap-4 animate-fade-in-up">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <h2 className="text-xl font-bold text-gray-800">
          Generating Your Report
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-xs">
          We're analyzing your resume and matching it with the job description. This won’t take long.
        </p>
      </div>
    </div>
  );
};

export default ReportLoading;
