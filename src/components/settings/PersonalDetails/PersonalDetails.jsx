import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectGender } from "@/components/settings/PersonalDetails/SelectGender";
import { Mail, Camera } from "lucide-react";

export default function HomeComponent() {
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png");

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    return (
        <div className="p-6 space-y-5 dark:zinc-900 w-full 2xl:w-[1280px]">
            <div className="flex justify-between">
                <div className="flex space-x-4 relative">
                    <Avatar className="md:size-12 size-6 relative">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
                            <Camera size={16} />
                            <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                        </label>
                    )}
                    <div>
                        <h2 className="font-bold">Samuel Nhantumbo</h2>
                        <p className="text-xs text-zinc-500">samuelnha@gmail.com</p>
                    </div>
                </div>
                <Button className="w-28 h-8" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Save" : "Edit"}
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full">
                <div className="w-full">
                    <Label>Full Name</Label>
                    <Input type="text" placeholder="Your Full Name" defaultValue="Samuel Nhantumbo" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>Country</Label>
                    <Input type="text" placeholder="Your Country" defaultValue="Mozambique" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>Gender</Label>
                    <SelectGender disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>City</Label>
                    <Input type="text" placeholder="Your City" defaultValue="Maputo" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>Phone Number</Label>
                    <Input type="number" placeholder="Your Phone Number" defaultValue="+258841234567" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>Time Zone</Label>
                    <Input type="text" placeholder="Your Time Zone" defaultValue="GMT+2" disabled={!isEditing} />
                </div>
            </div>
        </div>
    );
}
