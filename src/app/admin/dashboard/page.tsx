"use client";

import { 
  Users, 
  Map, 
  UserCheck, 
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from "recharts";

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    icon: Users,
    description: "+12.5% from last month",
    trend: "up",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Total Trips",
    value: "1,205",
    icon: Map,
    description: "+18.2% from last month",
    trend: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Active Users",
    value: "573",
    icon: UserCheck,
    description: "-4.1% from last month",
    trend: "down",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Public Trips",
    value: "892",
    icon: Globe,
    description: "+22.4% from last month",
    trend: "up",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const tripData = [
  { name: "Jan", trips: 65 },
  { name: "Feb", trips: 88 },
  { name: "Mar", trips: 120 },
  { name: "Apr", trips: 110 },
  { name: "May", trips: 160 },
  { name: "Jun", trips: 190 },
  { name: "Jul", trips: 240 },
];

const cityData = [
  { city: "Paris", count: 450 },
  { city: "Tokyo", count: 380 },
  { city: "New York", count: 320 },
  { city: "London", count: 290 },
  { city: "Bali", count: 250 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, admin. Here's what's happening with Traveloop today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive mr-1" />
                )}
                <p className={`text-xs ${stat.trend === "up" ? "text-emerald-500" : "text-destructive"}`}>
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Trips Overview</CardTitle>
            <CardDescription>Monthly trip creation trends for the current year.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tripData}>
                <defs>
                  <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  itemStyle={{ color: "hsl(var(--primary))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="trips" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTrips)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Top Destinations</CardTitle>
            <CardDescription>Most popular cities planned by users.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="city" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
