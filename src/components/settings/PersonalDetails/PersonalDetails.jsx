import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectGender } from "@/components/settings/PersonalDetails/SelectGender";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/components/language/language-provider";

export default function HomeComponent() {
    const { data: session } = useSession()

    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png");

    const { t } = useLanguage()
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    return (
        <div className="p-6 space-y-5 dark:zinc-900 w-full 2xl:w-[1000px]">
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
                        <h2 className="font-bold">{session?.user?.name ?? "loading..."}</h2>
                        <p className="text-xs text-zinc-500">{session?.user?.email ?? "loading..."}</p>
                    </div>
                </div>
                <Button className="w-28 h-8" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? t("save") : t("edit")}
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-5 w-full">
                <div className="w-full">
                    <Label>{t("fullName")}</Label>
                    <Input type="text" placeholder={t("yourFullName")} defaultValue={session?.user?.name ?? "loading..."} disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>{t("country")}</Label>
                    <Input type="text" placeholder={t("yourCountry")} defaultValue="Mozambique" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>{t("gender")}</Label>
                    <SelectGender disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>{t("city")}</Label>
                    <Input type="text" placeholder={t("yourCity")} defaultValue="Maputo" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>{t("phoneNumber")}</Label>
                    <Input type="number" placeholder={t("yourPhoneNumber")} defaultValue="+258841234567" disabled={!isEditing} />
                </div>
                <div className="w-full">
                    <Label>{t("timeZone")}</Label>
                    <Input type="text" placeholder={t("yourTimeZone")} defaultValue="GMT+2" disabled={!isEditing} />
                </div>
            </div>
        </div>
    );
}
