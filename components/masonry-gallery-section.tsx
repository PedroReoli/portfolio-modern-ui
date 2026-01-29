"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

type Language = "pt" | "en"

type LocalizedText = {
  pt: string
  en: string
}

type GalleryImage = {
  src: string
  alt: string
  link: string
  title: LocalizedText
  description: LocalizedText
}

const galleryImages: GalleryImage[] = [
  // {
  //   src: "/images/a1.png",
  //   alt: "Autocom3",
  //   link: "https://autocom3.com.br",
  //   title: {
  //     pt: "Autocom3 – Sistemas de Gestão ERP",
  //     en: "Autocom3 – ERP Management Systems",
  //   },
  //   description: {
  //     pt: "Site institucional criado para empresa especializada em sistemas ERP para o varejo. A estrutura foi planejada para apresentar soluções, módulos e diferenciais da plataforma de forma clara e objetiva.",
  //     en: "A corporate website built for a company specializing in ERP systems for retail. The structure was designed to present solutions, modules, and platform differentiators in a clear and objective way.",
  //   },
  // },
  {
    src: "/images/a2.png",
    alt: "Le Fauteuil",
    link: "https://lefauteuil-vercel.com.br",
    title: {
      pt: "Le Fauteuil – Loja de Poltronas",
      en: "Le Fauteuil – Premium Armchair Store",
    },
    description: {
      pt: "Projeto visual inspirado em lojas parisienses, voltado para a venda de poltronas de alto padrão. O layout valoriza elegância, sofisticação e experiência do usuário, com foco em apresentação de produtos e identidade visual refinada.",
      en: "A visual concept inspired by Parisian boutiques, focused on selling premium armchairs. The layout emphasizes elegance, sophistication, and user experience, with attention to product presentation and refined branding.",
    },
  },
  {
    src: "/images/a5.png",
    alt: "PetCare",
    link: "https://ecommercepetshoppedroreoli.vercel.app/",
    title: {
      pt: "PetCare – E-commerce para PetShop",
      en: "PetCare – Pet Shop E-commerce",
    },
    description: {
      pt: "E-commerce desenvolvido para loja de produtos pet, com foco em usabilidade, organização de categorias e experiência de compra. O projeto valoriza navegação intuitiva, apresentação de produtos e processo de checkout simplificado.",
      en: "An e-commerce experience built for a pet products store, focused on usability, category organization, and the buying journey. The project highlights intuitive navigation, strong product presentation, and a simplified checkout flow.",
    },
  },
  {
    src: "/images/a6.png",
    alt: "Sivis Tecnologia",
    link: "https://sivis.com.br",
    title: {
      pt: "Sivis Tecnologia – Sistemas para Clubes",
      en: "Sivis Tecnologia – Management Systems for Clubs",
    },
    description: {
      pt: "Site institucional criado para empresa especializada em sistemas de gestão para clubes. A estrutura foi pensada para apresentar soluções, diferenciais e módulos do sistema de forma clara e objetiva.",
      en: "A corporate website created for a company specializing in club management systems. The structure was planned to present solutions, differentiators, and system modules clearly and objectively.",
    },
  },
  {
    src: "/images/a7.png",
    alt: "Nexus Brazil",
    link: "https://nexusbrazil.com.br",
    title: {
      pt: "Nexus Brazil – Proteção Veicular",
      en: "Nexus Brazil – Vehicle Protection",
    },
    description: {
      pt: "Site institucional desenvolvido para empresa de proteção veicular. O projeto destaca planos, benefícios, cobertura e formas de adesão, com foco em confiança, acessibilidade e navegação intuitiva.",
      en: "A corporate website developed for a vehicle protection company. The project highlights plans, benefits, coverage, and enrollment options, with a focus on trust, accessibility, and intuitive navigation.",
    },
  },
  {
    src: "/images/a4.png",
    alt: "InvestPro – Evento de Mercado Financeiro",
    link: "https://investpro-vercel.com.br",
    title: {
      pt: "InvestPro – Evento de Mercado Financeiro",
      en: "InvestPro – Financial Market Event",
    },
    description: {
      pt: "Landing page desenvolvida para divulgação de evento do mercado financeiro. O projeto prioriza conversão, clareza das informações e organização do cronograma, palestrantes e temas abordados.",
      en: "A landing page built to promote a financial market event. The project prioritizes conversion, clarity of information, and the organization of the schedule, speakers, and topics covered.",
    },
  },
]

type Labels = {
  my: string
  projects: string
  details: string
  less: string
  learnMore: string
}

function localizeImages(images: GalleryImage[], language: Language) {
  return images.map((image) => ({
    ...image,
    title: image.title[language],
    description: image.description[language],
  }))
}

export default function MasonryGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { language } = useLanguage()

  const labels: Labels =
    language === "en"
      ? {
          my: "MY",
          projects: "PROJECTS",
          details: "Details",
          less: "Less",
          learnMore: "Learn More",
        }
      : {
          my: "MEUS",
          projects: "PROJETOS",
          details: "Detalhes",
          less: "Menos",
          learnMore: "Saiba Mais",
        }

  const localizedImages = localizeImages(galleryImages, language)

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

  const backgroundColor = useTransform(scrollYProgress, [0, 0.6, 0.9], ["#000000", "#ccc", "#ffffff"])
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", isMobile ? "0vh" : "-100vh"])

  const column1 = localizedImages.filter((_, i) => i % 2 === 0)
  const column2 = localizedImages.filter((_, i) => i % 2 === 1)

  if (isMobile) {
    return (
      <section ref={sectionRef} id="masonry-gallery" className="relative bg-black py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-black uppercase tracking-tight leading-[1.1]">
            <span className="text-lorenzo-accent font-brier text-4xl">{labels.my}</span>{" "}
            <span className="text-white text-4xl">{labels.projects}</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6 w-full">
          {localizedImages.map((image, index) => (
            <MasonryCard key={`mobile-${index}`} image={image} labels={labels} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="masonry-gallery"
      className="relative"
      style={{
        height: "250vh",
      }}
    >
      <motion.div className="sticky top-0 h-screen w-full overflow-visible" style={{ backgroundColor }}>
        <motion.div style={{ y }} className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky top-8 z-20 mb-8 md:mb-16 text-center px-2"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1]">
              <span className="text-lorenzo-accent font-brier text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
                {labels.my}
              </span>{" "}
              <span className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
                {labels.projects}
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 w-full">
            <div className="flex flex-col gap-8 md:gap-10 w-full md:w-1/2">
              {column1.map((image, index) => (
                <MasonryCard key={`col1-${index}`} image={image} labels={labels} />
              ))}
            </div>

            <div className="flex flex-col gap-8 md:gap-10 w-full md:w-1/2">
              {column2.map((image, index) => (
                <MasonryCard key={`col2-${index}`} image={image} labels={labels} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

type LocalizedImage = ReturnType<typeof localizeImages>[number]

function MasonryCard({ image, labels }: { image: LocalizedImage; labels: Labels }) {
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

      <div className="px-1">
        <div className="rounded-xl border border-white/10 bg-black/70 px-4 py-3 shadow-lg backdrop-blur">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 line-clamp-2 drop-shadow-sm">
            {image.title}
          </h3>

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
              {showDescription ? labels.less : labels.details}
            </button>
            <Link
              href={image.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-lorenzo-accent hover:bg-lorenzo-accent-light text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1"
            >
              {labels.learnMore}
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
