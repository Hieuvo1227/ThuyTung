"use client";

import React, { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: "1",
    title: "Chương Trình Du Học Nhật Bản 2025",
    description:
      "Cơ hội học tập và làm việc tại Nhật Bản với học bổng lên đến 50%",
    image: "/images/slide-1.jpeg",
  },
  {
    id: "2",
    title: "Tuyển Sinh Khóa Học Ngoại Ngữ",
    description: "Khóa học tiếng Nhật cấp tốc chuẩn bị cho kỳ thi JLPT N5-N1",
    image: "/images/slide-2.jpg",
  },
  {
    id: "3",
    title: "Hội Thảo Hướng Nghiệp Miễn Phí",
    description:
      "Gặp gỡ chuyên gia tư vấn và cựu du học sinh thành công tại Nhật",
    image: "/images/slide-3.jpg",
  },
];

interface ISlideshowProps {
  autoPlay?: boolean;
  interval?: number; // in milliseconds
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export default function SlideshowSection({
  autoPlay = true,
  interval = 5000,
  showIndicators = true,
  showNavigation = true,
}: ISlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;
    const slideInterval = setInterval(goToNext, interval);
    return () => clearInterval(slideInterval);
  }, [autoPlay, isPaused, goToNext, interval]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section
      // THAY ĐỔI: Xóa container và khung, đưa ra toàn màn hình
      className="relative w-full  overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              {/* THAY ĐỔI: Giảm độ mờ và lớp phủ */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent backdrop-blur-[2px]"></div>
            </div>

            {/* Căn chỉnh nội dung sang trái */}
            {(slide.title || slide.description) && (
              <div className="relative z-10 h-full flex items-center justify-start">
                <div className="container mx-auto px-8 md:px-12 lg:px-16">
                  <div className="max-w-xl text-left">
                    {slide.title && (
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                        {slide.title}
                      </h2>
                    )}
                    <div className="w-24 h-1.5 bg-primary mb-4 rounded-full"></div>
                    {slide.description && (
                      <p className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-sm">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
