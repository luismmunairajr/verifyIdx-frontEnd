import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CompanyInformation() {
    return (
        <div className="p-6 space-y-4 dark:zinc-900">
            <div className="border grid grid-cols-2 p-4 rounded-xl w-3/4 gap-2">
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Company Information</h4>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Legal Name</Label>
                        <Input type="text" placeholder="Legal Name" defaultValue="Bluestring Consulting Ltd" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Short Name</Label>
                        <Input type="text" placeholder="Short Name" defaultValue="Bluestring" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Tax ID</Label>
                        <Input type="text" placeholder="Tax ID" defaultValue="123456789" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Contact Details</h4>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Account Manager</Label>
                        <Input type="text" placeholder="Account Manager" defaultValue="Samuel Nhantumbo" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>General Email</Label>
                        <Input type="email" placeholder="General Email" defaultValue="contact@bluestring.com" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Phone Number</Label>
                        <Input type="number" placeholder="Phone Number" defaultValue="841234567" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold">Address Details</h4>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Country</Label>
                        <Input type="text" placeholder="Country" defaultValue="Mozambique" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>City</Label>
                        <Input type="text" placeholder="City" defaultValue="Maputo" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label>Time Zone</Label>
                        <Input type="text" placeholder="Time Zone" defaultValue="GMT+2" />
                    </div>
                </div>
                <div className="pt-10 w-full">
                    <Button>Update</Button>
                </div>
            </div>
        </div>
    )
}