"use client"
import { aboutData } from "@/helper/data/data";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants :any = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  },
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="px-6 py-10 space-y-20"
    >
      {aboutData.map((item, idx) => (
        <motion.div
          key={idx}
        variants={itemVariants}  


          className={`flex flex-col md:flex-row ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          } items-center gap-8`}
        >
          <div className="md:w-1/2">
            <Image
              src={item.image}
              alt={item.title}
              className="w-full max-h-[350px] object-contain rounded-2xl shadow-md"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {item.title}
            </h2>
            <p className="text-gray-600 text-lg">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default About;
