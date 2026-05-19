"use client";

import { useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Logo } from "./logo";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUiStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggle = useUiStore((s) => s.toggleSidebar);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-30",
        "flex-col border-r border-border bg-card/60 backdrop-blur",
        "transition-[width] duration-300 ease-out",
        collapsed ? "lg:w-[80px]" : "lg:w-[260px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-4",
          collapsed && "justify-center px-2",
        )}
      >
        <Logo compact={collapsed} />
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin px-3 py-4">
        {!collapsed ? (
          <p className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Operação
          </p>
        ) : (
          <div className="h-3" />
        )}
        <SidebarNav collapsed={collapsed} />
      </div>

      <Separator />

      <div className="space-y-2 p-3">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "sm"}
          onClick={toggle}
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground",
            collapsed && "justify-center",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Recolher</span>
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "sm"}
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground hover:text-rose-500",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>
    </aside>
  );
}
