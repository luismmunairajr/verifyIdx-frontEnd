"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import en from "@/translations/en"
import pt from "@/translations/pt"


type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations are now imported from separate files
const translations: Record<Language, Record<string, string>> = {
  en,
  pt
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage whenever it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function with fallback
  const t = (key: string): string => {
    if (!key) return ""

    // Check if the key exists in the current language
    if (translations[language] && translations[language][key]) {
      return translations[language][key]
    }

    // Fallback to English if the key doesn't exist in the current language
    if (language !== "en" && translations["en"] && translations["en"][key]) {
      return translations["en"][key]
    }

    // Return the key itself as a last resort
    return key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

