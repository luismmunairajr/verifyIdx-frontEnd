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
    <Tabs defaultValue="actions" className="h-full w-2/5 space-y-2 p-2">
      <div className="flex gap-2 w-full">
        <ButtonSaveWorkflow nodes={nodes} edges={edges} />
        <ButtonPublishWorkflow nodes={nodes}/>
      </div>
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
