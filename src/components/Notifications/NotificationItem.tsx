import { FC } from 'react'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
}

interface NotificationItemProps {
  notification: Notification
}

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  return (
    <div className="flex items-start space-x-4">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"/>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"/>
      </span>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">{notification.time}</p>
      </div>
    </div>
  )
}

export default NotificationItem

