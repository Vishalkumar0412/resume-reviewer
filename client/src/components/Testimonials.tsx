"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonialsData } from "@/helper/data/data";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants  = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 60, damping: 15 },
  },
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="py-16 px-6 bg-gray-50"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What People Say About ResumeX
      </h2>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {testimonialsData.map((testimonial: { image: string; name: string; role: string; feedback: string }, idx: number) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-base">&quot;{testimonial.feedback}&quot;</p>
            </>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
