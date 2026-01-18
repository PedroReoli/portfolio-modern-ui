"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const socialImages = [
  "/images/lofan/lofan2.jpg",
  "/images/lorenzo-piloto2.png",
  "/images/lorenzo-piloto3.png",
  "/images/lofan/lofan8.jpg", // Center image
  "/images/lorenzo-piloto5.png",
  "/images/lorenzo-piloto1.png", // Added to reach 7
  "/images/lorenzo-col.jpg", // Added to reach 7
]

const handIcons = [
  "/images/icon/icon-hand1.png",
  "/images/icon/icon-hand2.png",
  "/images/icon/icon-hand3.png",
  "/images/icon/icon-hand4.png",
  "/images/icon/icon-hand5.png",
  "/images/icon/icon-hand6.png",
]

export default function SocialSection() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % handIcons.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="social-section" className="relative bg-[#F5F1E8] text-black py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-32 flex items-center justify-center mt-16">
          {/* Replaced static image with animated icon switcher */}
          <div className="relative h-full w-auto max-h-[60px] aspect-square">
            {handIcons.map((icon, index) => (
              <div
                key={icon}
                className={`absolute inset-0 transition-opacity duration-0 ${
                  index === currentIconIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={icon || "/placeholder.svg"}
                  className="h-full w-full object-contain"
                  alt="Animated hand icon"
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-none text-lorenzo-dark mb-8">
            Me siga nas redes sociais
          </h2>
        </motion.div>

        {/* Carrossel de imagens comentado */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative h-[600px] md:h-[700px] mb-16 flex items-center justify-center"
        >
          {socialImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotate: 0, scale: 0 }}
              whileInView={{
                opacity: 1,
                rotate: (i - 3) * 6, // Adjusted rotation for 7 items (centered at index 3)
                scale: 1 - Math.abs(i - 3) * 0.02, // Reduced scale drop-off
                x: (i - 3) * 90, // Tighter horizontal overlap
                y: Math.abs(i - 3) * 35, // Adjusted vertical curve
              }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.1,
                type: "spring",
                stiffness: 60,
                damping: 12,
              }}
              viewport={{ once: true }}
              whileHover={{
                rotate: 0,
                scale: 1.1,
                zIndex: 20,
                y: -40,
                transition: { duration: 0.3 },
              }}
              className="absolute w-60 md:w-80 h-80 md:h-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer origin-bottom"
              style={{ zIndex: 10 - Math.abs(i - 3) }} // Adjusted z-index logic for 7 items
            >
              <div className="relative w-full h-full">
                <Image src={image || "/placeholder.svg"} alt={`Social post ${i + 1}`} fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              href="https://www.instagram.com/domus_pedroreoli/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="font-black uppercase text-sm tracking-wider text-black hover:text-black/60 transition-colors"
            >
              INSTAGRAM
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/pedro-lucas-reis-a93945171/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="font-black uppercase text-sm tracking-wider text-black hover:text-black/60 transition-colors"
            >
              LINKEDIN
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@DevDesenvolvimento"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="font-black uppercase text-sm tracking-wider text-black hover:text-black/60 transition-colors"
            >
              YOUTUBE
            </motion.a>
            <motion.a
              href="https://github.com/PedroReoli"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="font-black uppercase text-sm tracking-wider text-black hover:text-black/60 transition-colors"
            >
              GITHUB
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
