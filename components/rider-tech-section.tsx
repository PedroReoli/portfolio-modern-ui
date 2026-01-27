"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

type Language = "pt" | "en"

type Content = {
  aboutPrimary: string
  aboutSecondary: string
  intro1: string
  intro2: string
  evaAlt1: string
  evaAlt2: string
  evaAlt3: string
  evaAlt4: string
  evaDesc: string
  evaLink: string
  falaTitle: string
  falaDesc: string
  falaLink: string
  falaAlt: string
}

function getContent(language: Language): Content {
  if (language === "en") {
    return {
      aboutPrimary: "ABOUT",
      aboutSecondary: "ME",
      intro1:
        "A developer passionate about building web solutions that combine elegant design with top-tier functionality. Specialized in both front-end and back-end development, focused on performance, scalability, and user experience.",
      intro2:
        "Beyond commercial projects, I dedicate time to social impact initiatives that use technology to transform lives and promote digital inclusion.",
      evaAlt1: "EVA.Tech - Digital empowerment project",
      evaAlt2: "EVA.Tech - Technology training",
      evaAlt3: "EVA.Tech - Social impact",
      evaAlt4: "EVA.Tech - Social project",
      evaDesc:
        "EVA.Tech is a high-impact social initiative focused on the digital empowerment of Black women. The project promotes autonomy and female leadership in technology by offering training in digital tools and online safety.",
      evaLink: "Learn more about the project ->",
      falaTitle: "FalaAtipica",
      falaDesc:
        "A technology solution designed for children with speech delays, encouraging verbal expression in a playful, accessible, and empathetic way.",
      falaLink: "Explore the project ->",
      falaAlt: "FalaAtipica - Assistive technology for children",
    }
  }

  return {
    aboutPrimary: "SOBRE",
    aboutSecondary: "MIM",
    intro1:
      "Desenvolvedor apaixonado por criar solucoes web que unem design elegante e funcionalidade de ponta. Especializado em desenvolvimento front-end e back-end, com foco em performance, escalabilidade e experiencia do usuario.",
    intro2:
      "Alem de projetos comerciais, dedico-me a iniciativas de impacto social que utilizam tecnologia para transformar vidas e promover inclusao digital.",
    evaAlt1: "EVA.Tech - Projeto de empoderamento digital",
    evaAlt2: "EVA.Tech - Capacitacao em tecnologia",
    evaAlt3: "EVA.Tech - Impacto social",
    evaAlt4: "EVA.Tech - Projeto social",
    evaDesc:
      "EVA.Tech surge como uma iniciativa de grande impacto social. Focado no empoderamento digital de mulheres negras, o projeto busca promover a autonomia e o protagonismo feminino no universo da tecnologia, oferecendo capacitacao em ferramentas digitais e seguranca on-line.",
    evaLink: "Saiba mais sobre o projeto ->",
    falaTitle: "FalaAtipica",
    falaDesc:
      "Solucao tecnologica voltada a criancas com atraso de fala, promovendo a expressao verbal de forma ludica, acessivel e afetiva.",
    falaLink: "Conheca o projeto ->",
    falaAlt: "FalaAtipica - Tecnologia assistiva para criancas",
  }
}

export default function RiderTechSection() {
  const { language } = useLanguage()
  const content = getContent(language)

  return (
    <section id="sobre-mim" className="relative min-h-[auto] md:min-h-screen bg-white px-4 sm:px-6 md:px-12 overflow-visible py-10 md:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-tight inline-block">
            <span className="font-sans text-lorenzo-dark">{content.aboutPrimary}</span>{" "}
            <span className="font-brier text-lorenzo-dark text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl">
              {content.aboutSecondary}
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-16 space-y-4 md:space-y-6"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">{content.intro1}</p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">{content.intro2}</p>
          </motion.div>

          <div className="space-y-12 md:space-y-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                <div className="grid grid-cols-2 gap-3 md:gap-6 order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl"
                    style={{ aspectRatio: "4 / 3", minHeight: "120px" }}
                  >
                    <Image
                      src="/images/eu/evatech.jpg"
                      alt={content.evaAlt1}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl"
                    style={{ aspectRatio: "4 / 3", minHeight: "120px" }}
                  >
                    <Image
                      src="/images/eu/evatech2.jpg"
                      alt={content.evaAlt2}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl"
                    style={{ aspectRatio: "4 / 3", minHeight: "120px" }}
                  >
                    <Image
                      src="/images/eu/evatech3.jpg"
                      alt={content.evaAlt3}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl"
                    style={{ aspectRatio: "4 / 3", minHeight: "120px" }}
                  >
                    <Image
                      src="/images/eu/evatech4.jpg"
                      alt={content.evaAlt4}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                </div>
                <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                  <h3 className="text-2xl md:text-4xl font-bold text-lorenzo-dark font-oswald uppercase tracking-wide">
                    EVA.Tech
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">{content.evaDesc}</p>
                  <Link
                    href="https://www.unifoa.edu.br/noticias/projeto-proporciona-empoderamento-a-mulheres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-lorenzo-accent hover:text-lorenzo-accent/80 transition-colors font-medium text-sm md:text-base"
                  >
                    {content.evaLink}
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                  <h3 className="text-2xl md:text-4xl font-bold text-lorenzo-dark font-oswald uppercase tracking-wide">
                    {content.falaTitle}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">{content.falaDesc}</p>
                  <Link
                    href="https://falaatipica.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-lorenzo-accent hover:text-lorenzo-accent/80 transition-colors font-medium text-sm md:text-base"
                  >
                    {content.falaLink}
                  </Link>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative w-full rounded-lg md:rounded-xl overflow-hidden shadow-lg md:shadow-xl order-1 md:order-2"
                  style={{ aspectRatio: "4 / 3", minHeight: "200px" }}
                >
                  <Image
                    src="/images/eu/TCC-img2.jpg"
                    alt={content.falaAlt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
