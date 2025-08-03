import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import axios from "axios";
import { useGetResumesQuery } from "@/lib/redux/api/resumeApi";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { FileUser, Trash, Upload } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { toast } from "sonner";

const Resumes = () => {
  const { data, isSuccess, refetch } = useGetResumesQuery({});
  const resumes = isSuccess
    ? [...(data?.data || [])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : [];

  const [uploadPDFProcess, setUploadPDFProcess] = useState(false);
  const [uploadProcess, setUploadProcess] = useState(0);

  const handleFileUpload = async (files: File[]) => {
    const file = files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      setUploadPDFProcess(true);
      setUploadProcess(0);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/resume/upload-resume`,
        formData,
        {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProcess(Math.round((loaded * 100) / (total || 1)));
          },
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message || "Resume uploaded successfully.");
        refetch();
      } else {
        toast.error(res.data.message || "Upload failed.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong during upload."
      );
    } finally {
      setUploadPDFProcess(false);
      setUploadProcess(0);
    }
  };

  return (
    <div className="border-2 h-full border-violet-500 border-dashed overflow-y-auto">
      {/* Header */}
      <div className="flex justify-center py-4 px-2">
        <h3 className="text-3xl font-bold text-violet-700">Saved Resumes</h3>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="hover:bg-violet-700 bg-violet-600"
              disabled={uploadPDFProcess}
              id="upload-resume-btn"
            >
              {uploadPDFProcess ? "Uploading..." : "Upload Resume"}
              <Upload className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="leading-none font-medium">Upload Resume</h4>
                <p className="text-muted-foreground text-sm">
                  Add your resume for evaluating.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => {
                      const fileList = e.target.files;
                      if (fileList) {
                        handleFileUpload(Array.from(fileList));
                      }
                    }}
                  />
                </div>
                <Progress value={uploadProcess} />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Resume List */}
      <div className="py-4 px-4 m-2 flex flex-wrap bg-white h-[75%] overflow-y-auto">
        {resumes.length === 0 ? (
          <p className="text-sm text-gray-500">No resumes uploaded yet.</p>
        ) : (
          resumes.map((resume) => (
            <HoverCard key={resume.id}>
              <HoverCardTrigger asChild>
                <div className="flex flex-col h-28 w-28 border opacity-80 hover:shadow-2xl bg-white items-center hover:opacity-100 border-violet-300 m-2 p-3 cursor-pointer">
                  <FileUser size={70} color="#6c63ff" />
                  <p
                    className="text-violet-600 text-[0.6rem] font-bold truncate w-full text-center"
                    title={resume.title}
                  >
                    {resume.title}
                  </p>
                  <p className="text-[0.5rem] text-gray-500">
                    {dayjs(resume.createdAt).fromNow()}
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between gap-4">
                  <FileUser size={70} color="#6c63ff" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold text-violet-700">
                      Resume
                    </h4>
                    <p className="text-md font-semibold">{resume.title}</p>
                    <div className="text-muted-foreground text-sm font-semibold">
                      {new Date(resume.createdAt).toLocaleString("en-IN")}
                    </div>
                    <div className="flex justify-evenly rounded bg-red-500 cursor-pointer hover:bg-red-600 items-center text-xs text-white py-1 px-1 font-semibold">
                      <span>Delete Resume</span> <Trash size={15} />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Resumes;
