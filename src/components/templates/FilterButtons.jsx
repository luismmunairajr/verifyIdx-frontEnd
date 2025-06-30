import { Button } from "@/components/ui/button"

export default function FilterButtons() {
    return (
        <div className="w-full flex justify-center flex-wrap gap-2">
            <Button variant={"ghost"}>My Templates</Button>
            <Button variant={"ghost"}>Artificial Inteligence</Button>
            <Button variant={"ghost"}>Digital Signature</Button>
            <Button variant={"ghost"}>Identity Verification</Button>
            <Button variant={"ghost"}>Watchlist</Button>
            <Button variant={"ghost"}>Support</Button>
            <Button variant={"ghost"}>Automation</Button>
            <Button variant={"ghost"}>Security</Button>
        </div>
    )
}