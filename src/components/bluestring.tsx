import bluestringlogo from "../../public/bluestringLogo.svg"
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function Bluestring() {
    return (
        <div className="flex flex-col items-center justify-center w-full text-xs">
            <Image src={bluestringlogo} alt="logo" />
            <div className="w-2/4 text-center">
                <Label>Verify IDX™ and all trademarks are part of Bluestring Consulting Limitada. All content are reserved to the terms of usage of our services and Legal Entity registration of our Company.</Label>
            </div>
            <Link href={"https://www.bluestringco.co"} className="text-blue-500 text-sm" target="_blank">Bluestring Consulting Limitada @ 2024.</Link>
        </div>
    )
}