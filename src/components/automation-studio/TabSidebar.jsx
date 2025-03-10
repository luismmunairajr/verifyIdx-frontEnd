import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import ButtonSaveWorkflow from "@/components/automation-studio/ButtonSaveWorkflow.jsx";
import ButtonPublishWorkflow from "@/components/automation-studio/ButtonPublishWorkflow"
import SettingsBar from "./SettingsBar.jsx";

export function TabSidebar({ nodes, edges }) {
  return (
    <Tabs defaultValue="actions" className="h-full w-[500px] overflow-y-auto space-y-2 p-2">
      
      <TabsList className="dark:bg-zinc-950 bg-white">
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
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
