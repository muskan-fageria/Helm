"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";

interface CaribbeanCanvasProps {
  children?: React.ReactNode;
}

export default function CaribbeanCanvas({ children }: CaribbeanCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Scroll tracking on the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for a heavier, water-like glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // 2. Preload all 120 WebP images
  useEffect(() => {
    const totalFrames = 372;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
      if (loadedCount === totalFrames) {
        // A slight delay to ensure a polished transition out of the loader
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      }
    };

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i}.webp`;
      img.onload = handleImageLoad;
      // Use standard error handling
      img.onerror = () => {
        console.warn(`Frame frame_${i}.webp failed to load.`);
        handleImageLoad();
      };
      loadedImages.push(img);
    }
    
    imagesRef.current = loadedImages;

    // Cleanup
    return () => {
      imagesRef.current = [];
    };
  }, []);

  // 3. Render function for drawing frames
  const renderCanvasFrame = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = 372;
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * totalFrames))
    );

    const img = imagesRef.current[frameIndex];
    if (img && (img.complete || img.naturalWidth > 0)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Fit content by "cover" logic to span the entire screen
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  };

  // 4. Update canvas frame on scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    renderCanvasFrame(latest);
  });

  // 5. Handle resizing and initial layout
  useEffect(() => {
    if (isLoading) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set internal dimensions using DPR for crisp graphics on High-DPI screens
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Set display layout sizes
      canvas.style.width = "100%";
      canvas.style.height = "100%";

      // Redraw current frame
      renderCanvasFrame(smoothProgress.get());
    };

    // Initialize dimensions and initial draw
    handleResize();

    window.addEventListener("resize", handleResize);
    
    // Safety check to draw the initial frame
    const initialTimeout = setTimeout(() => {
      handleResize();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimeout);
    };
  }, [isLoading, smoothProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[550vh] bg-midnight">
      {/* Dynamic Loader Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-3xl md:text-4xl text-gold mb-2 tracking-widest text-glow-gold"
              >
                HELM
              </motion.span>
              <span className="text-xs text-slate-400 uppercase tracking-widest mb-6">
                Caribbean Creative Portfolio
              </span>
              
              {/* Progress Line */}
              <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gold shadow-[0_0_8px_#E5A93B]"
                  style={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Progress Counter */}
              <span className="text-sm font-sans text-slate-400 mt-4 tabular-nums">
                {loadingProgress}% Loaded
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Canvas Viewport in the Background */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none z-[1]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        
        <canvas
          ref={canvasRef}
          className="w-full h-full block transition-opacity duration-700"
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </div>

      {/* Text Overlay & Interactive Elements Wrapper */}
      {!isLoading && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {children}
        </div>
      )}
    </div>
  );
}
