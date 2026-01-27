"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export default function SignatureMarqueeSection() {
  const { language } = useLanguage()

  const topLineText =
    language === "en"
      ? "WEB DEVELOPMENT REACT NEXT.JS TYPESCRIPT JAVASCRIPT"
      : "DESENVOLVIMENTO WEB REACT NEXT.JS TYPESCRIPT JAVASCRIPT"

  const bottomLineText =
    language === "en"
      ? "UI/UX DESIGN FRONTEND BACKEND REST API NODE.JS"
      : "UI/UX DESIGN FRONTEND BACKEND API REST NODE.JS"

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden">
      <div className="w-full flex flex-col gap-4 md:gap-8 py-10 select-none pointer-events-none">
        {/* Top Line - Moving Right */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Using negative value for left-to-right movement illusion or adjust direction
            // Let's start from -1000 to 0 to move RIGHT, or use negative keyframes for Left.
            // Moving RIGHT: x: [-1000, 0]
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="font-[family-name:var(--font-brier)] text-[12vw] md:text-[8vw] text-[#C3271D] leading-[0.9] tracking-tight px-4"
              >
                {topLineText} {topLineText} {topLineText}
              </h2>
            ))}
          </motion.div>
          {/* Duplicate for seamless loop if needed, or just map above ensures enough width */}
        </div>

        {/* Bottom Line - Moving Left */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Moves LEFT
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="font-[family-name:var(--font-oswald)] font-bold uppercase text-[12vw] md:text-[8vw] text-white leading-[0.9] tracking-tighter px-4"
              >
                {bottomLineText} {bottomLineText} {bottomLineText} {bottomLineText}
              </h2>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
