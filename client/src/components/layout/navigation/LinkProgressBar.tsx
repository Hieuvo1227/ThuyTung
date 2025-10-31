"use client";

import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ProgressContextType {
  startProgress: () => void;
  isLoading: boolean;
}

const ProgressContext = createContext<ProgressContextType>({
  startProgress: () => {},
  isLoading: false,
});

export const useProgress = () => useContext(ProgressContext);

interface ProgressProviderProps {
  children: ReactNode;
}

export const LinkProgressProvider = ({ children }: ProgressProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pageLoadedRef = useRef(false);
  const progressStartTimeRef = useRef<number>(0);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    pageLoadedRef.current = false;
    progressStartTimeRef.current = Date.now();

    // Start progressive loading animation
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      // If page hasn't loaded yet, progress slowly to 85%
      if (!pageLoadedRef.current) {
        if (currentProgress < 85) {
          currentProgress += Math.random() * 3; // Slower increment
        }
      } else {
        // Once page is loaded, quickly complete the remaining progress
        if (currentProgress < 100) {
          currentProgress += Math.random() * 10;
        }
      }

      setProgress(Math.min(currentProgress, 100));

      // Clear interval when reaching 100%
      if (currentProgress >= 100) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        // Hide progress bar after completion
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 200);
      }
    }, 100);

    return progressIntervalRef.current;
  };

  const completeProgress = () => {
    pageLoadedRef.current = true;

    // If progress is still very low, give it a minimum time to look natural
    const elapsedTime = Date.now() - progressStartTimeRef.current;
    const minimumLoadTime = 300; // Minimum 300ms for visual feedback

    if (elapsedTime < minimumLoadTime) {
      setTimeout(() => {
        pageLoadedRef.current = true;
      }, minimumLoadTime - elapsedTime);
    }
  };

  // Listen for route changes to complete progress
  useEffect(() => {
    if (isLoading) {
      // Wait for page to be fully loaded
      const timer = setTimeout(() => {
        completeProgress();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname, isLoading]);

  // Additional listener for document ready state
  useEffect(() => {
    if (isLoading) {
      const checkPageLoaded = () => {
        if (document.readyState === "complete") {
          completeProgress();
        }
      };

      // Check immediately
      checkPageLoaded();

      // Listen for readystate changes
      document.addEventListener("readystatechange", checkPageLoaded);

      // Listen for window load event as backup
      window.addEventListener("load", completeProgress);

      return () => {
        document.removeEventListener("readystatechange", checkPageLoaded);
        window.removeEventListener("load", completeProgress);
      };
    }
  }, [isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Intercept all link clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        // Only show progress for internal navigation
        if (
          url.origin === currentUrl.origin &&
          url.pathname !== currentUrl.pathname
        ) {
          startProgress();
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <ProgressContext.Provider value={{ startProgress, isLoading }}>
      {children}

      {/* Progress Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ProgressContext.Provider>
  );
};

export default LinkProgressProvider;