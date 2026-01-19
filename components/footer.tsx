"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const HelmetCanvas = dynamic(() => import("./helmet-canvas").then((mod) => mod.default), {
  ssr: false,
})

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappNumber = "24993264040"
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const emailAddress = "pedrosousa2160@gmail.com"
  
  return (
    <footer className="bg-lorenzo-accent pt-0 px-4 md:px-8 min-h-screen flex flex-col justify-end relative pb-5">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-[#f5f1e8] to-lorenzo-accent z-0" />

      {/* Main Dark Card Container */}
      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-12 z-10">
        {/* SVG Background Mask */}
        <div
          className="absolute inset-0 w-full h-full z-0 bg-[#000000] overflow-hidden"
          style={{
            maskImage: 'url("/images/footer-mask.svg")',
            WebkitMaskImage: 'url("/images/footer-mask.svg")',
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0 w-full h-full opacity-30"
            style={{
              backgroundImage: 'url("/images/curv.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Increased padding-x to push content inwards away from mask edges, and added padding-bottom to prevent overflow */}
        <div className="relative z-20 flex flex-col h-full px-8 md:px-24 py-12 md:py-20 md:pb-12 md:pl-0 md:pr-0">
          {/* Main Content Grid */}
          <div className="flex-1 flex items-center justify-center mt-0">
            {/* Center Column - Helmet & Title */}
            <div className="flex flex-col items-center justify-center relative w-full">
              {/* Typography Overlay - Increased top margin for more spacing */}
              <div className="absolute top-0 left-0 right-0 z-0 text-center transform -translate-y-1/4 md:-translate-y-0 mt-24">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-lorenzo-text-light mix-blend-overlay opacity-90"
                >
                  <span className="font-sans block">SEMPRE 
                  <span className="font-brier text-lorenzo-accent"> TRANSFORMANDO</span>
                  </span>
                  <span className="font-sans block">
                    IDEIAS EM <span className="font-brier text-lorenzo-accent">REALIDADE.</span>
                  </span>
                </motion.h2>
              </div>

              {/* 3D Helmet */}
              <div className="relative w-full h-[300px] md:h-[500px] z-10 mt-24 md:mt-24">
                <HelmetCanvas />
              </div>

              {/* CTA Button - Adjusted bottom position to be closer to helmet */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-12 z-20 bg-lorenzo-accent text-lorenzo-dark font-black uppercase px-8 py-4 rounded-[14px] text-sm tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                ENTRE EM CONTATO
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar (Outside Card) */}
      <div className="w-full max-w-[1688px] mx-auto px-8 md:px-12 relative z-20 pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-lorenzo-dark text-xs font-bold tracking-wider uppercase">
          <p>© {currentYear} Pedro Reis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
