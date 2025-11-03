"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Define service item structure
interface ServiceItem {
  title: string;
  features: string[];
}

interface IServicesSection {
  services: ServiceItem[];
  servicesRef: React.RefObject<HTMLDivElement | null>;
  servicesInView: boolean;
  containerVariants: Variants;
  itemVariants: Variants;
}

export default function ServicesSection({
  services,
  servicesRef,
  servicesInView,
  containerVariants,
  itemVariants,
}: IServicesSection) {
  return (
    <section
      ref={servicesRef}
      className="py-16 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={servicesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Các Dịch Vụ <span className="text-primary">Chính</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0 }}
              animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Dịch vụ toàn diện từ tư vấn đến hỗ trợ thực hiện giấc mơ du học và làm việc nước ngoài.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-green-50 dark:bg-gray-700 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                {/* Title */}
                <motion.h3
                  className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  {service.title}
                </motion.h3>

                {/* Features */}
                <motion.ul
                  className="space-y-3 mt-auto"
                  variants={containerVariants}
                  initial="hidden"
                  animate={servicesInView ? "visible" : "hidden"}
                  transition={{
                    delayChildren: 0.3 + index * 0.1,
                    staggerChildren: 0.1,
                  }}
                >
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start text-sm sm:text-base"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { type: "spring", stiffness: 100 },
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, color: "#2563eb" }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}