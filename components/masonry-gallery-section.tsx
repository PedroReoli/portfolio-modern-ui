"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const galleryImages = [
  {
    src: "/images/a1.png",
    alt: "Autocom3",
    link: "https://autocom3.com.br",
    title: "Autocom3 – Sistemas de Gestão ERP",
    description: "Site institucional criado para empresa especializada em sistemas ERP para o varejo. A estrutura foi planejada para apresentar soluções, módulos e diferenciais da plataforma de forma clara e objetiva.",
  },
  {
    src: "/images/a2.png",
    alt: "Le Fauteuil",
    link: "https://lefauteuil-vercel.com.br",
    title: "Le Fauteuil – Loja de Poltronas ",
    description: "Projeto visual inspirado em lojas parisienses, voltado para a venda de poltronas de alto padrão. O layout valoriza elegância, sofisticação e experiência do usuário, com foco em apresentação de produtos e identidade visual refinada.",
  },
  {
    src: "/images/a5.png",
    alt: "PetCare",
    link: "https://ecommercepetshoppedroreoli.vercel.app/",
    title: "PetCare – E-commerce para PetShop",
    description: "E-commerce desenvolvido para loja de produtos pet, com foco em usabilidade, organização de categorias e experiência de compra. O projeto valoriza navegação intuitiva, apresentação de produtos e processo de checkout simplificado.",
  },
  {
    src: "/images/a6.png",
    alt: "Sivis Tecnologia",
    link: "https://sivis.com.br",
    title: "Sivis Tecnologia – Sistemas para Clubes",
    description: "Site institucional criado para empresa especializada em sistemas de gestão para clubes. A estrutura foi pensada para apresentar soluções, diferenciais e módulos do sistema de forma clara e objetiva.",
  },
  {
    src: "/images/a7.png",
    alt: "Nexus Brazil",
    link: "https://nexusbrazil.com.br",
    title: "Nexus Brazil – Proteção Veicular",
    description: "Site institucional desenvolvido para empresa de proteção veicular. O projeto destaca planos, benefícios, cobertura e formas de adesão, com foco em confiança, acessibilidade e navegação intuitiva.",
  },
  {
    src: "/images/a4.png",
    alt: "InvestPro – Evento de Mercado Financeiro",
    link: "https://investpro-vercel.com.br",
    title: "InvestPro – Evento de Mercado Financeiro",
    description: "Landing page desenvolvida para divulgação de evento do mercado financeiro. O projeto prioriza conversão, clareza das informações e organização do cronograma, palestrantes e temas abordados.",
  },
]

export default function MasonryGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Background transition: Black -> Gray -> White
  const backgroundColor = useTransform(scrollYProgress, [0, 0.6, 0.9], ["#000000", "#ccc", "#ffffff"])

  // Y Movement: Move grid up to reveal all images (only on desktop)
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", isMobile ? "0vh" : "-100vh"])

  const column1 = galleryImages.filter((_, i) => i % 2 === 0)
  const column2 = galleryImages.filter((_, i) => i % 2 === 1)

  // Mobile: layout simples sem parallax
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="masonry-gallery"
        className="relative bg-black py-16 px-4"
      >
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-black uppercase tracking-tight leading-[1.1]">
            <span className="text-lorenzo-accent font-brier text-4xl">MEUS</span>{" "}
            <span className="text-white text-4xl">PROJETOS</span>
          </h2>
        </motion.div>

        {/* Cards em coluna única para mobile */}
        <div className="flex flex-col gap-6 w-full">
          {galleryImages.map((image, index) => (
            <MasonryCard key={`mobile-${index}`} image={image} index={index} />
          ))}
        </div>
      </section>
    )
  }

  // Desktop: layout com parallax
  return (
    <section
      ref={sectionRef}
      id="masonry-gallery"
      className="relative"
      style={{
        height: "250vh",
      }}
    >
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor }}>
        <motion.div style={{ y }} className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20">
          {/* Título fixo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky top-8 z-20 mb-8 md:mb-16 text-center px-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1]">
              <span className="text-lorenzo-accent font-brier text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">MEUS</span>{" "}
              <span className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">PROJETOS</span>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 w-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 md:gap-10 w-full md:w-1/2">
              {column1.map((image, index) => (
                <MasonryCard key={`col1-${index}`} image={image} index={index * 2} />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8 md:gap-10 w-full md:w-1/2">
              {column2.map((image, index) => (
                <MasonryCard key={`col2-${index}`} image={image} index={index * 2 + 1} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MasonryCard({ image, index }: { image: any; index: number }) {
  const [showDescription, setShowDescription] = useState(false)

  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative overflow-hidden rounded-2xl bg-black shadow-xl w-full border border-gray-800/50"
        style={{ aspectRatio: "16 / 9" }}
      >
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          quality={95}
        />
      </motion.div>

      {/* Título e botão abaixo da imagem */}
      <div className="px-1">
        <div className="rounded-xl border border-white/10 bg-black/70 px-4 py-3 shadow-lg backdrop-blur">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 line-clamp-2 drop-shadow-sm">
            {image.title}
          </h3>

          {/* Descrição expansível */}
          <AnimatePresence>
            {showDescription && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs sm:text-sm text-white/80 mb-3 leading-relaxed"
              >
                {image.description}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors"
            >
              {showDescription ? "Menos" : "Detalhes"}
            </button>
            <Link
              href={image.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-lorenzo-accent hover:bg-lorenzo-accent-light text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1"
            >
              Saiba Mais
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
