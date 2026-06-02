"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import CaribbeanCanvas from "../components/CaribbeanCanvas";
import { ArrowUpRight, Compass, Grid, Waves, Mail, User } from "lucide-react";

export default function Home() {
  // Hook into the page's scroll progress to animate text overlays in sync with the canvas
  const { scrollYProgress } = useScroll();

  // Scroll animations for Header Elements (fade out near CTA)
  const headerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0]);

  // Beat A: Muskan Fageria - Left side, top of helm (0% - 20% scroll range of 500vh)
  const opacityA = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.20], [0, 1, 1, 0]);
  const yA = useTransform(scrollYProgress, [0.0, 0.05, 0.15, 0.20], [30, 0, 0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.04], [1, 0]);

  // Beat B: About Me - Right side, lower down (22% - 39% scroll range of 500vh)
  const opacityB = useTransform(scrollYProgress, [0.19, 0.24, 0.34, 0.39], [0, 1, 1, 0]);
  const yB = useTransform(scrollYProgress, [0.19, 0.24, 0.34, 0.39], [30, 0, 0, -30]);

  return (
    <main className="relative bg-midnight select-none text-slate-100 min-h-screen">
      {/* Editorial Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl md:text-2xl text-gold tracking-widest font-semibold text-glow-gold">
            HELM
          </span>
          <span className="h-4 w-[1px] bg-slate-800" />
          <span className="text-[10px] md:text-xs font-sans tracking-widest text-teal font-medium uppercase">
            Creative Portfolio
          </span>
        </div>
        
        {/* Availability Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-xs text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="uppercase tracking-widest font-semibold text-[10px]">
            Available for Q3 Projects
          </span>
        </div>

        {/* Minimalist Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-400 hover:text-gold transition-colors duration-300 font-semibold"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </nav>
      </motion.header>

      {/* Scrollytelling Canvas Wrapper (fixed background) */}
      <CaribbeanCanvas>
        
        {/* SECTION 0: Sticky Container for viewport-relative text fade animations (200vh tall) */}
        <div className="h-[200vh] w-full relative z-10">
          <div className="sticky top-0 h-screen w-full pointer-events-none">
            
            {/* Scroll Explore Prompt */}
            <motion.div
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 z-20"
            >
              <span className="text-[10px] tracking-widest text-gold/60 uppercase font-semibold">
                Scroll to Explore
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent relative overflow-hidden">
                <motion.div
                  animate={{
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-gold shadow-[0_0_8px_#E5A93B]"
                />
              </div>
            </motion.div>

            {/* BEAT A: Muskan Fageria - Left side, top of centerpiece */}
            <motion.div
              style={{ opacity: opacityA, y: yA }}
              className="absolute left-6 md:left-16 lg:left-24 top-[18%] max-w-md text-left z-15 pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-3.5 h-3.5 text-gold animate-spin-slow" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold text-glow-gold">
                  Interactive Showcase
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-100/90 leading-[0.95]">
                MUSKAN<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-teal">
                  FAGERIA
                </span>
              </h1>
              <p className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase mt-4">
                Creative Developer & Designer
              </p>
            </motion.div>

            {/* BEAT B: About Me - Right side, lower down */}
            <motion.div
              style={{ opacity: opacityB, y: yB }}
              className="absolute right-6 md:right-16 lg:right-24 top-[48%] max-w-sm text-right z-15 pointer-events-auto"
            >
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-teal" />
                  <span className="text-[10px] font-semibold tracking-widest text-teal uppercase">
                    THE CRAFT & VISION
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100/95 leading-tight mb-4">
                  ABOUT ME
                </h2>

                <p className="font-sans text-xs sm:text-sm md:text-base text-slate-400/80 leading-relaxed max-w-xs md:max-w-sm">
                  Rooted in the warm tides of the Caribbean, I shape digital experiences using high-fidelity code and sensory design. Melding Next.js with fluid canvas motion to construct pages that breathe.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 1: Sun-Baked Geometry (Scrolls up naturally) */}
        <div className="h-screen w-full flex items-center px-6 md:px-24 lg:px-36 relative z-20 bg-transparent">
          <div className="max-w-lg flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-3">
              <Grid className="w-4 h-4 text-teal" />
              <span className="text-xs font-semibold tracking-widest text-teal uppercase">
                01 / STRUCTURE
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-100/90 leading-tight mb-4">
              SUN-BAKED<br />GEOMETRY
            </h2>
            
            <p className="font-sans text-slate-400/85 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
              Merging vibrant cultural rhythms with meticulous frontend engineering.
            </p>

            <div className="h-[1px] w-12 bg-gold/50 mb-4" />
            <span className="text-[10px] font-mono tracking-widest text-gold/60">
              COORDINATES: 13.1625° N, 59.5496° W
            </span>
          </div>
        </div>

        {/* SECTION 2: Fluid Motion (Scrolls up naturally) */}
        <div className="h-screen w-full flex items-center justify-end px-6 md:px-24 lg:px-36 relative z-20 bg-transparent">
          <div className="max-w-lg flex flex-col items-end text-right">
            <div className="flex items-center justify-end gap-2 mb-3">
              <Waves className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                02 / MOTION
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-100/90 leading-tight mb-4">
              FLUID MOTION
            </h2>

            <p className="font-sans text-slate-400/85 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
              Interfaces that breathe, shift, and respond like the tides. Built on top of 60fps micro-interactions.
            </p>

            <div className="h-[1px] w-12 bg-teal/50 mb-4" />
            <span className="text-[10px] font-mono tracking-widest text-teal/60">
              FRAMEWORK: NEXTJS / SHARP / CANVAS
            </span>
          </div>
        </div>

        {/* SECTION 3: Let's Build / CTA (Scrolls up naturally and settles) */}
        <div
          id="connect"
          className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-20 bg-transparent"
        >
          <div className="max-w-2xl flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                03 / CONNECTION
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-slate-100/90 tracking-tight leading-none mb-6">
              LET&apos;S BUILD<br />FROM THE COAST
            </h2>

            <p className="font-sans text-slate-400/80 text-sm sm:text-base md:text-lg max-w-md leading-relaxed mb-8">
              Available for select global collaborations and high-end creative development.
            </p>

            {/* Premium CTA Button */}
            <a
              href="mailto:hello@helmcreative.com"
              className="pointer-events-auto group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-gold/40 bg-midnight transition-all duration-300 hover:border-gold shadow-[0_0_15px_rgba(229,169,59,0.05)] hover:shadow-[0_0_25px_rgba(229,169,59,0.15)]"
            >
              {/* Inner Gradient Slide Animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold/10 to-teal/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="relative font-sans text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                Initiate Collaboration
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </a>
          </div>

          {/* Minimalist Footer */}
          <footer className="absolute bottom-6 w-full flex justify-between items-center px-6 md:px-12 text-[10px] text-slate-500 tracking-wider">
            <span>© 2026 HELM STUDIO. ALL RIGHTS RESERVED.</span>
            <span>BARBADOS & GLOBAL</span>
          </footer>
        </div>

      </CaribbeanCanvas>
    </main>
  );
}
