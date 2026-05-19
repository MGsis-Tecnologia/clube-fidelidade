"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  clientes: "Clientes",
  compras: "Compras",
  resgates: "Resgates",
  configuracoes: "Configurações",
  perfil: "Perfil",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="Trilha de navegação"
      className="flex items-center gap-1.5 text-xs text-muted-foreground"
    >
      <Link
        href="/dashboard"
        className="transition-colors hover:text-foreground"
      >
        Início
      </Link>
      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;
        const label = labels[segment] ?? segment;
        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3 w-3 opacity-60" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="transition-colors hover:text-foreground">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
