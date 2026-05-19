"use client";

import { useLanguageStore } from "@/store/language.store";
import { cn } from "@/lib/utils";

function FlagBR({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={cn("h-3.5 w-5 rounded-[2px]", className)}
      aria-hidden
    >
      <rect width="20" height="14" fill="#009c3b" />
      <polygon points="10,1.4 18.6,7 10,12.6 1.4,7" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.6" fill="#002776" />
      <path
        d="M6.6 7.5 Q10 5.6 13.4 7.5"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlagPY({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className={cn("h-3.5 w-5 rounded-[2px]", className)}
      aria-hidden
    >
      <rect width="20" height="14" fill="white" />
      <rect width="20" height="4.67" fill="#d52b1e" />
      <rect y="9.33" width="20" height="4.67" fill="#0038a8" />
      <circle cx="10" cy="7" r="2" fill="#009a44" />
      <circle cx="10" cy="7" r="1.2" fill="#ffdf00" />
      <circle cx="10" cy="7" r="0.6" fill="#d52b1e" />
    </svg>
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/60 bg-muted/40 p-0.5">
      <button
        onClick={() => setLang("pt")}
        aria-label="Português (Brasil)"
        title="Português"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium transition-colors",
          lang === "pt"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <FlagBR />
        <span>PT</span>
      </button>
      <button
        onClick={() => setLang("es")}
        aria-label="Español (Paraguay)"
        title="Español"
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium transition-colors",
          lang === "es"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <FlagPY />
        <span>ES</span>
      </button>
    </div>
  );
}
