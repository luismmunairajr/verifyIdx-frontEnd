import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Sidebar from "./Sidebar"
import ButtonAddWorkflow from "@/components/automation-studio/ButtonAddWorkflow"
import { Button } from "@/components/ui/button"

export function TabSidebar() {
  return (
    <Tabs defaultValue="actions" className="h-full w-2/5 space-y-2 p-2">
      <div className='flex gap-2 w-full'>
        <ButtonAddWorkflow/>
        <Button>Publish</Button>
      </div>
      <TabsList className="dark:bg-zinc-950 bg-white">
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="actions">
        <Sidebar/>
      </TabsContent>
      <TabsContent value="settings">
        <h1>Settings</h1>
      </TabsContent>
    </Tabs>
  )
}
