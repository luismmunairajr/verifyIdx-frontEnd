import Image from "next/image"
import person1 from "../example/images/person1.svg"
import { Calendar, Hash } from "lucide-react"
import Badges from "./Badges"
import Pictures from "./Pictures"
import { Person } from "../type"
import { Button } from "@/components/ui/button"

interface ResumeProps{
    person: Person
}


export default function Resume({person}: ResumeProps) {
    return (
        <div className="flex flex-col space-y-10 dark:text-white">
            <div className="flex space-x-10 w-full">
                <Image src={person.image} alt="avatar" className="size-40" />
                <div className="space-y-4 flex flex-col items-start justify-center w-full">
                    <h2 className="font-semibold text-lg">{person.name}</h2>
                    <div className="flex space-x-4">
                        <Calendar strokeWidth={1} />
                        <p>05/05/2024</p>
                    </div>
                    <div className="flex space-x-4">
                        <Hash strokeWidth={1} />
                        <p>AA5227058 </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-10">
                    <Button variant={"destructive"} className="w-44 hover:bg-transparent hover:border hover:border-red-500 hover:text-red-500">Not Confirm Fraudflag</Button>
                    <Button className="w-44 hover:bg-transparent hover:border hover:border-blue-500 hover:text-blue-500 dark:bg-blue-800 dark:hover:bg-transparent dark:hover:text-blue-500 dark:text-white">Confirm Fraudflag</Button>
                </div>
            <Badges />
            <Pictures />
        </div>
    )
}