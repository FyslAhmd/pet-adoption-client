import React from "react";
import { motion } from "framer-motion";
import icon1 from "../../../assets/HowItWork/1.png";
import icon2 from "../../../assets/HowItWork/2.png";
import icon3 from "../../../assets/HowItWork/3.png";
import icon4 from "../../../assets/HowItWork/4.png";

const howItWorksSteps = [
  {
    title: "Browse Pets",
    icon: icon1,
    description:
      "Explore loving cats, dogs, and more waiting for a forever home near you.",
  },
  {
    title: "Submit Request",
    icon: icon2,
    description:
      "Choose your ideal pet and send an adoption request to the shelter.",
  },
  {
    title: "Get Approved",
    icon: icon3,
    description:
      "Shelters will review your request and contact you if you're a good match.",
  },
  {
    title: "Bring Them Home",
    icon: icon4,
    description:
      "Complete the adoption process and welcome your new best friend home!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HowItWork = () => {
  return (
    <div className="my-8 md:my-12 lg:my-16 px-4 lg:px-16">
      <h1 className="font-bold text-3xl mb-4 text-center">How It Works</h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {howItWorksSteps.map((step, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-secondary rounded-2xl p-6 shadow-lg shadow-accent space-y-4 hover:shadow-xl transition-all"
          >
            <img
              src={step.icon}
              alt={`Step ${index + 1} icon`}
              className="w-12 h-12 object-contain"
            />
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="font-medium text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWork;
