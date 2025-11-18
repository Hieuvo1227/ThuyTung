﻿"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import VideoModal from "@/components/layout/media/VideoModal";
import { COMPANY } from "@/utils/services/constants";

const stats = {
  studentsCount: 500,
  countriesCount: 6,
  successRate: 98,
};

// Counter animation component
function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to, duration, count, rounded]);

  return <>{displayValue}</>;
}

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.section ref={ref} className="relative pt-8 pb-10 md:pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image src="/images/Hero-image.jpg" alt="Du học quốc tế background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Container of both cards */}
        <motion.div
          className="relative flex flex-col lg:flex-row justify-start lg:justify-between items-start min-h-[520px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT CARD */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 bg-green-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-white/80 w-full lg:w-[62%]"
            style={{
              alignSelf: "flex-start",
            }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4 md:mb-5">
              Kết Nối <span className="text-primary">Giáo Dục</span> & <br className="lg:hidden" />
              <span className="text-gray-900 dark:text-white">Nâng Tầm</span> <span className="text-primary">Cuộc Sống</span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-justify mb-4 md:mb-6 text-base md:text-lg lg:text-xl">
              Bạn đang mơ ước học tiếp Thạc sĩ tại nước ngoài và có cơ hội phát triển
              sự nghiệp trong môi trường quốc tế hiện đại?{" "}
              <span className="text-primary font-semibold">{COMPANY}</span>{" "}
              sẽ cùng bạn xây dựng một lộ trình học tập được cá nhân hóa, phù hợp nhất với năng lực và mục tiêu nghề nghiệp
              của riêng bạn.
            </p>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="bg-primary/10 dark:bg-primary/20 p-2 md:p-3 rounded-full"
                animate={
                  isInView
                    ? {
                        boxShadow: [
                          "0 0 0 0 rgba(var(--primary-rgb, 59, 130, 246), 0.4)",
                          "0 0 0 15px rgba(var(--primary-rgb, 59, 130, 246), 0)",
                          "0 0 0 0 rgba(var(--primary-rgb, 59, 130, 246), 0)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {isInView && <Counter to={12} duration={2} />}+
                </span>
              </motion.div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm md:text-base lg:text-lg">Năm Kinh Nghiệm</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Trong Ngành Giáo Dục</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CARD - Floating, overlaps left card */}
          <motion.div
            variants={itemVariants}
            className="relative z-20 w-full lg:w-[38%] mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-64 lg:-translate-y-1/2"
          >
            <div className="bg-green-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 divide-x divide-gray-300 dark:divide-gray-600">
                {[
                  { value: stats.studentsCount, label: "Học sinh thành công", suffix: "+" },
                  { value: stats.countriesCount, label: "Quốc gia" },
                  { value: stats.successRate, label: "Tỷ lệ visa thành công", suffix: "%" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center px-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  >
                    <motion.div
                      className="text-2xl md:text-3xl font-bold text-primary"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {isInView && <Counter to={stat.value} duration={2.5} />}
                      {stat.suffix}
                    </motion.div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Link href="/contact" className="w-full">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-base px-6 py-2 flex items-center justify-center w-full shadow-md">
                    Tư vấn miễn phí
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-6 py-2 border-2 bg-secondary hover:bg-secondary/90 border-secondary text-white flex items-center justify-center w-full shadow-md"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <Play className="mr-2 w-4 h-4" />
                  Xem video giới thiệu
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc="/videos/gioi_thieu.mp4" title="ThuyTung" />
    </motion.section>
  );
}