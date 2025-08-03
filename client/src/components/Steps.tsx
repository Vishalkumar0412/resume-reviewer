"use client"
import React from "react";

import { Lightbulb, UploadCloud, Sparkles, FileSearch } from "lucide-react";
import {motion} from 'motion/react'

const steps = [
  {
    title: "Upload Resume",
    description: "Drag & drop or import your resume in PDF format.",
    icon: <UploadCloud size={32} className="text-indigo-600" />,
  },
  {
    title: "AI Analysis",
    description: "Get instant insights on grammar, layout, keywords, and tone.",
    icon: <Lightbulb size={32} className="text-indigo-600" />,
  },
  {
    title: "Smart Suggestions",
    description: "Receive AI-powered suggestions based on your target job.",
    icon: <Sparkles size={32} className="text-indigo-600" />,
  },
 {
  title: "View Matching Report",
  description: "Analyze how well your resume matches the selected job description.",
  icon: <FileSearch size={32} className="text-indigo-600" />,
}
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Steps = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <motion.div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          ResumeX makes resume optimization effortless in just 4 steps.
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Steps;
