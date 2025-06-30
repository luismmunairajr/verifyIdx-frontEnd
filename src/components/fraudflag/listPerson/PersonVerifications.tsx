import Image from "next/image"

interface PersonProps{
    name: string
    status: string
    image: string
    onclick: React.MouseEventHandler<HTMLDivElement>
}

export default function PersonVerifications({name,status, image, onclick}: PersonProps) {
    return(
        <div className="bg-white flex items-start justify-start rounded-lg space-x-2 w-full p-1 hover:bg-blue-300 ease-in-out duration-200 dark:bg-zinc-950 dark:hover:bg-zinc-800" onClick={onclick}>
            <Image src={image} alt={name} className="size-16 rounded-full"/>
            <div className="flex flex-col items-start">
                <p className="font-medium">{name}</p>
            </div>
        </div>
    )
}

