"use client";

import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { ADDRESS, EMAIL, PHONE } from "@/utils/services/constants";

interface IContactInfoSection {
  contactInfoRef: React.RefObject<HTMLDivElement | null>;
  contactInfoInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

// Tạo link Google Maps từ địa chỉ
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export default function ContactInfoSection({
  contactInfoRef,
  contactInfoInView,
  containerVariants,
  itemVariants,
}: IContactInfoSection) {
  return (
    <section
      ref={contactInfoRef}
      className="py-12 sm:py-16 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={contactInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={contactInfoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              Liên Hệ Với <span className="text-primary">Chúng Tôi</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
              Hãy kết nối với chúng tôi để được hỗ trợ nhanh chóng và chuyên nghiệp nhất.
            </p>
          </motion.div>

          {/* Danh sách thông tin liên hệ */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate={contactInfoInView ? "visible" : "hidden"}
          >
            {/* Địa chỉ */}
            <motion.a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                Địa chỉ
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed max-w-[250px] group-hover:text-primary transition-colors">
                {ADDRESS}
              </p>
            </motion.a>

            {/* Điện thoại */}
            <motion.a
              href={`tel:${PHONE}`}
              className="bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                Điện thoại
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-primary transition-colors">
                {PHONE}
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${EMAIL}`}
              className="bg-gray-50 dark:bg-gray-700 p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed break-all group-hover:text-primary transition-colors">
                {EMAIL}
              </p>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}