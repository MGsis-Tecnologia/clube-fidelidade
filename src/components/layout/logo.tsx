import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-emerald text-emerald-foreground shadow-[0_4px_18px_-6px_hsl(var(--emerald)/0.7)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M3 12c0-4.97 4.03-9 9-9 4.97 0 9 4.03 9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M21 12c0 4.97-4.03 9-9 9-3.3 0-6.18-1.77-7.75-4.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      </span>
      {compact ? null : (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
            Clube Fidelidade
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            atelier · v1
          </span>
        </div>
      )}
    </div>
  );
}
