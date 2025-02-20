import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const customers = [
    { name: "John Doe", branch: "Microsoft", phone: "(123) 456-7890", email: "john@example.com", country: "USA", status: "Active" },
    { name: "Jane Smith", branch: "Yahoo", phone: "(987) 654-3210", email: "jane@example.com", country: "UK", status: "Inactive" },
    { name: "Carlos Rodríguez", branch: "Adobe", phone: "(555) 234-5678", email: "carlos@example.com", country: "Spain", status: "Active" },
    { name: "Emily Chen", branch: "Tesla", phone: "(444) 987-6543", email: "emily@example.com", country: "China", status: "Pending" },
    { name: "Christin Miliote", branch: "Google", phone: "(442) 957-6543", email: "emily@example.com", country: "USA", status: "Pending" }
];

export default function GeneralSettings() {
    return(
        <div className="p-6 space-y-6 dark:bg-zinc-900 w-full 2xl:w-[1280px]">
            <h3 className="text-xl">Personal Data</h3>
            <p>You can clear all of your data stored in the browser, including your identity and draft records. Make a backup copy of your identity key if you are choosing to do so. You will be logged out after doing this.</p>
            <Button className="bg-blue-950">Clear Data</Button>
            <h2 className="text-3xl font-semibold">All Users</h2>
            <p>Active members</p>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer Name</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer, index) => (
                        <TableRow key={index}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.branch}</TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.country}</TableCell>
                            <TableCell>{customer.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}