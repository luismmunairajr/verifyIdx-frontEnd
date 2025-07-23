import React, { forwardRef } from "react";
import Image from "next/image";
import unknow from "@/assets/unknowProfile.svg";

const PersonVerifications = forwardRef(({ name, status, image, onClick }, ref) => (
  <div
    ref={ref}
    className="bg-white flex items-start justify-start rounded-lg space-x-2 w-full p-1 hover:bg-blue-300 ease-in-out duration-200 dark:bg-zinc-950 dark:hover:bg-zinc-800"
    onClick={onClick}
  >
    <Image
      src={image || unknow.src}
      alt={name || ""}
      width={100}
      height={100}
      className="size-16 rounded-full object-cover aspect-square"
    />
    <div className="flex flex-col items-start">
      <p className="text-sm">{name}</p>
      <p className="text-xs">{status}</p>
    </div>
  </div>
));

export default PersonVerifications;
