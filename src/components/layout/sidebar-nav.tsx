"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gauge,
  Users,
  Receipt,
  GiftIcon,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const items: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Compras", href: "/compras", icon: Receipt },
  { label: "Resgates", href: "/resgates", icon: GiftIcon },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

export function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-emerald-muted/60 text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              collapsed && "justify-center px-2",
            )}
          >
            {active ? (
              <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-emerald" />
            ) : null}
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                active ? "text-emerald" : "group-hover:text-foreground",
              )}
            />
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
            {!collapsed && item.badge ? (
              <span className="ml-auto rounded-full bg-emerald-muted px-1.5 py-0.5 text-[10px] font-medium text-emerald">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
