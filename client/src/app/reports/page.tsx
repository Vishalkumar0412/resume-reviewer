"use client";
import React, { useEffect, useState } from "react";
import {
  useGetJdsQuery,
  useGetReportsQuery,
  useGetResumesQuery,
  useReviewResumeMutation,
} from "@/lib/redux/api/resumeApi";

import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import { File, Plus, Proportions } from "lucide-react";
import { useTimeAgo } from "@/hooks/useTimeAgo";
import ReportLoading from "@/components/ReportLoading";
import ReportContent from "@/components/ReportContent"; // Replace with mobile-optimized if needed

const Reports = () => {
  const { data: jdData, isSuccess: jdIsSuccess } = useGetJdsQuery();
  const { data: resumeData, isSuccess: resumeIsSuccess } = useGetResumesQuery();
  const {
    data: reportsData,
    isSuccess: reportIsSuccess,
    refetch,
  } = useGetReportsQuery();

  const [msg, setMsg] = useState("");
  const [jds, setJds] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [selectedJd, setSelectedJd] = useState<string | null>(null);

  const [reviewResume, { data, isSuccess, isLoading }] =
    useReviewResumeMutation();

  useEffect(() => {
    if (jdIsSuccess && jdData) setJds(jdData.data);
    if (resumeIsSuccess && resumeData) setResumes(resumeData.data);
  }, [jdIsSuccess, resumeIsSuccess]);

  useEffect(() => {
    if (isSuccess && data) {
      setMsg(data.message);
      refetch();
      setSelectedReport(
        reports.find((report) => report?.id === data?.data?.id)
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (reportIsSuccess && reportsData) {
      setReports(reportsData.data);
      if (!selectedReport && reportsData.data.length > 0) {
        setSelectedReport(reportsData.data[0]);
      }
    }
  }, [reportIsSuccess, reportsData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResume || !selectedJd)
      return alert("Select both resume and JD.");
    await reviewResume({ resumeId: selectedResume, jdId: selectedJd });
  };

  if (isLoading) return <ReportLoading />;

  return (
    <>
      {/* Desktop View */}
      <div className="lg:block hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="px-2 bg-gray-100 mt-20 rounded-lg border h-[80vh] overflow-auto"
        >
          <ResizablePanel defaultSize={25}>
            <div className="flex flex-col  h-full gap-3 items-center p-6">
              <div className="flex items-center gap-3 flex-col">
                <h2 className="text-3xl font-bold text-blue-600">
                  Recent Reports
                </h2>
                <div>
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
                            Select Resume and Job Description to evaluate.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 mt-4">
                          <div className="grid gap-3">
                            <Label>Resume</Label>
                            <Select onValueChange={setSelectedResume}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Resume" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Resumes</SelectLabel>
                                  {resumes.length === 0 ? (
                                    <SelectItem disabled>
                                      No Resume found
                                    </SelectItem>
                                  ) : (
                                    resumes.map((r) => (
                                      <SelectItem key={r.id} value={r.id}>
                                        {r.title}
                                      </SelectItem>
                                    ))
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label>Job Description</Label>
                            <Select onValueChange={setSelectedJd}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a Job Description" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Job Descriptions</SelectLabel>
                                  {jds.length === 0 ? (
                                    <SelectItem disabled>
                                      No JD found
                                    </SelectItem>
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
                            {isLoading ? "Evaluating..." : "Evaluate"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex-1 w-full overflow-auto flex flex-col gap-1 mt-2">
                {reports.length === 0 ? (
                  <p>No reports found</p>
                ) : (
                  reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`cursor-pointer flex gap-2 py-1 px-2 rounded items-center w-full shadow-md border text-xs ${
                        selectedReport?.id === report.id
                          ? "bg-gray-300 border-gray-400"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <Proportions size={14} />
                      <div>
                        <p className="font-semibold truncate">
                          {report.resume.title}
                        </p>
                        <p className="text-[0.65rem] text-gray-600">
                          {useTimeAgo(report.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>
            {selectedReport ? (
              <ReportContent report={selectedReport} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Select a report to view details
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile View */}
      {/* Mobile View */}
      <div className="block lg:hidden p-4 space-y-4 mt-16">
        <h2 className="text-2xl font-bold text-blue-600 text-center">
          Reports
        </h2>

        <div className="flex justify-center">
          <Dialog>
            <DialogTrigger asChild >
              <Button>Evaluate New Report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    Match your resume with job description
                  </DialogTitle>
                  <DialogDescription>
                    Select Resume and Job Description to evaluate.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 mt-4">
                  <div className="grid gap-3">
                    <Label>Resume</Label>
                    <Select onValueChange={setSelectedResume}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Resume" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectGroup className="">
                          <SelectLabel>Resumes</SelectLabel>
                          {resumes.length === 0 ? (
                            <SelectItem disabled>No Resume found</SelectItem>
                          ) : (
                            resumes.map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label>Job Description</Label>
                    <Select onValueChange={setSelectedJd}>
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
                    {isLoading ? "Evaluating..." : "Evaluate"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {reports.map((report) => (
            <Sheet key={report.id}>
              <SheetTrigger asChild>
                <div
                  onClick={() => setSelectedReport(report)}
                  className={`cursor-pointer p-1 px-4 rounded-md border flex  gap-3 items-center shadow-sm ${
                    selectedReport?.id === report.id
                      ? "bg-blue-50 border-blue-300"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <File size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">
                      {report.resume.title}
                    </p>
                    <p className="text-[0.6rem] text-gray-500">
                      {useTimeAgo(report.createdAt)}
                    </p>
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent side="left" className="w-screen overflow-auto">
                <div className="mt-4">
                  <ReportContent report={report} />
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
