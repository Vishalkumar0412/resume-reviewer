"use client";
import {
  useGetJdsQuery,
  useGetReportsQuery,
  useGetReportsQueryuseGetJdsQuery,
  useGetResumesQuery,
  useReviewResumeMutation,
} from "@/lib/redux/api/resumeApi";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Proportions } from "lucide-react";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import ReportLoading from "@/components/ReportLoading";
import ReportContent from "@/components/ReportContent";

const Reports = () => {
  const { data: jdData, isSuccess: jdIsSuccess } = useGetJdsQuery();
  const { data: resumeData, isSuccess: resumeIsSuccess } = useGetResumesQuery();
  const [msg, setMsg] = useState("");

  const {
    data: reportsData,
    isSuccess: reportIsSuccess,
    error: reportError,
    refetch,
  } = useGetReportsQuery();

  const [jds, setJds] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [selectedJd, setSelectedJd] = useState<string | null>(null);
  console.log(selectedReport);
  
  const [reviewResume, { data, isSuccess, isLoading, error }] =
    useReviewResumeMutation();

  useEffect(() => {
    if (jdIsSuccess && jdData) {
      setJds(jdData.data);
    }
    if (resumeIsSuccess && resumeData) {
      setResumes(resumeData.data);
    }
  }, [jdIsSuccess, resumeIsSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResume || !selectedJd) {
      alert("Please select both resume and JD.");
      return;
    }
    await reviewResume({
      resumeId: selectedResume,
      jdId: selectedJd,
    });
  };
  useEffect(() => {
    if (isSuccess && data) {
      setMsg(data.message);
      refetch();
      setSelectedReport(reports.find(report => report?.id === data?.data?.id));
    }
    

  
  }, [isSuccess]);
  useEffect(() => {
    if (reportIsSuccess && reportsData) {
      setReports(reportsData.data);  
     
    
    }
    if(reports){
         setSelectedReport(reports[0])
    }
  }, [reportIsSuccess, reportsData]);

  if (isLoading) {
    return <ReportLoading />;
  }
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[85vh] px-2 bg-gray-100  max-w-md mt-18 rounded-lg border h-[80vh] min-w-screen z-0 overflow-auto"
    >
      <ResizablePanel defaultSize={25} minSize={25}>
        <div className="flex flex-col h-full gap-3 items-center p-6">
          <div className="flex items-center gap-3 flex-col ">
            <h2 className="text-3xl font-bold text-blue-600">Recent Reports</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Evaluate New Report</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      Match your resume with job description
                    </DialogTitle>
                    <DialogDescription>
                      Select Resume and Job Description to evaluate the match.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 mt-4 ">
                    <div className="grid gap-3 ">
                      <Label>Resume</Label>
                      <Select onValueChange={(val) => setSelectedResume(val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Resume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Resumes</SelectLabel>
                            {resumes.length === 0 ? (
                              <SelectItem disabled>No Resume found</SelectItem>
                            ) : (
                              resumes.map((resume) => (
                                <SelectItem key={resume.id} value={resume.id}>
                                  {resume.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label>Job Description</Label>
                      <Select onValueChange={(val) => setSelectedJd(val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Job Description" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Job Descriptions</SelectLabel>
                            {jds.length === 0 ? (
                              <SelectItem disabled>No JD found</SelectItem>
                            ) : (
                              jds.map((jd) => (
                                <SelectItem key={jd.id} value={jd.id}>
                                  {jd.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Evaluating.." : "Evaluate"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex-1 w-full h-[80%] overflow-auto  flex flex-col   gap-1">
            {reports.length === 0 ? (
              <p>Reports no found</p>
            ) : (
              reports.map((report: any) => {
                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={
                      selectedReport?.id === report.id
                        ? `flex gap-2 py-1 px-2 rounded hover:bg-gray-400 hover:shadow-xl bg-gray-300 shadow-md border border-gray-400 items-center w-full`
                        : `flex gap-2 py-1 px-2 rounded hover:bg-gray-100 hover:shadow-xl bg-gray-50 shadow-md border border-gray-300 items-center w-full`
                    }
                  >
                    <Proportions size={15} />
                    <div>
                      <p className="text-[0.6rem] font-semibold ">
                        {report.resume.title}
                      </p>
                      <p className="text-[0.6rem] font-semibold ">
                        {useTimeAgo(report.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={75} minSize={50} className="">
        {selectedReport ? (
          <ReportContent report={selectedReport} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a report to view details
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Reports;
