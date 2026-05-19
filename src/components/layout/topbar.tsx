"use client";

import Link from "next/link";
import { Menu, Search, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LanguageSwitcher } from "./language-switcher";
import { useUiStore } from "@/store/ui.store";
import { useT } from "@/hooks/use-t";

export function Topbar() {
  const setMobileOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const t = useT();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t("topbar.open-menu")}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="relative hidden md:block md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("topbar.search")}
              className="h-9 rounded-full border-border/60 bg-muted/40 pl-9 pr-16 text-sm focus-visible:bg-background"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
              ⌘K
            </kbd>
          </div>

          <Button
            asChild
            variant="emerald"
            size="sm"
            className="hidden gap-1.5 lg:inline-flex"
          >
            <Link href="/configuracoes">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("topbar.new-program")}</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={t("topbar.notifications")}
            className="relative rounded-full border border-border/60"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald" />
          </Button>

          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
