"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { currency } from "@/lib/formatters";
import type { PurchaseSeriesPoint } from "@/types";

interface Props {
  data: PurchaseSeriesPoint[];
}

export function PurchaseChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="g-sales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.45} />
            <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="g-rewards" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 6"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => v.slice(8, 10) + "/" + v.slice(5, 7)}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={50}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString()
          }
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <Tooltip
          cursor={{ stroke: "hsl(var(--border))", strokeDasharray: 4 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const date = new Date(label);
            return (
              <div className="rounded-lg border border-border bg-popover/95 p-3 text-xs shadow-xl backdrop-blur">
                <p className="font-medium text-foreground">
                  {date.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
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
                      {p.dataKey === "total" ? "Vendas" : "Recompensas"}:
                    </span>
                    <span className="ml-auto font-medium text-foreground">
                      {currency(p.value as number)}
                    </span>
                  </div>
                ))}
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fill="url(#g-sales)"
        />
        <Area
          type="monotone"
          dataKey="rewards"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          fill="url(#g-rewards)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
