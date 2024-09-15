"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", profit: 186 },
  { month: "February", profit: 305 },
  { month: "March", profit: 237 },
  { month: "April", profit: 73 },
  { month: "May", profit: 209 },
  { month: "June", profit: 214 },
];

const chartConfig = {
  profit: {
    label: "profit",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

const ProfitChartCard = () => {
  return (
    <Card className="mb-4 border-[--line-color] shadow-sm hover:shadow-md duration-150 transition-shadow">
      <CardHeader>
        <CardTitle className="text-[--sub-title]">Profit Analysis</CardTitle>
        <CardDescription className="text-[--p-color]">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="profit"
              type="natural"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-profit)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-[--sub-title]">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfitChartCard;
