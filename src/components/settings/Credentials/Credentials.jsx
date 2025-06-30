import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLanguage } from "@/components/language/language-provider";

export default function Credentials() {
    const [isReset, setIsReset] = useState(false);
    const { t } = useLanguage()

    return (
        <div className="p-6 dark:bg-zinc-900">
            <Card className="border px-10 py-5 rounded-2xl space-y-10 w-full 2xl:w-[1000px]">
                <h2 className="text-2xl font-semibold">{t("resetPassword")}</h2>
                <div className="space-y-2">
                    <Button className="bg-blue-500 dark:bg-white hover:bg-transparent hover:text-blue-500 hover:border hover:border-blue-500" onClick={() => setIsReset(!isReset)}>
                        {isReset ? t("cancel") : t("resetPassword")}
                    </Button>
                    <p>{t("weReceived")}</p>
                </div>
                {isReset && (
                    <div className="space-y-4">
                        <div>
                            <Label>{t("oldPassword")}</Label>
                            <Input type="password" placeholder={t("enterOld")} />
                        </div>
                        
                        <div>
                            <Label>{t("newPassword")}</Label>
                            <Input type="password" placeholder={t("enterNew")} />
                        </div>
                        <div>
                            <Label>{t("confirmPassword")}</Label>
                            <Input type="password" placeholder={t("confirmPassword")} />
                        </div>
                        <Button className="bg-blue-600">{t("savePassword")}</Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
