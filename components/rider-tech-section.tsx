"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function RiderTechSection() {
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
            <span className="font-sans text-lorenzo-dark">SOBRE</span>{" "}
            <span className="font-brier text-lorenzo-dark text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl">MIM</span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Texto introdutório */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 md:mb-16 space-y-4 md:space-y-6"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">
              Desenvolvedor apaixonado por criar soluções web que unem design elegante e funcionalidade de ponta.
              Especializado em desenvolvimento front-end e back-end, com foco em performance, escalabilidade e
              experiência do usuário.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">
              Além de projetos comerciais, dedico-me a iniciativas de impacto social que utilizam tecnologia para
              transformar vidas e promover inclusão digital.
            </p>
          </motion.div>

          {/* Projetos */}
          <div className="space-y-12 md:space-y-32">
            {/* EVA.Tech */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Imagens à esquerda */}
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
                      alt="EVA.Tech - Projeto de empoderamento digital"
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
                      alt="EVA.Tech - Capacitação em tecnologia"
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
                      alt="EVA.Tech - Impacto social"
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
                      alt="EVA.Tech - Projeto social"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 45vw, 25vw"
                    />
                  </motion.div>
                </div>
                {/* Texto à direita */}
                <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                  <h3 className="text-2xl md:text-4xl font-bold text-lorenzo-dark font-oswald uppercase tracking-wide">
                    EVA.Tech
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">
                    EVA.Tech surge como uma iniciativa de grande impacto social. Focado no empoderamento digital de
                    mulheres negras, o projeto busca promover a autonomia e o protagonismo feminino no universo da
                    tecnologia, oferecendo capacitação em ferramentas digitais e segurança on-line.
                  </p>
                  <Link
                    href="https://www.unifoa.edu.br/noticias/projeto-proporciona-empoderamento-a-mulheres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-lorenzo-accent hover:text-lorenzo-accent/80 transition-colors font-medium text-sm md:text-base"
                  >
                    Saiba mais sobre o projeto →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* FalaAtípica */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Texto à esquerda */}
                <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                  <h3 className="text-2xl md:text-4xl font-bold text-lorenzo-dark font-oswald uppercase tracking-wide">
                    FalaAtípica
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-lorenzo-dark">
                    Solução tecnológica voltada a crianças com atraso de fala, promovendo a expressão verbal de forma
                    lúdica, acessível e afetiva.
                  </p>
                  <Link
                    href="https://falaatipica.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-lorenzo-accent hover:text-lorenzo-accent/80 transition-colors font-medium text-sm md:text-base"
                  >
                    Conheça o projeto →
                  </Link>
                </div>
                {/* Imagem à direita */}
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
                    alt="FalaAtípica - Tecnologia assistiva para crianças"
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
