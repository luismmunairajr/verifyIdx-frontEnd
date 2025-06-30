import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NotificationItem, { Notification } from './NotificationItem'

interface NotificationsPanelProps {
  notifications: Notification[]
}

const NotificationsPanel: FC<NotificationsPanelProps> = ({ notifications }) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have {notifications.length} unread messages.</CardDescription>
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

