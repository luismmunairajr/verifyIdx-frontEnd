import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Person() {
    return(
        <Avatar className="md:size-12 size-6">
          <AvatarImage src="https://github.com/shadcn.png"/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}