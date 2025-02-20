import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Credentials() {
    const [isReset, setIsReset] = useState(false);

    return (
        <div className="p-6 dark:bg-zinc-900">
            <div className="border px-10 py-5 rounded-2xl space-y-10 w-full 2xl:w-[1280px]">
                <h2 className="text-2xl font-semibold">Reset Password</h2>
                <div className="space-y-2">
                    <Button className="bg-blue-800" onClick={() => setIsReset(!isReset)}>
                        {isReset ? "Cancel" : "Reset Password"}
                    </Button>
                    <p>We received a request to reset the password for your account.</p>
                </div>
                {isReset && (
                    <div className="space-y-4">
                        <div>
                            <Label>Old Password</Label>
                            <Input type="password" placeholder="Enter old password" />
                        </div>
                        
                        <div>
                            <Label>New Password</Label>
                            <Input type="password" placeholder="Enter new password" />
                        </div>
                        <div>
                            <Label>Confirm Password</Label>
                            <Input type="password" placeholder="Confirm new password" />
                        </div>
                        <Button className="w-full bg-blue-600">Save Password</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
