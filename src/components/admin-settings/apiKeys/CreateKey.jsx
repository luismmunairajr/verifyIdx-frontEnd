"use client";
import { Clipboard } from "flowbite-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function CreateKey() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Create Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-white">Create key</DialogTitle>
          <DialogDescription className="text-white">
            Anyone who has this key will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-[23rem] grid-cols-8 gap-2 pt-10">
          <label htmlFor="npm-install" className="sr-only">
            Label
          </label>
          <input
            id="npm-install"
            type="text"
            className="col-span-6 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-black  dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value="client_01HYD87QD1Q6S0V4D8P49G4"
            disabled
            readOnly
          />
          <Clipboard valueToCopy="npm install flowbite-react" className="bg-black text-black h-full w-32"  label="Copy" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
