import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/components/language/language-provider";


function SelectGender({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-2 border rounded"
    >
      <option value="male">{value === "male" ? "Male" : "Male"}</option>
      <option value="female">{value === "female" ? "Female" : "Female"}</option>
      <option value="other">{value === "other" ? "Other" : "Other"}</option>
    </select>
  );
}

export default function HomeComponent() {
  const { data: session } = useSession();
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(session?.user?.image || "");


  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("country", country);
    formData.append("gender", gender);
    formData.append("city", city);
    formData.append("phone", phone);
    formData.append("timezone", timezone);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(t("profileUpdateSuccess"));
        setIsEditing(false);
      } else {
        alert(t("profileUpdateError") + ": " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert(t("networkError"));
    }
  };

  return (
    <div className="p-6 space-y-5 dark:zinc-900 w-full 2xl:w-[1000px]">
      <div className="flex justify-between">
        <div className="flex space-x-4 relative">
          <Avatar className="md:size-12 size-6 relative">
            <AvatarImage src={avatarPreview} />
            <AvatarFallback>{t("initialsFallback")}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
              <Camera size={16} />
              <input
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </label>
          )}
          <div>
            <h2 className="font-bold">{session?.user?.name ?? t("loading")}</h2>
            <p className="text-xs text-zinc-500">{session?.user?.email ?? t("loading")}</p>
          </div>
        </div>
        <Button
          className="w-28 h-8"
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? t("save") : t("edit")}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="w-full">
          <Label>{t("fullName")}</Label>
          <Input
            type="text"
            placeholder={t("yourFullName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full">
          <Label>{t("country")}</Label>
          <Input
            type="text"
            placeholder={t("yourCountry")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full">
          <Label>{t("gender")}</Label>
          <SelectGender
            value={gender}
            onChange={setGender}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full">
          <Label>{t("city")}</Label>
          <Input
            type="text"
            placeholder={t("yourCity")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full">
          <Label>{t("phoneNumber")}</Label>
          <Input
            type="tel"
            placeholder={t("yourPhoneNumber")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="w-full">
          <Label>{t("timeZone")}</Label>
          <Input
            type="text"
            placeholder={t("yourTimeZone")}
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
