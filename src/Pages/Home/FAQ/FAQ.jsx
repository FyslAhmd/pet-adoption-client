import React from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I adopt a pet?",
    answer:
      "Create an account as an adopter, browse available pets, and click 'Adopt Now' to send a request. The rescuer will review and respond shortly.",
  },
  {
    question: "How do I list a rescued pet for adoption?",
    answer:
      "Sign up as a rescuer, go to your dashboard, and fill out the pet listing form with details and photos. Once submitted, adopters can start applying.",
  },
  {
    question: "Is there a fee for adopting or listing pets?",
    answer:
      "No. Our platform is free for both adopters and rescuers to ensure every animal finds a loving home without cost barriers.",
  },
  {
    question: "What happens after I send an adoption request?",
    answer:
      "The rescuer will review your request and may contact you for more info. Once approved, you’ll be guided through the final adoption steps.",
  },
  {
    question: "Can I update or delete my pet listing?",
    answer:
      "Yes. As a rescuer, you can edit or remove any of your listings at any time from your dashboard.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FAQ = () => {
  return (
    <motion.div
      className="w-full space-y-6 mt-8 md:my-12 lg:my-16 px-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-4xl text-center font-extrabold"
        variants={item}
      >
        Frequently Asked Questions (FAQ)
      </motion.h1>
      <motion.p
        className="text-center w-11/12 md:w-4/6 mx-auto text-gray-600"
        variants={item}
      >
        Learn how to adopt or list pets, manage your account, and understand how our platform supports animal welfare.
      </motion.p>

      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="collapse collapse-arrow border border-base-300 bg-white transition-all duration-300"
          variants={item}
        >
          <input
            type="radio"
            name="faq-accordion"
            className="peer"
            defaultChecked={index === 0}
          />
          <div className="collapse-title font-semibold peer-checked:bg-gray-200">
            {faq.question}
          </div>
          <div className="collapse-content text-sm text-gray-700 peer-checked:bg-gray-200">
            {faq.answer}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQ;
