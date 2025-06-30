import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function SettingsBar() {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Identity Verification</AccordionTrigger>
                <AccordionContent>
                    <div>
                        <div className="space-x-2 flex">
                            <span className="font-semibold">Liveness Verification</span>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
                    </div>
                    <div>
                        <div className="space-x-2 flex">
                            <span className="font-semibold">Document Verification</span>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
                    </div>
                    <div>
                        <div className="space-x-2 flex">
                            <span className="font-semibold">Face Match</span>
                            <input type="checkbox" name="" id="" />
                        </div>
                        <p className="text-xs">Confirms identity using biometric and document checks to prevent fraud.</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Digital Signature</AccordionTrigger>
                <AccordionContent>
                    ...
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Watchlist</AccordionTrigger>
                <AccordionContent>
                    ...
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Ai Assistant</AccordionTrigger>
                <AccordionContent>
                    ...
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}