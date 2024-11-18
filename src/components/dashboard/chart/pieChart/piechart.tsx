"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { verification: "Identity Check", verifications: 320, fill: "#0ea5e9" },  
  { verification: "Address Check", verifications: 210, fill: "#0369a1" },  
  { verification: "Sanction Screening", verifications: 150, fill: "#14b8a6" }, 
  { verification: "Criminal Record", verifications: 180, fill: "#3b82f6" }, 
  { verification: "Other", verifications: 100, fill: "#2563eb" },   
]

const chartConfig = {
  verifications: {
    label: "Verifications",
  },
  identityCheck: {
    label: "Identity Check",
    color: "#4285F4",
  },
  addressCheck: {
    label: "Address Check",
    color: "#FF9500",
  },
  sanctionScreening: {
    label: "Sanction Screening",
    color: "#FF7139",
  },
  criminalRecord: {
    label: "Criminal Record",
    color: "#0078D7",
  },
  other: {
    label: "Other",
    color: "#6B7280",
  },
} satisfies ChartConfig

export function Component() {
  const totalVerifications = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.verifications, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Types of Verifications</CardTitle>
        <CardDescription>January 2024 - Now</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="verifications"
              nameKey="verification"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVerifications.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Verifications
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total verifications for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
