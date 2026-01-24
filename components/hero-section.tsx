"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInteractive, setIsInteractive] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showOnImage, setShowOnImage] = useState(true)

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Transição automática entre imagens no mobile
  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setShowOnImage((prev) => !prev)
    }, 3000) // Alterna a cada 3 segundos

    return () => clearInterval(interval)
  }, [isMobile])

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

  // Phase 2: Text Parallax
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1])

  // Phase 3: Exit
  const exitY = useTransform(smoothProgress, [0.85, 1], ["0%", "-100%"])
  const exitOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0])

  // Border radius
  const borderRadius = useTransform(smoothProgress, [0.3, 0.6], ["0px", "48px"])

  // Função para iniciar o tour
  const handleStartTour = useCallback(() => {
    const missionSection = document.getElementById("mission")
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  // Mobile: Layout com transição fluida entre imagens
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-black flex flex-col overflow-hidden">
        {/* Container da imagem - ocupa toda a tela */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          {/* Imagem ON - Base layer */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            initial={{ opacity: 1 }}
            animate={{
              opacity: showOnImage ? 1 : 0,
              scale: showOnImage ? 1 : 1.05,
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <motion.img
              src="/images/hero-on.png"
              alt="Pedro Reis"
              className="w-full max-w-none h-[85vh] object-contain object-bottom"
              initial={{ y: 0 }}
              animate={{
                y: showOnImage ? 0 : -10,
                filter: showOnImage ? "brightness(1)" : "brightness(0.9)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </motion.div>

          {/* Imagem OFF - Top layer com efeito de revelação */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: showOnImage ? 0 : 1,
              scale: showOnImage ? 0.95 : 1,
            }}
            transition={{
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <motion.img
              src="/images/hero-off.png"
              alt="Pedro Reis"
              className="w-full max-w-none h-[85vh] object-contain object-bottom"
              initial={{ y: 10 }}
              animate={{
                y: showOnImage ? 10 : 0,
                filter: showOnImage ? "brightness(0.9)" : "brightness(1)",
              }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </motion.div>

          {/* Efeito de brilho durante transição */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0],
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 1.8,
            }}
            style={{
              background: "radial-gradient(circle at center 70%, rgba(255,255,255,0.3) 0%, transparent 60%)",
            }}
          />

          {/* Badge */}
          <motion.img
            src="/images/inspired-by-lando-norris.png"
            alt="Inspired by Lorenzo"
            className="absolute bottom-24 left-4 z-10 pointer-events-none w-20"
            style={{ height: "auto" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </div>

        {/* Botão Iniciar Tour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-0 right-0 z-30 flex justify-center"
        >
          <motion.button
            onClick={handleStartTour}
            whileTap={{ scale: 0.95 }}
            className="bg-lorenzo-accent text-white font-bold uppercase px-8 py-4 rounded-full text-base tracking-wider shadow-xl shadow-lorenzo-accent/40 flex items-center gap-3"
          >
            Iniciar Tour
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </section>
    )
  }

  // Desktop: Layout original com InteractivePortrait
  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#000000]">
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
