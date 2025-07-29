"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonialsData } from "@/helper/data/data";

const containerVariants:any = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants :any = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
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
        {testimonialsData.map((testimonial :any, idx: any) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4 space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 text-base">"{testimonial.feedback}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
