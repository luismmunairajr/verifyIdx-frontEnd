'use client'

import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import NotificationsPanel from './NotificationsPanel'
import { Notification } from './NotificationItem'

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Verification is completed',
    message: "Check all the results",
    time: '2 minutes ago'
  },
  {
    id: '2',
    title: 'Project update',
    message: 'The project "Acme" has been updated.',
    time: '1 hour ago'
  },
  {
    id: '3',
    title: 'New Fraud Detected',
    message: 'Bob is detected in fradu.',
    time: '3 hours ago'
  }
]

export default function NotificationsButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={"rounded-full bg-zinc-200 dark:bg-zinc-800"}>
          <Bell className="h-[1.2rem] w-[1.2rem]"/>
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" >
        <NotificationsPanel notifications={mockNotifications} />
      </PopoverContent>
    </Popover>
  )
}

