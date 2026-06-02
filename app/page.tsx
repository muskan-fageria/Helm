"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import CaribbeanCanvas from "../components/CaribbeanCanvas";
import { ArrowUpRight, Compass, Grid, Waves, Mail } from "lucide-react";

export default function Home() {

  // Hook into the page's scroll progress to animate text overlays in sync with the canvas
  const { scrollYProgress } = useScroll();

  // Scroll animations for Header Elements (fade out near CTA)
  const headerOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0]);

  // Beat A: The Horizon (0% - 20% scroll)
  const opacityA = useTransform(scrollYProgress, [0.0, 0.12, 0.18], [1, 1, 0]);
  const yA = useTransform(scrollYProgress, [0.0, 0.18], [0, -40]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.0, 0.08], [1, 0]);

  // Beat B: The Architecture (25% - 45% scroll)
  const opacityB = useTransform(scrollYProgress, [0.18, 0.24, 0.40, 0.46], [0, 1, 1, 0]);
  const yB = useTransform(scrollYProgress, [0.18, 0.24, 0.40, 0.46], [40, 0, 0, -40]);

  // Beat C: The Rhythm (50% - 70% scroll)
  const opacityC = useTransform(scrollYProgress, [0.44, 0.50, 0.65, 0.72], [0, 1, 1, 0]);
  const yC = useTransform(scrollYProgress, [0.44, 0.50, 0.65, 0.72], [40, 0, 0, -40]);

  // Beat D: The Call (75% - 100% scroll)
  const opacityD = useTransform(scrollYProgress, [0.71, 0.78, 1.0], [0, 1, 1]);
  const yD = useTransform(scrollYProgress, [0.71, 0.78, 1.0], [40, 0, 0]);

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
            Creative Dev
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

      {/* Scrollytelling Canvas and Narrative Overlays */}
      <CaribbeanCanvas>
        
        {/* BEAT A: The Horizon (Hero) */}
        <motion.div
          style={{ opacity: opacityA, y: yA }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Editorial Badge */}
            <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-gold/15 bg-gold/5 text-gold text-glow-gold">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest">
                Established 2026
              </span>
            </div>

            {/* Giant Bold Title */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-slate-100/90 leading-[0.9] mb-6">
              DIASPORA &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-teal">
                DEPTH
              </span>
            </h1>

            {/* Premium Description */}
            <p className="font-sans text-slate-400/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed">
              A premium digital portfolio rooted in Caribbean warmth and high-performance design.
            </p>
          </div>

          {/* Minimalist Floating Scroll Prompt */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-10 flex flex-col items-center gap-2"
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
        </motion.div>

        {/* BEAT B: The Architecture (Structure) */}
        <motion.div
          style={{ opacity: opacityB, y: yB }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 lg:px-36"
        >
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
        </motion.div>

        {/* BEAT C: The Rhythm (Motion) */}
        <motion.div
          style={{ opacity: opacityC, y: yC }}
          className="absolute inset-0 flex flex-col justify-center items-end px-6 md:px-24 lg:px-36 text-right"
        >
          <div className="max-w-lg flex flex-col items-end">
            <div className="flex items-center gap-2 mb-3">
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
        </motion.div>

        {/* BEAT D: The Call (Connection) */}
        <motion.div
          id="connect"
          style={{ opacity: opacityD, y: yD }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
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
        </motion.div>

      </CaribbeanCanvas>
    </main>
  );
}
