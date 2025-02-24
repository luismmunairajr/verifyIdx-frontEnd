import Image from "next/image"
import { Calendar, Hash } from "lucide-react"
import Badges from "./Badges"
import Pictures from "./Pictures.jsx"
import unknow from "../../../../public/unknowProfile.svg"

export default function Resume({ person }) {
    return (
        <div className="flex flex-col space-y-10 dark:text-white">
            <div className="flex space-x-10 w-full">
                <Image src={person.auditTrailImage? `data:image/png;base64,${person.auditTrailImage}` : unknow}  alt="" width={100} height={100} className="size-40 aspect-square rounded-full" />
                <div className="space-y-4 flex flex-col items-start justify-center w-full">
                    <h2 className="font-semibold text-lg">{person.fullName}</h2>
                    <div className="flex space-x-4">
                        <Calendar strokeWidth={1} />
                        <p>{person.startedAt}</p>
                    </div>
                    <div className="flex space-x-4">
                        <Hash strokeWidth={1} />
                        <p>{person.idNumber}</p>
                    </div>
                </div>
            </div>
            <Badges person={person} />
            <Pictures person={person} />
        </div>
    )
}