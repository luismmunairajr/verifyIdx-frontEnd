import Image from "next/image"
import singlesignon from "../../../../public/singlesignon.svg"
import google from "../../../../public/google.svg"
import { Button } from "@/components/ui/button"
import { TriangleAlert, Check } from "lucide-react"

export default function Authentication() {
    return (
        <div className="px-6 space-y-6 dark:bg-zinc-900">
            <h3 className="text-xl font-semibold">Methods</h3>
            <div className="border flex rounded-xl p-4 items-start justify-between">
                <div className="flex items-start gap-4">
                    <Image src={singlesignon} alt="" />
                    <div className="space-y-4">
                        <h1 className="font-semibold">Single Sign-On</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">Allow users to sign in with SAML and OIDC identity providers like Entra ID, Okta, and Google Workspace</p>
                        <Button variant={"secondary"}>Disable Single Sign-On</Button>
                    </div>
                </div>
                <p className="flex text-yellow-500 gap-2"><TriangleAlert /> Redirect URI required</p>
            </div>
            <div className="border flex rounded-xl p-4 items-start justify-between">
                <div className="flex items-start gap-4">
                    <Image src={google} alt="" className="size-14" />
                    <div className="space-y-2">
                        <h1 className="font-semibold">Google OAuth</h1>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">Allow users to sign in with a Google account using the OAuth protocol</p>
                        <div className="flex justify-between items-center w-96">
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Google Client ID</p>
                            <div className="flex gap-2 ">
                                <p className="font-semibold text-xl">.........................</p>
                                <div className="bg-yellow-300 p-1 rounded-xl">
                                    <p className="text-yellow-600 text-sm">Demo value</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center w-96">
                            <p className="text-zinc-500 text-sm dark:text-zinc-300">Google Client Secret</p>
                            <div className="flex gap-2 ">
                                <p className="font-semibold text-xl">.........................</p>
                                <div className="bg-yellow-300 p-1 rounded-xl">
                                    <p className="text-yellow-600 text-sm">Demo value</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="flex text-green-500 gap-2"><Check /> Enabled</p>
            </div>
        </div>
    )
}