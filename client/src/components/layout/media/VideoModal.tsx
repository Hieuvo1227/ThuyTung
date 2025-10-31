"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  title,
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus on modal for accessibility
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
      // Pause video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "video-modal-title" : undefined}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {title && (
            <h2
              id="video-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Đóng video"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[70vh]"
            controls
            controlsList="nodownload"
            autoPlay
            preload="metadata"
            aria-label={title || "Video giới thiệu"}
          >
            <source src={videoSrc} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
        </div>
      </div>
    </div>
  );
}
