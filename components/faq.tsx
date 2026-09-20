"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import ArrowFillButton from "@/components/NewDesignComponents/ArrowFillButton";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLast: boolean;
}

function FAQItem({ question, answer, isOpen, onClick, isLast }: FAQItemProps) {
  return (
    <div
      className={
        "w-full " + (!isOpen && !isLast ? "border-b border-black/10" : "")
      }
    >
      <div
        className={
          "transition-all duration-700 " +
          (isOpen
            ? "bg-[#00BF63] rounded-[16px] p-6 my-4"
            : "py-[22px] bg-transparent")
        }
      >
        <button
          onClick={onClick}
          className="w-full text-left flex items-center justify-between gap-4 group"
        >
          <span
            className={
              "font-sans text-[15px] md:text-[16px] transition-all duration-500 " +
              (isOpen
                ? "font-bold text-white translate-x-1"
                : "font-medium text-[#999]")
            }
          >
            {question}
          </span>
          <div
            className={
              "flex-shrink-0 transition-all duration-500 " +
              (isOpen ? "text-white" : "text-[#555]")
            }
          >
            {isOpen ? <X size={18} /> : <Plus size={18} />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="faq-answer"
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{
                height: { duration: 0.5, ease: [0.2, 1, 0.3, 1] as const },
                opacity: { duration: 0.3, delay: 0.1 },
                y: { duration: 0.4, ease: "easeOut" as const },
              }}
              className="overflow-hidden"
            >
              <p className="font-sans text-[14px] text-white/85 leading-[1.8] mt-[14px] pr-4">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function FAQ({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "What does TooGood.agency actually do?",
      answer:
        "We are an early-stage UK online studio. We design and build websites, mobile apps, custom dashboards, and UI/UX — plus the connected work: SEO, ads, domain, email, and social.",
    },
    {
      question: "Are you based in the UK?",
      answer:
        "Yes. We are UK based and work online — no office visit required. Briefs, reviews, and launches happen remotely.",
    },
    {
      question: "Can you do only design, or only development?",
      answer:
        "Yes. Most briefs are both. We also take UI/UX-only, build-only, or a slice like a dashboard, chatbot, or SEO after a site is already live.",
    },
    {
      question: "Do you handle SEO, ads, and email as well?",
      answer:
        "Yes. 360 SEO, Google advertising, social media advertising, domain management, social management, and business email setup sit beside the main build.",
    },
    {
      question: "How do we start?",
      answer:
        "Send a short brief — what you need, who it is for, and when you want it live. We reply with scope, a package shape, and the next step.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={
        "w-full bg-[var(--new-site-background-color)] py-16 md:py-24 px-6 md:px-[60px] font-sans " +
        (className || "")
      }
    >
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="w-full lg:w-[40%] flex-shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
            alt="TooGood studio"
            referrerPolicy="no-referrer"
            className="w-full max-w-[380px] h-[560px] object-cover object-center rounded-[20px] mx-auto lg:mx-0"
          />
        </motion.div>

        <div className="w-full lg:w-[58%]">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="font-heading text-[32px] md:text-[38px] font-medium text-[#111] leading-[1.2] mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="font-sans text-[#666] text-[14px] leading-[1.6] max-w-[500px] mb-6"
            >
              Straight answers about the studio, how we work online from the
              UK, and what we will and will not take on.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
            >
              <ArrowFillButton
              href="#contact"
              btnText="Start a project"
              className="new-site-header-fill-btn px-6 py-5"
              bgColor="var(--new-site-button-primary-bg-color)"
              textColor="var(--new-site-button-primary-text-color)"
              fillBgColor="var(--new-site-button-secondary-bg-color)"
              fillTextColor="#ffffff"
              hoverFillBgColor="var(--new-site-button-secondary-bg-color)"
              hoverFillTextColor="#ffffff"
              arrowColor="#ffffff"
              hoverArrowColor="#ffffff"
            />
            </motion.div>
          </div>

          <div className="mt-10 space-y-0">
            {faqData.map(
              (
                item: { question: string; answer: string },
                index: number,
              ) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === index}
                  onClick={() => handleToggle(index)}
                  isLast={index === faqData.length - 1}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
