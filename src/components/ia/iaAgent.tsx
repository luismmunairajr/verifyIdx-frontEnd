import { Sparkles } from "lucide-react"


export default function IaAgent() {
    return(
        <div className="p-4 bg-zinc-200 rounded-full absolute bottom-28 right-10 hover:-translate-y-2 duration-200 transition ease-in-out">
            <Sparkles className="text-blue-800" strokeWidth={1}/>
        </div>
    )
}