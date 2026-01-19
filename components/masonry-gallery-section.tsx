"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import CardBlobOverlay from "./card-blob-overlay"

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Background transition: Black -> Gray -> White
  const backgroundColor = useTransform(scrollYProgress, [0, 0.6, 0.9], ["#000000", "#ccc", "#ffffff"])

  // Y Movement: Move grid up to reveal all images
  // Starts at 0vh and moves up to -100vh to show bottom images
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-100vh"])

  const column1 = galleryImages.filter((_, i) => i % 2 === 0)
  const column2 = galleryImages.filter((_, i) => i % 2 === 1)

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
            className="sticky top-8 z-20 mb-12 md:mb-16 text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1] whitespace-nowrap">
              <span className="text-lorenzo-accent font-brier text-8xl md:text-9xl">MEUS</span>{" "}
              <span className="text-white text-8xl md:text-9xl">PROJETOS</span>
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
  const [isHovered, setIsHovered] = useState(false)

  // 1920x1080 = 16:9
  return (
    <Link href={image.link || "#"} className="block">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ scale: 1.03, y: -12 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative overflow-hidden rounded-2xl bg-black shadow-xl hover:shadow-2xl transition-all duration-500 w-full cursor-pointer border border-gray-800/50 hover:border-lorenzo-accent/60"
        style={{ aspectRatio: "21 / 9" }}
      >
        <Image
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          quality={95}
        />
        
        {/* Overlay com animação blob */}
        <CardBlobOverlay isHovered={isHovered} className="z-10" />
        
        {/* Conteúdo de texto */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-10 pointer-events-none"
            >
              <div className="relative z-30 text-white">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-5 font-oswald uppercase tracking-wide drop-shadow-lg">
                  {image.title}
                </h3>
                <p className="text-sm md:text-base lg:text-lg leading-relaxed opacity-90 drop-shadow-md max-w-2xl">
                  {image.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  )
}
