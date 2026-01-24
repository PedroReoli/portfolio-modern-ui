"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Icons from "react-icons/si"
import * as TablerIcons from "react-icons/tb"
import * as FontAwesomeIcons from "react-icons/fa"
import technologiesData from "../technologies.json"

type ViewType = "stack" | "competencies"

interface CompetencyItem {
  name: string
  description: string
  category: string
}

const competencies: CompetencyItem[] = [
  // Front-end
  {
    name: "Responsividade",
    description: "Layout que se adapta a qualquer tela.",
    category: "Front-end",
  },
  {
    name: "Mobile First",
    description: "Desenvolvimento focado primeiro no celular.",
    category: "Front-end",
  },
  {
    name: "Acessibilidade básica",
    description: "Interfaces utilizáveis por todos.",
    category: "Front-end",
  },
  {
    name: "Performance",
    description: "Páginas leves e rápidas.",
    category: "Front-end",
  },
  {
    name: "Componentização",
    description: "Interface dividida em partes reutilizáveis.",
    category: "Front-end",
  },
  {
    name: "Atomic Design",
    description: "Organização de componentes por níveis.",
    category: "Front-end",
  },
  // Back-end
  {
    name: "APIs REST",
    description: "Criação e consumo de APIs organizadas.",
    category: "Back-end",
  },
  {
    name: "Regras de negócio",
    description: "Lógica clara no servidor.",
    category: "Back-end",
  },
  {
    name: "Banco de dados",
    description: "Criação e manipulação de dados.",
    category: "Back-end",
  },
  {
    name: "Validação de dados",
    description: "Evita dados incorretos.",
    category: "Back-end",
  },
  {
    name: "Segurança básica",
    description: "Proteção contra acessos indevidos.",
    category: "Back-end",
  },
  // Código e Qualidade
  {
    name: "Clean Code",
    description: "Código fácil de ler e manter.",
    category: "Código e Qualidade",
  },
  {
    name: "Padronização",
    description: "Mesmo estilo em todo projeto.",
    category: "Código e Qualidade",
  },
  {
    name: "Organização de pastas",
    description: "Estrutura clara.",
    category: "Código e Qualidade",
  },
  {
    name: "Refatoração",
    description: "Melhoria contínua do código.",
    category: "Código e Qualidade",
  },
  // Ferramentas e Processo
  {
    name: "Git",
    description: "Controle de versões.",
    category: "Ferramentas e Processo",
  },
  {
    name: "GitHub",
    description: "Trabalho em equipe.",
    category: "Ferramentas e Processo",
  },
  {
    name: "Postman",
    description: "Testes de APIs.",
    category: "Ferramentas e Processo",
  },
  {
    name: "Swagger",
    description: "Documentação de APIs.",
    category: "Ferramentas e Processo",
  },
  {
    name: "Notion",
    description: "Organização de tarefas.",
    category: "Ferramentas e Processo",
  },
]

const categories = {
  stack: ["Front-end", "Back-end", "APIs e Integrações", "Versionamento e Colaboração", "Outros"],
  competencies: ["Front-end", "Back-end", "Código e Qualidade", "Ferramentas e Processo"],
}

// Helper para renderizar ícones dinamicamente
const getIcon = (iconType: string) => {
  const IconComponent =
    (Icons as any)[iconType] ||
    (TablerIcons as any)[iconType] ||
    (FontAwesomeIcons as any)[iconType]
  
  return IconComponent || FontAwesomeIcons.FaCode
}

export default function HelmetHall() {
  const [view, setView] = useState<ViewType>("stack")

  const groupedStack = categories.stack.map((category) => ({
    category,
    items: technologiesData.technologies.filter((tech) => tech.category === category),
  }))

  const groupedCompetencies = categories.competencies.map((category) => ({
    category,
    items: competencies.filter((item) => item.category === category),
  }))

  return (
    <section id="technologies" className="relative min-h-screen text-white py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-center">
            <span className="text-white">Tecnologias e</span>
            <br />
            <span className="text-lorenzo-accent font-brier text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">Competências</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mt-6 max-w-3xl mx-auto text-center">
            Utilizo ferramentas modernas e boas práticas para desenvolver aplicações organizadas, funcionais e de fácil
            manutenção.
          </p>
        </motion.div>

        {/* Botões de alternância */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8 px-2">
          <motion.button
            onClick={() => setView("stack")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ${
              view === "stack"
                ? "bg-lorenzo-accent text-black shadow-lg shadow-lorenzo-accent/50"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Stack
          </motion.button>
          <motion.button
            onClick={() => setView("competencies")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ${
              view === "competencies"
                ? "bg-lorenzo-accent text-black shadow-lg shadow-lorenzo-accent/50"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            Competências
          </motion.button>
        </div>

        {/* Descrição da seção ativa */}
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div
              key="stack-desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">
                Ferramentas, linguagens e tecnologias que utilizo no desenvolvimento.
              </p>
            </motion.div>
          )}
          {view === "competencies" && (
            <motion.div
              key="competencies-desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
            >
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">
                Práticas e conhecimentos que aplico para garantir qualidade, organização e boa experiência do usuário.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conteúdo */}
        <AnimatePresence mode="wait">
          {view === "stack" && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {groupedStack.map((group, groupIndex) => (
                <div key={group.category} className="space-y-4">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-lorenzo-accent mb-6"
                  >
                    {group.category}
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {group.items.map((tech, index) => {
                      const IconComponent = getIcon(tech.iconType)
                      return (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (groupIndex * 0.05 + index * 0.03) }}
                          whileHover={{ scale: 1.02, y: -3 }}
                          className="group relative cursor-pointer"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border-2 border-gray-800 group-hover:border-lorenzo-accent group-hover:shadow-xl group-hover:shadow-lorenzo-accent/20 transition-all duration-300 p-3 md:p-4">
                            <div className="flex items-center gap-2">
                              <IconComponent className="text-lg md:text-xl text-white/70 group-hover:text-lorenzo-accent transition-colors duration-300 shrink-0" />
                              <h4 className="text-sm md:text-base font-bold text-white group-hover:text-lorenzo-accent transition-colors duration-300">
                                {tech.name}
                              </h4>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === "competencies" && (
            <motion.div
              key="competencies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {groupedCompetencies.map((group, groupIndex) => (
                <div key={group.category} className="space-y-4">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                    className="text-2xl md:text-3xl font-bold text-lorenzo-accent mb-6"
                  >
                    {group.category}
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {group.items.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (groupIndex * 0.05 + index * 0.03) }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="group relative cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border-2 border-gray-800 group-hover:border-lorenzo-accent group-hover:shadow-xl group-hover:shadow-lorenzo-accent/20 transition-all duration-300 p-3 md:p-4">
                          <h4 className="text-sm md:text-base font-bold text-white mb-1 group-hover:text-lorenzo-accent transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
