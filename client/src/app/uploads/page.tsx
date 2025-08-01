"use client";
import Resumes from "@/components/Resumes";
import Jds from "@/components/Jds";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Uploads() {
  return (
    <div className="flex flex-col  mt-16 bg-white sm:h-[90vh] md:min-h-[90vh] align-middle ">
      <Tabs
        defaultValue="resumes"
        className="px-6 py-5 m-2  h-full  "
      >
        <div>
          <h2 className="text-4xl font-bold text-blue-500 py-2 px-2">
            Saved Files
          </h2>
        </div>
        <TabsList>
          <TabsTrigger value="resumes">
            Resumes
          </TabsTrigger>
          <TabsTrigger value="jds" >
            Job descriptions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="resumes">
          <Resumes />
        </TabsContent>
        <TabsContent value="jds">
          <Jds />
        </TabsContent>
      </Tabs>
    </div>
  );
}
