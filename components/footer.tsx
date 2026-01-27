"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

const HelmetCanvas = dynamic(() => import("./helmet-canvas").then((mod) => mod.default), {
  ssr: false,
})

type Language = "pt" | "en"

type FooterText = {
  line1: string
  line1Accent: string
  line2: string
  line2Accent: string
  contact: string
  rights: string
}

function getFooterText(language: Language): FooterText {
  if (language === "en") {
    return {
      line1: "ALWAYS",
      line1Accent: " TRANSFORMING",
      line2: "IDEAS INTO",
      line2Accent: "REALITY.",
      contact: "GET IN TOUCH",
      rights: "All rights reserved.",
    }
  }

  return {
    line1: "SEMPRE",
    line1Accent: " TRANSFORMANDO",
    line2: "IDEIAS EM",
    line2Accent: "REALIDADE.",
    contact: "ENTRE EM CONTATO",
    rights: "Todos os direitos reservados.",
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappNumber = "24993264040"
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const { language } = useLanguage()

  const footerText = getFooterText(language)

  return (
    <footer className="bg-lorenzo-accent pt-0 px-4 md:px-8 min-h-[80vh] md:min-h-screen flex flex-col justify-end relative pb-5">
      <div className="absolute top-0 left-0 right-0 h-48 md:h-72 bg-gradient-to-b from-[#f5f1e8] to-lorenzo-accent z-0" />

      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-8 md:mt-12 z-10">
        <div
          className="absolute inset-0 w-full h-full z-0 bg-[#000000] overflow-hidden rounded-3xl md:rounded-none"
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

        <div className="relative z-20 flex flex-col h-full px-4 sm:px-8 md:px-24 py-8 md:py-20 md:pb-12 md:pl-0 md:pr-0">
          <div className="flex-1 flex items-center justify-center mt-0">
            <div className="flex flex-col items-center justify-center relative w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:hidden relative z-20 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-5 mx-2 mb-4 border border-white/20 shadow-xl"
              >
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-[1.2] text-center text-white">
                  <span className="font-sans block">
                    {footerText.line1}
                    <span className="font-brier text-lorenzo-accent">{footerText.line1Accent}</span>
                  </span>
                  <span className="font-sans block">
                    {footerText.line2} <span className="font-brier text-lorenzo-accent">{footerText.line2Accent}</span>
                  </span>
                </h2>
              </motion.div>

              <div className="hidden md:block absolute top-0 left-0 right-0 z-0 text-center mt-20 lg:mt-24 px-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[1.15] text-lorenzo-text-light mix-blend-overlay opacity-90"
                >
                  <span className="font-sans block">
                    {footerText.line1}
                    <span className="font-brier text-lorenzo-accent">{footerText.line1Accent}</span>
                  </span>
                  <span className="font-sans block">
                    {footerText.line2} <span className="font-brier text-lorenzo-accent">{footerText.line2Accent}</span>
                  </span>
                </motion.h2>
              </div>

              <div className="relative w-full h-[140px] sm:h-[180px] md:h-[350px] lg:h-[450px] z-10 md:mt-28">
                <HelmetCanvas />
              </div>

              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative mt-4 sm:mt-6 z-20 bg-lorenzo-accent text-lorenzo-dark font-black uppercase px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl text-xs sm:text-sm md:text-base tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                {footerText.contact}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1688px] mx-auto px-4 md:px-12 relative z-20 pt-4 md:pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-lorenzo-dark text-[10px] sm:text-xs font-bold tracking-wider uppercase text-center">
          <p>© {currentYear} Pedro Reis. {footerText.rights}</p>
        </div>
      </div>
    </footer>
  )
}
