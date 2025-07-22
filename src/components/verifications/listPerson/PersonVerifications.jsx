import Image from "next/image";

export default function PersonVerifications({ name, status, image, onclick }) {
  return (
    <div
      className="bg-white flex items-start justify-start rounded-lg space-x-2 w-full p-1 hover:bg-blue-300 ease-in-out duration-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 cursor-pointer"
      onClick={onclick}
    >
      <Image
        src={image}
        alt={name}
        width={64}
        height={64}
        className="size-16 rounded-full object-cover aspect-square"
      />
      <div className="flex flex-col items-start">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{status}</p>
      </div>
    </div>
  );
}
