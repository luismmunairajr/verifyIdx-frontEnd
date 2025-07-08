import { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import NotificationItem, { Notification } from "./NotificationItem"
import { useLanguage } from "@/components/language/language-provider"

interface NotificationsPanelProps {
  notifications: Notification[]
}

const NotificationsPanel: FC<NotificationsPanelProps> = ({ notifications }) => {
  const { t } = useLanguage()

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle>{t("notificationsTitle")}</CardTitle>
          <CardDescription>
                 {notifications.length} {t("notificationsUnreadCount")}
          </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </CardContent>
    </Card>
  )
}

export default NotificationsPanel

