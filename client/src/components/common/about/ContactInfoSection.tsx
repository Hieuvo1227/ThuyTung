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
      className="py-8 sm:py-12 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Tiêu đề */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 mb-8 sm:mb-12"
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
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={contactInfoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              Liên Hệ Với <span className="text-primary">Chúng Tôi</span>
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm max-w-xl mx-auto px-2">
              Hãy kết nối với chúng tôi để được hỗ trợ nhanh chóng và chuyên nghiệp nhất.
            </p>
          </motion.div>

          {/* Danh sách thông tin liên hệ */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10"
            variants={containerVariants}
            initial="hidden"
            animate={contactInfoInView ? "visible" : "hidden"}
          >
            {/* Địa chỉ */}
            <motion.a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-700 p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-primary mb-2">
                Địa chỉ
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-[250px] group-hover:text-primary transition-colors font-medium">
                24/22 Đường số 23,<br />
                Phường Hiệp Bình Chánh, Tp Thủ Đức
              </p>
            </motion.a>

            {/* Điện thoại */}
            <motion.a
              href={`tel:${PHONE}`}
              className="bg-gray-50 dark:bg-gray-700 p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-primary mb-2">
                Điện thoại
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed group-hover:text-primary transition-colors font-medium">
                {PHONE}
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${EMAIL}`}
              className="bg-gray-50 dark:bg-gray-700 p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center group"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
              >
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-primary mb-2">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed break-all group-hover:text-primary transition-colors font-medium">
                {EMAIL}
              </p>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}