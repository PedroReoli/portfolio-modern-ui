"use client"

import { useLanguage } from "@/components/language-provider"

type Language = "pt" | "en"

type MissionText = {
  redefining: string
  limits: string
  creating: string
  solutions: string
  transformingIdeas: string
  into: string
  realExperiences: string
}

function getMissionText(language: Language): MissionText {
  if (language === "en") {
    return {
      redefining: "REDEFINING",
      limits: "LIMITS",
      creating: "CREATING",
      solutions: "SOLUTIONS",
      transformingIdeas: "TRANSFORMING IDEAS",
      into: "INTO",
      realExperiences: "REAL EXPERIENCES",
    }
  }

  return {
    redefining: "REDEFININDO",
    limits: "LIMITES",
    creating: "CRIANDO",
    solutions: "SOLUÇÕES",
    transformingIdeas: "TRANSFORMANDO IDEIAS",
    into: "EM",
    realExperiences: "EXPERIÊNCIAS REAIS",
  }
}

export default function MissionSection() {
  const { language } = useLanguage()
  const missionText = getMissionText(language)

  return (
    <section
      id="mission"
      className="relative min-h-[70vh] md:min-h-screen bg-lorenzo-dark text-lorenzo-text-light py-12 md:py-24 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="relative h-20 md:h-32 flex items-center justify-center mt-8 md:mt-16">
          <img src="/images/icon/ico-helmet-w.png" className="h-full w-auto max-h-[40px] md:max-h-[60px] object-contain" />
        </div>

        <div className="text-center px-1 sm:px-2">
          <h2 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-balance leading-[1.2] md:leading-[1.15]">
            <span className="text-lorenzo-accent font-brier leading-[1.2] md:leading-[1.15] text-2xl sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl">
              {missionText.redefining}
            </span>{" "}
            {missionText.limits},
            <br />
            {missionText.creating}{" "}
            <span className="text-lorenzo-accent font-brier leading-[1.2] md:leading-[1.15] text-2xl sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl">
              {missionText.solutions}
            </span>
            ,
            <br />
            <span className="text-lg sm:text-xl md:text-5xl lg:text-6xl xl:text-7xl">{missionText.transformingIdeas}</span>
            <br />
            {missionText.into}{" "}
            <span className="text-lorenzo-accent font-brier leading-[1.2] md:leading-[1.15] text-2xl sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl">
              {missionText.realExperiences}
            </span>
            .
          </h2>
        </div>
      </div>
    </section>
  )
}
