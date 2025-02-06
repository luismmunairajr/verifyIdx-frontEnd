import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export default function SanctionScreening({ person }) {

    const getStatusIcon = (condition) => (
        <div
            className={`text-xs rounded-full px-2 text-white flex items-center justify-center ${condition ? "bg-green-500" : "bg-red-500"}`}>
            {condition ? <Check size={15} /> : <X size={15} />}
        </div>
    );

    return (
        <div className="p-10 w-full grid grid-cols-3">
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Status"}</Label>
                    <p className="dark:text-white">{person.watchlistStatus}</p>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Match Score"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchScore}</p>
                        <div className="text-xs rounded-full px-2 bg-blue-500 text-white flex items-center justify-center ">
                            <p>{person.matchStrength}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"categories"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.categories}</p>
                        {getStatusIcon(person.personStatus ==="ACTIVE")}
                    </div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Full Name"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.primaryName}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Date of Birth"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedDateOfBirth}</p>
                        {getStatusIcon(person.DateOfBirthResult ==="MATCHED")}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Gender"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedGender}</p>
                        {getStatusIcon(person.GenderResult ==="MATCHED")}
                    </div>
                </div>

            </div>
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Location"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedLocation}</p>
                        {getStatusIcon(person.LocationResult ==="MATCHED")}
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Nacionality"}</Label>
                    <div className="flex gap-2 items-center">
                        <p className="dark:text-white">{person.matchedNacionality}</p>
                        {getStatusIcon(person.NacionalityResult ==="MATCHED")}
                    </div>
                </div>
                <div className="space-y-1">
                    <Label className="uppercase text-zinc-600 text-xs">{"Category"}</Label>
                    <p className="dark:text-white">{person.category}</p>
                </div>
            </div>
        </div>
    )
}