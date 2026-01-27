"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as Icons from "react-icons/si"
import * as TablerIcons from "react-icons/tb"
import * as FontAwesomeIcons from "react-icons/fa"
import technologiesData from "../technologies.json"
import { useLanguage } from "@/components/language-provider"

type ViewType = "stack" | "competencies"
type Language = "pt" | "en"

type LocalizedText = {
  pt: string
  en: string
}

type CategoryKey =
  | "Front-end"
  | "Back-end"
  | "APIs and Integrations"
  | "Versioning and Collaboration"
  | "Others"
  | "Code and Quality"
  | "Tools and Process"

interface CompetencyItem {
  name: LocalizedText
  description: LocalizedText
  category: CategoryKey
}

const categoryLabels: Record<CategoryKey, LocalizedText> = {
  "Front-end": { pt: "Front-end", en: "Front-end" },
  "Back-end": { pt: "Back-end", en: "Back-end" },
  "APIs and Integrations": { pt: "APIs e Integrações", en: "APIs and Integrations" },
  "Versioning and Collaboration": {
    pt: "Versionamento e Colaboração",
    en: "Versioning and Collaboration",
  },
  Others: { pt: "Outros", en: "Others" },
  "Code and Quality": { pt: "Código e Qualidade", en: "Code and Quality" },
  "Tools and Process": { pt: "Ferramentas e Processo", en: "Tools and Process" },
}

const competencies: CompetencyItem[] = [
  {
    name: { pt: "Responsividade", en: "Responsiveness" },
    description: { pt: "Layout que se adapta a qualquer tela.", en: "Layouts that adapt to any screen." },
    category: "Front-end",
  },
  {
    name: { pt: "Mobile First", en: "Mobile First" },
    description: {
      pt: "Desenvolvimento focado primeiro no celular.",
      en: "Development focused on mobile devices first.",
    },
    category: "Front-end",
  },
  {
    name: { pt: "Acessibilidade básica", en: "Basic Accessibility" },
    description: {
      pt: "Interfaces utilizáveis por todos.",
      en: "Interfaces that are usable by everyone.",
    },
    category: "Front-end",
  },
  {
    name: { pt: "Performance", en: "Performance" },
    description: { pt: "Páginas leves e rápidas.", en: "Fast and lightweight pages." },
    category: "Front-end",
  },
  {
    name: { pt: "Componentização", en: "Componentization" },
    description: {
      pt: "Interface dividida em partes reutilizáveis.",
      en: "Interfaces split into reusable parts.",
    },
    category: "Front-end",
  },
  {
    name: { pt: "Atomic Design", en: "Atomic Design" },
    description: {
      pt: "Organização de componentes por níveis.",
      en: "A layered approach to component organization.",
    },
    category: "Front-end",
  },
  {
    name: { pt: "APIs REST", en: "REST APIs" },
    description: {
      pt: "Criação e consumo de APIs organizadas.",
      en: "Building and consuming well-structured APIs.",
    },
    category: "Back-end",
  },
  {
    name: { pt: "Regras de negócio", en: "Business Rules" },
    description: { pt: "Lógica clara no servidor.", en: "Clear logic on the server side." },
    category: "Back-end",
  },
  {
    name: { pt: "Banco de dados", en: "Databases" },
    description: { pt: "Criação e manipulação de dados.", en: "Creating and manipulating data." },
    category: "Back-end",
  },
  {
    name: { pt: "Validação de dados", en: "Data Validation" },
    description: { pt: "Evita dados incorretos.", en: "Prevents incorrect data." },
    category: "Back-end",
  },
  {
    name: { pt: "Segurança básica", en: "Basic Security" },
    description: { pt: "Proteção contra acessos indevidos.", en: "Protection against unauthorized access." },
    category: "Back-end",
  },
  {
    name: { pt: "Clean Code", en: "Clean Code" },
    description: { pt: "Código fácil de ler e manter.", en: "Code that is easy to read and maintain." },
    category: "Code and Quality",
  },
  {
    name: { pt: "Padronização", en: "Standardization" },
    description: { pt: "Mesmo estilo em todo projeto.", en: "A consistent style across the project." },
    category: "Code and Quality",
  },
  {
    name: { pt: "Organização de pastas", en: "Folder Organization" },
    description: { pt: "Estrutura clara.", en: "A clear and predictable structure." },
    category: "Code and Quality",
  },
  {
    name: { pt: "Refatoração", en: "Refactoring" },
    description: { pt: "Melhoria contínua do código.", en: "Continuous improvement of the codebase." },
    category: "Code and Quality",
  },
  {
    name: { pt: "Git", en: "Git" },
    description: { pt: "Controle de versões.", en: "Version control." },
    category: "Tools and Process",
  },
  {
    name: { pt: "GitHub", en: "GitHub" },
    description: { pt: "Trabalho em equipe.", en: "Team collaboration." },
    category: "Tools and Process",
  },
  {
    name: { pt: "Postman", en: "Postman" },
    description: { pt: "Testes de APIs.", en: "API testing." },
    category: "Tools and Process",
  },
  {
    name: { pt: "Swagger", en: "Swagger" },
    description: { pt: "Documentação de APIs.", en: "API documentation." },
    category: "Tools and Process",
  },
  {
    name: { pt: "Notion", en: "Notion" },
    description: { pt: "Organização de tarefas.", en: "Task organization." },
    category: "Tools and Process",
  },
]

const stackCategoryKeys: CategoryKey[] = [
  "Front-end",
  "Back-end",
  "APIs and Integrations",
  "Versioning and Collaboration",
  "Others",
]

const competencyCategoryKeys: CategoryKey[] = [
  "Front-end",
  "Back-end",
  "Code and Quality",
  "Tools and Process",
]

const getIcon = (iconType: string) => {
  const IconComponent =
    (Icons as Record<string, unknown>)[iconType] ||
    (TablerIcons as Record<string, unknown>)[iconType] ||
    (FontAwesomeIcons as Record<string, unknown>)[iconType]

  return (IconComponent as React.ComponentType<{ className?: string }>) || FontAwesomeIcons.FaCode
}

function localizeCategory(category: CategoryKey, language: Language) {
  return categoryLabels[category]?.[language] ?? category
}

export default function HelmetHall() {
  const [view, setView] = useState<ViewType>("stack")
  const { language } = useLanguage()

  const groupedStack = stackCategoryKeys.map((category) => ({
    category,
    items: technologiesData.technologies.filter((tech) => tech.category === category),
  }))

  const groupedCompetencies = competencyCategoryKeys.map((category) => ({
    category,
    items: competencies.filter((item) => item.category === category),
  }))

  const sectionTitle =
    language === "en"
      ? { line1: "Technologies and", line2: "Competencies" }
      : { line1: "Tecnologias e", line2: "Competências" }

  const introText =
    language === "en"
      ? "I use modern tools and best practices to build applications that are organized, functional, and easy to maintain."
      : "Utilizo ferramentas modernas e boas práticas para desenvolver aplicações organizadas, funcionais e de fácil manutenção."

  const competenciesLabel = language === "en" ? "Competencies" : "Competências"

  const stackDescription =
    language === "en"
      ? "Tools, languages, and technologies I use in development."
      : "Ferramentas, linguagens e tecnologias que utilizo no desenvolvimento."

  const competenciesDescription =
    language === "en"
      ? "Practices and knowledge I apply to ensure quality, organization, and a great user experience."
      : "Práticas e conhecimentos que aplico para garantir qualidade, organização e boa experiência do usuário."

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
            <span className="text-white">{sectionTitle.line1}</span>
            <br />
            <span className="text-lorenzo-accent font-brier text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
              {sectionTitle.line2}
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mt-6 max-w-3xl mx-auto text-center">{introText}</p>
        </motion.div>

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
            {competenciesLabel}
          </motion.button>
        </div>

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
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">{stackDescription}</p>
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
              <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto">{competenciesDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>

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
                    {localizeCategory(group.category as CategoryKey, language)}
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
                          transition={{ duration: 0.5, delay: groupIndex * 0.05 + index * 0.03 }}
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
                    {localizeCategory(group.category as CategoryKey, language)}
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                    {group.items.map((item, index) => (
                      <motion.div
                        key={item.name.en}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: groupIndex * 0.05 + index * 0.03 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="group relative cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border-2 border-gray-800 group-hover:border-lorenzo-accent group-hover:shadow-xl group-hover:shadow-lorenzo-accent/20 transition-all duration-300 p-3 md:p-4">
                          <h4 className="text-sm md:text-base font-bold text-white mb-1 group-hover:text-lorenzo-accent transition-colors duration-300">
                            {item.name[language]}
                          </h4>
                          <p className="text-xs md:text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                            {item.description[language]}
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

