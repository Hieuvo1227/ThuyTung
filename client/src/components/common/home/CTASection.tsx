"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface ICTASection {
  ctaRef: React.RefObject<HTMLDivElement | null>;
  ctaInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function CTASection({
  ctaRef,
  ctaInView,
  containerVariants,
  itemVariants,
}: ICTASection) {
  return (
    <section
      ref={ctaRef}
      className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5 }}
          >
            Sẵn Sàng Cho Hành Trình Du Học?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-blue-50"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Đăng ký tư vấn miễn phí và nhận ngay lộ trình du học phù hợp với nhu
            cầu của bạn
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4 flex-wrap gap-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
            transition={{ delayChildren: 0.3, staggerChildren: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className="bg-white text-primary hover:bg-blue-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Đăng ký tư vấn
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/programs"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl inline-block"
              >
                Xem chương trình
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={
          ctaInView
            ? {
                x: ["-50%", "-45%", "-50%"],
                y: ["-50%", "-55%", "-50%"],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"
        animate={
          ctaInView
            ? {
                x: ["50%", "55%", "50%"],
                y: ["50%", "45%", "50%"],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />
    </section>
  );
}
