import { CustomerTable } from "./CustomerTable"
import { useLanguage } from "@/components/language/language-provider"

export default function GeneralSettings() {

  const { t } = useLanguage()
  return (
    <div className="container mx-auto py-10 2xl:w-[1000px]">
      <h1 className="text-3xl font-bold mb-6">{t("allUsers")}</h1>
      <CustomerTable />
    </div>
  )
}

