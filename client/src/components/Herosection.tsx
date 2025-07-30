"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { Upload } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


function Herosection() {
  const { user } = useSelector((store: any) => store.auth);
  const router=useRouter()
  return (
    <HeroHighlight className="z-0 flex flex-col gap-3 items-center">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
       With ResumeX, nothing's missed. Every word matters. Every resume is
        <Highlight className="text-black dark:text-white">
           reviewed, not repeated
        </Highlight>
      </motion.h1>
      <div>
        <button onClick={()=>{

          if(user){
              router.push('/uploads')
          }
          else{
            router.push('/signup')
          }

        }} className=" flex  items-center justify-evenly gap-3 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear text-nowrap flex-nowrap h-12 ">
        Upload Resume <Upload/>
      </button>
      
      </div>
    </HeroHighlight>
  );
}
export default Herosection
