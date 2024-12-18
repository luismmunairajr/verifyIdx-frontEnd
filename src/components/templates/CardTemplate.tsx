'use client'
import { Card } from "@/components/ui/card"
import { ScanEye, Fingerprint, Sparkles, List, Bot } from 'lucide-react';
import { useRouter } from "next/navigation";

interface CardTemplateProps {
    id:string
    name:string
    description:string
}

export default function CardTemplate({id,name,description}:CardTemplateProps) {
    const router = useRouter()
    const handleClick = () => {
        router.push(`/workflow/${id}`)
    }
    
    return (
        <Card className="p-5 rounded-xl h-60 space-y-5 hover:border-blue-500 ease-in-out transition duration-300 hover:cursor-pointer"
        onClick={handleClick}>
            <div className="flex space-x-2">
                <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
                    <ScanEye/>
                </div>
                <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
                    <Fingerprint/>
                </div>
                <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
                    <Sparkles/>
                </div>
                <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
                    <List/>
                </div>
                <div className="rounded-full p-2 bg-zinc-100 dark:bg-zinc-900">
                    <Bot/>
                </div>
            </div>
            <h2 className="font-semibold">{name}</h2>
            <p className="text-zinc-900 dark:text-zinc-100">{description}</p>
        </Card>
    )
}