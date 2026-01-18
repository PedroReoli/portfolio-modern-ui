"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInteractive, setIsInteractive] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Phase 1: Shrink Portrait (0% -> 40%)
  // Maps scroll 0-0.4 to scale 1-0.45
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.45])
  
  // Desabilita interatividade após 30% do scroll
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest > 0.3) {
        setIsInteractive(false)
      } else {
        setIsInteractive(true)
      }
    })
    return () => unsubscribe()
  }, [smoothProgress])

  // Phase 2: Text Parallax (0% -> 80%)
  // Text moves slightly to create depth
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1])

  // Phase 3: Exit (80% -> 100%)
  // Everything slides up to reveal next section
  const exitY = useTransform(smoothProgress, [0.85, 1], ["0%", "-100%"])
  const exitOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0])
  
  // Border radius aumenta após scroll (em pixels) - mais arredondada
  const borderRadius = useTransform(smoothProgress, [0.3, 0.6], ["0px", "48px"])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0a1a2e]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        {/* Background Text Layer */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{
            y: exitY,
            opacity: exitOpacity,
          }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center opacity-0"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>
        </motion.div>

        {/* Foreground Portrait Layer */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
          style={{
            scale: scale,
            y: exitY,
            opacity: exitOpacity,
            borderRadius: borderRadius,
          }}
        >
          <InteractivePortrait isInteractive={isInteractive} />
        </motion.div>
      </div>
    </section>
  )
}
