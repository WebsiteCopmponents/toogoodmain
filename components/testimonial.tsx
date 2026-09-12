"use client";
//File : testimonial.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Bookmark, Leaf, Menu } from "lucide-react";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white shadow-sm">
      {children}
    </div>
  );
}

interface Story {
  id: number;
  img: string;
  label: string;
  name: string;
  role: string;
  quote: string;
  badge: React.ReactNode;
}

const stories: Story[] = [
  {
    id: 1,
    img: "https://cdn.jiro.build/Halo/image/r%204.png",
    label: "Founders",
    name: "Michael Jordan",
    role: "Founder",
    quote:
      "They treated the site like a product, not a brochure. The dashboard and the marketing pages finally feel like one system.",
    badge: <LayoutGrid className="h-5 w-5 text-[#017BFF]" />,
  },
  {
    id: 2,
    img: "https://cdn.jiro.build/Halo/image/r%203.png",
    label: "Operators",
    name: "Sarah Jenkins",
    role: "Operations lead",
    quote:
      "The app is fast, the admin is clear, and we didn't have to hire a second agency for SEO and ads after launch.",
    badge: <Bookmark className="h-5 w-5 fill-current text-[#1b1b1b]" />,
  },
  {
    id: 3,
    img: "https://cdn.jiro.build/Halo/image/r%202.png",
    label: "Product",
    name: "Heather Dunn",
    role: "Product lead",
    quote:
      "UI/UX that actually got used. The onboarding is shorter, and people stop asking us how to do the basics.",
    badge: <Leaf className="h-5 w-5 fill-current text-[#079454]" />,
  },
  {
    id: 4,
    img: "https://cdn.jiro.build/Halo/image/r%201.png",
    label: "Clients",
    name: "Thomas Arthur",
    role: "Clinic director",
    quote:
      "Bookings, the public site, and the staff view — one studio, one look. Patients stop calling just to ask what's on the homepage.",
    badge: <Menu className="h-5 w-5 text-[#1b1b1b]" />,
  },
];

export default function Testimonial02Halo({
  className,
}: {
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      className={
        "min-h-screen bg-[#F2F2F1] px-4 py-20 md:px-10 lg:px-20 " +
        (className || "")
      }
    >
        <div className="mx-auto max-w-[1440px]">
          <header className="mb-16 text-center">
            <h2 className="font-heading text-[40px] font-medium leading-[48px] text-[#011F1E]">
              What people say after we ship
            </h2>
          </header>

          <div className="flex flex-col gap-5 lg:hidden">
            {stories.map((story: Story, index: number) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="w-full text-left"
                >
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "#E1E7E1",
                    }}
                    className="overflow-hidden rounded-[24px] p-3"
                  >
                    <div className="relative h-[200px] overflow-hidden rounded-[16px]">
                      <img
                        src={story.img}
                        alt={story.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <Badge>{story.badge}</Badge>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key={"mobile-content-" + story.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1] as const,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-2 pt-4 pb-2 text-white">
                            <p className="mb-4 text-[15px] font-normal leading-[1.6] opacity-90">
                              "{story.quote}"
                            </p>
                            <h4 className="text-[16px] font-semibold">
                              {story.name}
                            </h4>
                            <p className="text-[13px] text-[#7FC9A0]">
                              {story.role}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <h3 className="mt-2 px-1 text-center text-[14px] font-medium text-[#1b1b1b]">
                    {story.label}
                  </h3>
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex lg:justify-center">
            {stories.map((story: Story, index: number) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={story.id}
                  layout
                  onMouseEnter={() => setActiveIndex(index)}
                  className="flex flex-col gap-3"
                  initial={false}
                  animate={{
                    width: isActive ? "520px" : "220px",
                  }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 120,
                    damping: 24,
                    mass: 1,
                    restDelta: 0.001,
                  }}
                >
                  <motion.div
                    layout
                    animate={{
                      backgroundColor: isActive
                        ? "var(--color-primary)"
                        : "#E1E7E1",
                    }}
                    className="relative h-[420px] w-full overflow-hidden rounded-[24px] p-3"
                  >
                    <div className="flex h-full w-full flex-row">
                      <motion.div
                        layout
                        className="relative h-full w-[196px] flex-shrink-0 overflow-hidden rounded-[16px]"
                      >
                        <img
                          src={story.img}
                          alt={story.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <Badge>{story.badge}</Badge>
                      </motion.div>

                      <div className="flex-1 overflow-hidden">
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              key={"content-" + story.id}
                              initial={{ opacity: 0, x: 40 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 40 }}
                              transition={{
                                duration: 0.5,
                                ease: [0.23, 1, 0.32, 1] as const,
                              }}
                              className="flex h-full flex-col p-6 text-white"
                            >
                              <p className="mb-6 line-clamp-6 text-[16px] font-normal leading-[1.6] opacity-90">
                                "{story.quote}"
                              </p>
                              <div className="mt-auto">
                                <h4 className="text-[16px] font-semibold whitespace-nowrap">
                                  {story.name}
                                </h4>
                                <p className="text-[13px] text-[#7FC9A0] whitespace-nowrap">
                                  {story.role}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div layout className="px-1 text-center">
                    <h3 className="text-[14px] font-medium text-[#1b1b1b]">
                      {story.label}
                    </h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
    </section>
  );
}
