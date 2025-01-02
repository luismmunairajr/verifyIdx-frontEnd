import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
    return (
        <div className="w-full min-h-screen flex flex-col px-6 space-y-4">
            <div>
                <h1 className="text-xl">User Profile</h1>
                <Label>Add or update your information</Label>
            </div>
            <div>
                <Label>Profile Picture</Label>
                <Input type="file" className="w-1/2"/>
            </div>
            <div>
                <Label>Full Name</Label>
                <Input placeholder="Name" className="w-1/2" />
            </div>
            <div>
                <Label>Email</Label>
                <Input placeholder="Email" className="w-1/2" />
            </div>
            <Button className="w-52">Save Changes</Button>
        </div>
    )
}