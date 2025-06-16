"use client"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language/language-provider"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    {
      code: "en",
      name: "English"
    },
    {
      code: "pt",
      name: "Português"
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 dark:bg-zinc-800 dark:focus:ring-gray-200 dark:focus:ring-1">
            <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-gray-200"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as "en" | "pt")}
            className="flex items-center gap-2"
          >
            <span>{lang.name}</span>
            {lang.code === language && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

