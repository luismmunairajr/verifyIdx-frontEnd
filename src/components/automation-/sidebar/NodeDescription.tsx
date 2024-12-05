import { ReactNode } from "react"

interface NodeDescriptionProps{
    icon: ReactNode
    title: string
    description: string
}

export default function NodeDescription({icon, title, description}: NodeDescriptionProps) {
    return(
        <div className="w-full h-24 rounded-lg border shadow flex text-sm p-2 space-x-2 cursor-pointer hover:-translate-y-1 transition-transform">
                <div className="bg-blue-800 w-1/4 flex items-center justify-center text-white rounded-lg">
                    {icon}
                </div>
                <div className="w-full flex flex-col space-y-1">
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-xs text-zinc-500 text-justify">{description}</p>
                </div>
            </div>
    )
}