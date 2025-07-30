
"use client"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Uploads() {
    const resume=[
        {
        key:"value"
    },
        {
        key:"value"
    },
        {
        key:"value"
    },
        {
        key:"value"
    },
]
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-[90vh] max-w-md rounded-lg border md:min-w-full mt-16"
    >
      <ResizablePanel defaultSize={25} minSize={25}>
        <div className="flex h-full flex-col items-center p-6">
          <div>
            <h3 className="text-3xl font-bold text-blue-500">Resumes</h3>
          </div>
          <div className="">
                {
                    resume.map((up,index)=>(
                        <>
                            <div>
                                {up.key}
                            </div>
                        </>
                    ))
                }
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} minSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
