"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A line chart showing number of users per hour"

const chartData = [
  { hour: "00:00", users: 50 },
  { hour: "01:00", users: 30 },
  { hour: "02:00", users: 20 },
  { hour: "03:00", users: 15 },
  { hour: "04:00", users: 10 },
  { hour: "05:00", users: 5 },
  { hour: "06:00", users: 10 },
  { hour: "07:00", users: 20 },
  { hour: "08:00", users: 35 },
  { hour: "09:00", users: 50 },
  { hour: "10:00", users: 65 },
  { hour: "11:00", users: 80 },
  { hour: "12:00", users: 90 },
  { hour: "13:00", users: 85 },
  { hour: "14:00", users: 75 },
  { hour: "15:00", users: 60 },
  { hour: "16:00", users: 55 },
  { hour: "17:00", users: 60 },
  { hour: "18:00", users: 70 },
  { hour: "19:00", users: 80 },
  { hour: "20:00", users: 90 },
  { hour: "21:00", users: 95 },
  { hour: "22:00", users: 100 },
  { hour: "23:00", users: 90 }
]

const chartConfig = {
  users: {
    label: "Users",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Number of Users per Hour</CardTitle>
        <CardDescription>24-hour Period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="users"
              type="natural"
              stroke={chartConfig.users.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing number of users per hour
        </div>
      </CardFooter>
    </Card>
  )
}
