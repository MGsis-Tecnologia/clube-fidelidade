"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AuthGuard } from "@/components/layout/auth-guard";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <MobileSidebar />
        <div
          className={cn(
            "min-h-screen transition-[padding] duration-300",
            collapsed ? "lg:pl-[80px]" : "lg:pl-[260px]",
          )}
        >
          <Topbar />
          <main className="relative">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
