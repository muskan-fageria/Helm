"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import CaribbeanCanvas from "../components/CaribbeanCanvas";
import { ArrowUpRight, Compass, Grid, Waves, Mail, User, Sun, Moon } from "lucide-react";

type Theme = "obsidian" | "dark";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("obsidian");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "obsidian" ? "dark" : "obsidian"));
  };

  // Hook into the page's scroll progress to animate text overlays in sync with the canvas
  const { scrollYProgress } = useScroll();

  // Scroll animations for Header Elements (fade out near CTA)
  const headerOpacity = useTransform(scrollYProgress, [0.82, 0.94], [1, 0]);

  // Beat A: Muskan Fageria - Left side, top of helm (0% - 16% scroll range of 450vh)
  const opacityA = useTransform(scrollYProgress, [0.0, 0.04, 0.12, 0.16], [0, 1, 1, 0]);
  const yA = useTransform(scrollYProgress, [0.0, 0.04, 0.12, 0.16], [30, 0, 0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.03], [1, 0]);

  // Beat B: About Me - Right side, lower down (Stays visible from start, fades out at 28% - 32% scroll)
  const opacityB = useTransform(scrollYProgress, [0.0, 0.28, 0.32], [1, 1, 0]);
  const yB = useTransform(scrollYProgress, [0.0, 0.28, 0.32], [0, 0, -30]);

  return (
    <main className={`relative bg-background select-none text-primary min-h-screen theme-${theme} transition-colors duration-500`}>
      {/* Vignette Overlay (Fades in/out on the GPU based on theme) */}
      <div className="vignette-overlay" />

      {/* Sea Background & Twilight Gradient Overlay (Only active in theme-dark) */}
      <div 
        className={`fixed inset-0 w-full h-screen z-0 transition-opacity duration-700 pointer-events-none bg-[#0B131F] ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <img 
          src="/your-sea-image.jpg" 
          alt="Sea Background"
          className="w-full h-full object-cover brightness-60 contrast-95"
        />

        {/* Twilight Gradient Overlay */}
        <div 
          className="absolute inset-0 mix-blend-multiply opacity-60 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #1e1b4b 0%, #0f172a 40%, #020617 100%)'
          }}
        />
      </div>

      {/* Editorial Fixed Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl md:text-2xl text-gold tracking-widest font-semibold text-glow-gold">
            HELM
          </span>
          <span className="h-4 w-[1px] bg-slate-800/60 short-hide" />
          <span className="text-[10px] md:text-xs font-sans tracking-widest text-teal font-medium uppercase short-hide">
            Creative Portfolio
          </span>
        </div>
        
        {/* Availability Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-xs text-teal">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
          <span className="uppercase tracking-widest font-semibold text-[10px]">
            Available for Q3 Projects
          </span>
        </div>

        {/* Minimalist Navigation & Theme Controller */}
        <nav className="flex items-center gap-4 md:gap-8">
          {/* Floating Theme Controller */}
          <button
            onClick={toggleTheme}
            className="group pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border border-cardBorder bg-card text-xs text-gold hover:text-primary transition-all duration-300 shadow-md hover:shadow-lg"
            title="Toggle Cinematic Vignette"
          >
            {theme === "obsidian" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-gold" />
                <span className="uppercase tracking-widest font-bold text-[9px] hidden sm:inline">
                  Obsidian Theme
                </span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-teal" />
                <span className="uppercase tracking-widest font-bold text-[9px] hidden sm:inline">
                  Dark Theme
                </span>
              </>
            )}
          </button>

          <a
            href="#connect"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-secondary hover:text-gold transition-colors duration-300 font-semibold"
          >
            Connect
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </nav>
      </motion.header>

      {/* Scrollytelling Canvas Wrapper (fixed background) */}
      <CaribbeanCanvas>
        
        {/* SECTION 0: Sticky Container for viewport-relative text fade animations (150vh tall) */}
        <div className="h-[150vh] w-full relative z-10">
          <div className="sticky top-0 h-screen w-full pointer-events-none">
            
            {/* Scroll Explore Prompt */}
            <motion.div
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 z-20 short-hide"
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
                  className="absolute top-0 left-0 w-full h-1/2 bg-gold shadow-[0_0_8px_var(--accent-gold)]"
                />
              </div>
            </motion.div>

            {/* BEAT A: Muskan Fageria - Left side, top of centerpiece */}
            <motion.div
              style={{ opacity: opacityA, y: yA }}
              className="absolute left-6 md:left-16 lg:left-24 top-[20%] md:top-[26%] short-top-a max-w-[280px] sm:max-w-md text-left z-15 pointer-events-auto"
            >
              <div className="flex items-center gap-2 mb-3 short-hide">
                <Compass className="w-3.5 h-3.5 text-gold animate-spin-slow" />
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold text-glow-gold">
                  Interactive Showcase
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-[0.95] short-reduce-title-lg">
                MUSKAN<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-400 to-teal">
                  FAGERIA
                </span>
              </h1>
              <p className="text-[10px] tracking-widest text-secondary font-semibold uppercase mt-4 short-reduce-text">
                Creative Developer & Designer
              </p>
            </motion.div>

            {/* BEAT B: About Me - Right side, lower down */}
            <motion.div
              style={{ opacity: opacityB, y: yB }}
              className="absolute right-6 md:right-16 lg:right-24 top-[56%] md:top-[48%] short-top-b max-w-[280px] sm:max-w-sm text-right z-15 pointer-events-auto"
            >
              <div className="flex flex-col items-end bg-card backdrop-blur-md border border-cardBorder p-5 md:p-8 rounded-2xl shadow-2xl short-reduce-padding transition-colors duration-500">
                <div className="flex items-center gap-2 mb-3 short-hide">
                  <User className="w-4 h-4 text-teal" />
                  <span className="text-[10px] font-semibold tracking-widest text-teal uppercase">
                    THE CRAFT & VISION
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4 short-reduce-title">
                  ABOUT ME
                </h2>

                <p className="font-sans text-xs sm:text-sm md:text-base text-secondary leading-relaxed max-w-xs md:max-w-sm short-reduce-text">
                  Rooted in the warm tides of the Caribbean, I shape digital experiences using high-fidelity code and sensory design. Melding Next.js with fluid canvas motion to construct pages that breathe.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SECTION 1: Sun-Baked Geometry (Scrolls up naturally) */}
        <div className="min-h-screen py-16 md:py-0 w-full flex items-center px-6 md:px-24 lg:px-36 relative z-20 bg-transparent">
          <div className="max-w-lg flex flex-col items-start text-left bg-card backdrop-blur-md border border-cardBorder p-6 md:p-10 rounded-2xl shadow-2xl short-reduce-padding transition-colors duration-500">
            <div className="flex items-center gap-2 mb-3 short-hide">
              <Grid className="w-4 h-4 text-teal" />
              <span className="text-xs font-semibold tracking-widest text-teal uppercase">
                01 / STRUCTURE
              </span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight mb-4 short-reduce-title">
              SUN-BAKED<br />GEOMETRY
            </h2>
            
            <p className="font-sans text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6 short-reduce-text">
              Merging vibrant cultural rhythms with meticulous frontend engineering.
            </p>

            <div className="h-[1px] w-12 bg-gold/50 mb-4 short-hide" />
            <span className="text-[10px] font-mono tracking-widest text-gold/60 short-reduce-text">
              COORDINATES: 13.1625° N, 59.5496° W
            </span>
          </div>
        </div>

        {/* SECTION 2: Fluid Motion (Scrolls up naturally) */}
        <div className="min-h-screen py-16 md:py-0 w-full flex items-center justify-end px-6 md:px-24 lg:px-36 relative z-20 bg-transparent">
          <div className="max-w-lg flex flex-col items-end text-right bg-card backdrop-blur-md border border-cardBorder p-6 md:p-10 rounded-2xl shadow-2xl short-reduce-padding transition-colors duration-500">
            <div className="flex items-center justify-end gap-2 mb-3 short-hide">
              <Waves className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                02 / MOTION
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight mb-4 short-reduce-title">
              FLUID MOTION
            </h2>

            <p className="font-sans text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6 short-reduce-text">
              Interfaces that breathe, shift, and respond like the tides. Built on top of 60fps micro-interactions.
            </p>

            <div className="h-[1px] w-12 bg-teal/50 mb-4 short-hide" />
            <span className="text-[10px] font-mono tracking-widest text-teal/60 short-reduce-text">
              FRAMEWORK: NEXTJS / SHARP / CANVAS
            </span>
          </div>
        </div>

        {/* SECTION 3: Let's Build / CTA (Scrolls up naturally and settles) */}
        <div
          id="connect"
          className="min-h-screen py-16 md:py-0 w-full flex flex-col items-center justify-center text-center px-6 relative z-20 bg-transparent"
        >
          <div className="max-w-2xl flex flex-col items-center bg-card backdrop-blur-md border border-cardBorder p-6 md:p-12 rounded-3xl shadow-2xl short-reduce-padding transition-colors duration-500">
            <div className="flex items-center gap-2 mb-3 short-hide">
              <Mail className="w-4 h-4 text-gold" />
              <span className="text-xs font-semibold tracking-widest text-gold uppercase">
                03 / CONNECTION
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-primary tracking-tight leading-none mb-6 short-reduce-title-lg">
              LET&apos;S BUILD<br />FROM THE COAST
            </h2>

            <p className="font-sans text-secondary text-sm sm:text-base md:text-lg max-w-md leading-relaxed mb-8 short-reduce-text">
              Available for select global collaborations and high-end creative development.
            </p>

            {/* Premium CTA Button */}
            <a
              href="mailto:hello@helmcreative.com"
              className="pointer-events-auto group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 overflow-hidden rounded-full border border-gold/40 bg-background transition-all duration-300 hover:border-gold shadow-[0_0_15px_rgba(229,169,59,0.05)] hover:shadow-[0_0_25px_rgba(229,169,59,0.15)]"
            >
              {/* Inner Gradient Slide Animation */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold/10 to-teal/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <span className="relative font-sans text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-2 short-reduce-text">
                Initiate Collaboration
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>
            </a>
          </div>

          {/* Minimalist Footer */}
          <footer className="absolute bottom-6 w-full flex justify-between items-center px-6 md:px-12 text-[10px] text-slate-500 tracking-wider short-hide">
            <span>© 2026 HELM STUDIO. ALL RIGHTS RESERVED.</span>
            <span>BARBADOS & GLOBAL</span>
          </footer>
        </div>

      </CaribbeanCanvas>
    </main>
  );
}
