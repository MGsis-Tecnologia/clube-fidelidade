import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "surface flex flex-col items-center gap-3 rounded-xl px-6 py-14 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-muted text-emerald">
          <Icon className="h-5 w-5" />
        </span>
      ) : null}
      <h3 className="font-display text-xl font-medium tracking-tight">{title}</h3>
      {description ? (
        <p className="max-w-sm text-sm text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
