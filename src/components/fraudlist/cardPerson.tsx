import Image from "next/image";

interface CardPersonProps {
    image: any
    name: string
}

export default function CardPerson({image,name}: CardPersonProps) {
    return (
        <div className="w-64 h-80 flex items-center flex-col border rounded-lg p-4 bg-zinc-200">
            <Image src={image} alt="Foto" className="size-full" />
            <h1>{name}</h1>
        </div>
    );
}
