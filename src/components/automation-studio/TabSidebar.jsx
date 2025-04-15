import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import SettingsBar from "./SettingsBar.jsx";
import { useLanguage } from "@/components/language/language-provider";

export function TabSidebar({ nodes, edges }) {
  const { t } = useLanguage()
  return (
    <Tabs defaultValue="actions" className="h-full w-[500px] overflow-y-auto space-y-2 p-2">
      
      <TabsList className="dark:bg-zinc-950 bg-white">
        <TabsTrigger value="actions">{t("actions")}</TabsTrigger>
        <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
      </TabsList>
      <TabsContent value="actions">
        <Sidebar />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsBar />
      </TabsContent>
    </Tabs>
  );
}
