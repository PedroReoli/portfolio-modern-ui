"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInteractive, setIsInteractive] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showTourButton, setShowTourButton] = useState(true)
  const autoScrollProgress = useMotionValue(0)

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto animação no mobile
  useEffect(() => {
    if (!isMobile) return

    let animationId: number
    let startTime: number | null = null
    const duration = 3000 // 3 segundos para completar

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing suave (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      autoScrollProgress.set(easedProgress * 0.4) // Vai até 40% automaticamente

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // Iniciar animação após 1 segundo
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(animate)
    }, 1000)

    return () => {
      clearTimeout(timeout)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [isMobile, autoScrollProgress])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Combinar scroll manual com auto animação no mobile
  const combinedProgress = useTransform(
    [smoothProgress, autoScrollProgress],
    ([scroll, auto]: number[]) => isMobile ? Math.max(scroll, auto) : scroll
  )

  // Phase 1: Shrink Portrait (0% -> 40%)
  const scale = useTransform(combinedProgress, [0, 0.4], [1, isMobile ? 0.65 : 0.45])

  // Desabilita interatividade após 30% do scroll
  useEffect(() => {
    const unsubscribe = combinedProgress.on("change", (latest) => {
      if (latest > 0.3) {
        setIsInteractive(false)
        setShowTourButton(false)
      } else {
        setIsInteractive(true)
        setShowTourButton(true)
      }
    })
    return () => unsubscribe()
  }, [combinedProgress])

  // Phase 2: Text Parallax (0% -> 80%)
  const textOpacity = useTransform(combinedProgress, [0, 0.2], [0, 1])

  // Phase 3: Exit (80% -> 100%)
  const exitY = useTransform(combinedProgress, [0.85, 1], ["0%", "-100%"])
  const exitOpacity = useTransform(combinedProgress, [0.9, 1], [1, 0])

  // Border radius aumenta após scroll
  const borderRadius = useTransform(combinedProgress, [0.3, 0.6], ["0px", isMobile ? "24px" : "48px"])

  // Função para iniciar o tour (scroll suave para próxima seção)
  const handleStartTour = useCallback(() => {
    const missionSection = document.getElementById("mission")
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-[200vh] md:h-[300vh] bg-[#000000]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-background">
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

        {/* Foreground Portrait Layer - Posicionado na base */}
        <motion.div
          className="relative z-10 w-full flex-1 flex items-end justify-center overflow-hidden"
          style={{
            scale: scale,
            y: exitY,
            opacity: exitOpacity,
            borderRadius: borderRadius,
          }}
        >
          <InteractivePortrait isInteractive={isInteractive} />
        </motion.div>

        {/* Botão Iniciar Tour - Mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showTourButton ? 1 : 0, y: showTourButton ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-auto"
          >
            <motion.button
              onClick={handleStartTour}
              whileTap={{ scale: 0.95 }}
              className="bg-lorenzo-accent text-white font-bold uppercase px-6 py-3 rounded-full text-sm tracking-wider shadow-lg shadow-lorenzo-accent/30 flex items-center gap-2"
            >
              Iniciar Tour
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
