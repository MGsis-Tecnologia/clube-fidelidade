"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ActiveCustomersPoint } from "@/types";

interface Props {
  data: ActiveCustomersPoint[];
}

export function CustomersChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 12, bottom: 0, left: 0 }}
        barCategoryGap={20}
      >
        <CartesianGrid
          strokeDasharray="3 6"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={32}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-border bg-popover/95 p-3 text-xs shadow-xl backdrop-blur">
                <p className="font-medium text-foreground">{label}</p>
                {payload.map((p) => (
                  <div
                    key={p.dataKey as string}
                    className="mt-1 flex items-center gap-3"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: p.color as string }}
                    />
                    <span className="text-muted-foreground">
                      {p.dataKey === "ativos" ? "Ativos" : "Novos"}:
                    </span>
                    <span className="ml-auto font-medium text-foreground">
                      {p.value}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Bar
          dataKey="ativos"
          fill="hsl(var(--chart-1))"
          radius={[6, 6, 0, 0]}
          maxBarSize={28}
        />
        <Bar
          dataKey="novos"
          fill="hsl(var(--chart-2))"
          radius={[6, 6, 0, 0]}
          maxBarSize={28}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
