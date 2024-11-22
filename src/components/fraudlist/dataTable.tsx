import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { profiles } from "./profile"
import Image from "next/image"

interface Profile {
    name: string
    image: string
    details: {
        address: string;
        dateOfBirth: string;
        sex: string;
    }
}

interface DataTableProps {
    profiles: Profile[];
}

export default function DataTable({ profiles }: DataTableProps) {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Date Of Birth</TableHead>
                        <TableHead>Sex</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {profiles.map((profile, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Image src={profile.image} alt="foto" />
                            </TableCell>
                            <TableCell>{profile.name}</TableCell>
                            <TableCell>{profile.details.address}</TableCell>
                            <TableCell>{profile.details.dateOfBirth}</TableCell>
                            <TableCell>{profile.details.sex}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {profiles.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No profiles found.</p>
            )}
        </div>
    )
}