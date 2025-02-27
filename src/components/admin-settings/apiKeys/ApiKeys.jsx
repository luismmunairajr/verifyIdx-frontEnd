import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import cubeicon from "@/assets/cubeicon.svg"
import Image from "next/image";
import CreateKey from "@/components/admin-settings/apiKeys/CreateKey"
export default function ApiKeys() {
    return(
        <div className="p-6 space-y-6 dark:bg-zinc-900 w-full 2xl:w-[1280px]">
            <div className="border flex rounded-xl p-4">
                <div className="flex space-x-4 p-2">
                    <Image src={cubeicon} alt=""/>
                    <div className="text-sm w-20">
                        <h4>Verify IDX</h4>
                        <p>Staging</p>
                    </div>
                    <div className="border-l border-gray-400 h-full"/>
                    <div>
                        <h4 className="font-semibold text-sm">Client ID</h4>
                        <div className="p-1 bg-zinc-200 rounded">
                            <p className="text-xs text-zinc-500">client_01HYD87QD1Q6S0V4D8P49G4...</p>
                        </div>
                    </div>
                    <div className="border-l border-gray-400 h-full"/>
                    <p className="text-sm">Staging is a fully-featured environment used for developing and testing your application. Use the <span className="text-blue-800 underline">Production environment</span> for your live application.</p>
                </div>
            </div>
            <div className="flex items-center justify-between px-2">
                <h3 className="font-semibold">Active</h3>
                <CreateKey/>               
            </div>
            <Table>
                <TableHeader className="bg-zinc-100 text-black">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Secret Key</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Expiration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Secret Key</TableCell>
                        <TableCell>************************</TableCell>
                        <TableCell>2025-02-10</TableCell>
                        <TableCell>2026-02-10</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
