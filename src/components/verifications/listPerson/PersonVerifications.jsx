import Image from "next/image"


export default function PersonVerifications({ name, status, image, onclick }) {
  return (
    <div className="bg-white flex items-start justify-start rounded-lg space-x-2 w-full p-1 hover:bg-blue-300 ease-in-out duration-200 dark:bg-zinc-950 dark:hover:bg-zinc-800" onClick={onclick}>
      <Image src={image} alt={""} width={64} height={64} className="size-16 rounded-full" />
      <div className="flex flex-col items-start">
        <p className="text-sm">{name}</p>
        <p className="text-xs">{status}</p>
      </div>
    </div>
  )
}

function getStatusClass(status) {
  switch (status) {
    case "Approved":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    case "Pending":
      return "text-yellow-500";
    default:
      return "";
  }
}