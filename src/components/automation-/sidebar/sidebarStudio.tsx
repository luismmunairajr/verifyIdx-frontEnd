import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SidebarStudio() {
    return (
        <div className="bg-white shadow">
            <Tabs defaultValue="actions" className="w-[400px]">
                <TabsList className="w-full bg-transparent">
                    <TabsTrigger value="actions" className="w-full">Actions</TabsTrigger>
                    <TabsTrigger value="settings" className="w-full">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="actions">Actions</TabsContent>
                <TabsContent value="settings">Settings</TabsContent>
            </Tabs>
        </div>
    )
}