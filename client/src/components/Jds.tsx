"use client";

import { useEffect, useState } from "react";
;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ClipboardPaste } from "lucide-react";
import { useGetJdsQuery, useUploadJDMutation } from "@/lib/redux/api/resumeApi";
import dayjs from "dayjs";

export default function Jds() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jdText, setJdText] = useState("");
  const [fullJD,setFullJD]=useState('')
 const [uploadJD, { data, isSuccess, isLoading, error }] = useUploadJDMutation();
 const [message,setMessage]=useState('')
 const[jds,setJds]=useState([])

 const {data:getJdData,isLoading:getJdIsLoading,isSuccess:getJdSucess,error:getJdError}=useGetJdsQuery()
const handleUpload=async()=>{
    setFullJD(`title=${title} company=${company} jd=${jdText}`)
    await uploadJD(fullJD);

}
  useEffect(() => {
    if (isSuccess) {
      setMessage(data.message);
  
      setTitle("");
      setCompany("");
      setJdText("");
    } else if (error) {
      setMessage("Something went wrong while uploading.");
    }
  }, [isSuccess, isLoading, error]);
  useEffect(()=>{
    if(getJdSucess&&getJdData){
        setJds(getJdData.data)
    }
  },[getJdSucess,getJdData,getJdError])



  return (
    <div className="px-4 border-2 h-full border-violet-500 border-dashed ">
      {/* Upload Button */}
      <div className="flex  justify-center py-4 px-2 overflow-y-auto">
          <h3 className="text-3xl font-bold text-violet-700">Saved Job descriptions</h3>
        </div>
      <div className="flex justify-center ">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700">
              Paste Job Description <ClipboardPaste />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Paste Job Description</DialogTitle>
              <DialogDescription>
                Fill in job title, company, and paste the JD.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <Textarea
                placeholder="Paste JD here..."
                rows={6}
                className="h-50 overflow-y-auto"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <Button
                onClick={handleUpload}
                disabled={isLoading}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
              {message && (
                <p
                  className={`text-sm ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* List of Uploaded JDs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
        {isLoading ? (
          <p className="text-center col-span-full text-gray-600">
            Loading JDs...
          </p>
        ) : jds.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No job descriptions uploaded yet.
          </p>
        ) : (
          jds.map((jd: any) => (
            <div
              key={jd.id}
              className="border border-violet-300 rounded-xl p-4 shadow hover:shadow-md transition-all bg-white"
            >
              <h3 className="text-lg font-semibold text-violet-700">
                {jd.title}
              </h3>
              <p className="text-sm text-gray-600">{jd.company}</p>
              <p className="text-xs text-gray-500 mb-2">
                Uploaded: {dayjs(jd.createdAt).format("DD MMM YYYY, hh:mm A")}
              </p>
              <div className="text-sm text-gray-800 whitespace-pre-line line-clamp-6">
                {jd.description}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
