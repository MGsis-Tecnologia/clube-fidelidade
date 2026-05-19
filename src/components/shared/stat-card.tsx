"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { percent } from "@/lib/formatters";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: LucideIcon;
  accent?: "emerald" | "amber" | "slate" | "rose";
  className?: string;
}

const accentClasses: Record<NonNullable<StatCardProps["accent"]>, string> = {
  emerald:
    "before:from-emerald/15 before:via-emerald/5 after:bg-emerald/30",
  amber: "before:from-amber/15 before:via-amber/5 after:bg-amber/30",
  slate:
    "before:from-foreground/10 before:via-foreground/5 after:bg-foreground/30",
  rose: "before:from-rose-500/15 before:via-rose-500/5 after:bg-rose-500/30",
};

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  accent = "emerald",
  className,
}: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        "surface group relative isolate overflow-hidden rounded-xl p-5",
        "before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:to-transparent",
        "after:absolute after:top-0 after:right-6 after:h-px after:w-12",
        accentClasses[accent],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </p>
          <p className="display-num text-3xl font-medium text-foreground sm:text-[2rem]">
            {value}
          </p>
        </div>
        {Icon ? (
          <span
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-emerald-muted group-hover:text-emerald",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        {typeof delta === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              positive
                ? "bg-emerald-muted text-emerald"
                : "bg-rose-500/10 text-rose-500",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {percent(delta)}
          </span>
        ) : (
          <span />
        )}
        {hint ? <span className="text-muted-foreground">{hint}</span> : null}
      </div>
    </div>
  );
}
