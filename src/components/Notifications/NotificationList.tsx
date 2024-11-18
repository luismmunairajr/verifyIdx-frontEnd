import { X } from "lucide-react";

interface NotificationListProps {
    notifications: Notification[];
    removeNotification: (id: number) => void;
}
interface Notification {
    id: number;
    title: string;
    description: string;
    status: "pending" | "approved" | "error";
}

function NotificationList({ notifications, removeNotification }: NotificationListProps) {
    return (
        <div className="mt-4 space-y-4">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="p-4 bg-zinc-100 rounded-md dark:bg-zinc-900 flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">
                                {notification.title}
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                {notification.description}
                            </p>
                            <span
                                className={`text-xs mt-1 inline-block rounded-full px-2 py-1 ${notification.status === "approved"
                                        ? "bg-green-200 text-green-800"
                                        : notification.status === "pending"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : "bg-red-200 text-red-800"
                                    }`}>
                                {notification.status}
                            </span>
                        </div>
                        <button onClick={() => removeNotification(notification.id)}>
                            <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-red-600" />
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-zinc-500 dark:text-zinc-400">
                    No notifications available
                </p>
            )}
        </div>
    );
}

export default NotificationList;
