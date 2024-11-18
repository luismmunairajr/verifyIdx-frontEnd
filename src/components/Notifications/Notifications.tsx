import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, CheckCheck } from "lucide-react";
import { useState } from "react";
import NotificationList from "./NotificationList";

interface Notification {
    id: number;
    title: string;
    description: string;
    status: "pending" | "approved" | "error";
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, title: "New Request", description: "Check the new identity request.", status: "pending" },
        { id: 2, title: "Verification Approved", description: "The verification was successfully completed.", status: "approved" },
        { id: 3, title: "Expired Document", description: "The submitted document is expired.", status: "error" },
    ]);

    const removeNotification = (id: number) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications([]);
    };

    return (
        <Sheet>
            <SheetTrigger>
                <div className="bg-zinc-200 md:p-2 p-1 rounded-full dark:bg-zinc-800 ease-in-out transition hover:bg-zinc-4100">
                    <Bell strokeWidth={1} />
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <div>
                        <SheetTitle>Notifications</SheetTitle>
                        <SheetDescription>
                            Updates on your verification status
                        </SheetDescription>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex gap-1 items-center justify-center">
                            Mark all as read <CheckCheck size={14}/>
                        </button>
                    )}
                </SheetHeader>
                <NotificationList notifications={notifications} removeNotification={removeNotification} />
            </SheetContent>
        </Sheet>
    );
}
