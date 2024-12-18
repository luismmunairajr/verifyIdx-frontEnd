import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import ButtonSaveWorkflow from "@/components/automation-studio/ButtonSaveWorkflow";
import { Button } from "@/components/ui/button";
import SettingsBar from "./SettingsBar";

export function TabSidebar({ nodes, edges }) {
  return (
    <Tabs defaultValue="actions" className="h-full w-2/5 space-y-2 p-2">
      <div className="flex gap-2 w-full">
        {/* Passando nodes e edges para o ButtonSaveWorkflow */}
        <ButtonSaveWorkflow nodes={nodes} edges={edges} />
        <Button>Publish</Button>
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
