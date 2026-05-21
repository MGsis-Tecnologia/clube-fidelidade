"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  Coins,
  Gift,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PurchaseChart } from "@/components/charts/purchase-chart";
import { CustomersChart } from "@/components/charts/customers-chart";
import {
  activeCustomersSeries,
  customers,
  dashboardMetrics,
  purchaseSeries,
  purchases,
} from "@/mocks/seed";
import { currency, initials, numberBR, relativeTime } from "@/lib/formatters";
import { usePartnerStore } from "@/store/partner.store";
import { useT } from "@/hooks/use-t";

export default function DashboardPage() {
  const partner = usePartnerStore((s) => s.partner);
  const m = dashboardMetrics;
  const t = useT();

  const recentPurchases = purchases.slice(0, 6);
  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={`${t("dashboard.eyebrow")} · ${partner.tradeName}`}
        title={t("dashboard.title")}
        description={t("dashboard.desc")}
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/compras">
                <TrendingUp className="h-4 w-4" />
                {t("dashboard.view-purchases")}
              </Link>
            </Button>
            <Button variant="emerald" size="sm" asChild>
              <Link href="/configuracoes">
                <Sparkles className="h-4 w-4" />
                {t("dashboard.adjust-program")}
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          label={t("dashboard.active-customers")}
          value={numberBR(m.totalCustomers)}
          delta={m.customersGrowth}
          hint={t("dashboard.last-30-days")}
          icon={Users}
          accent="emerald"
        />
        <StatCard
          label={t("dashboard.total-sold")}
          value={currency(m.totalSold)}
          delta={m.salesGrowth}
          hint={t("dashboard.current-month")}
          icon={ShoppingBag}
          accent="amber"
        />
        <StatCard
          label={
            partner.config.mechanic === "cashback"
              ? t("dashboard.cashback-generated")
              : partner.config.mechanic === "pontos"
              ? t("dashboard.points-generated")
              : t("dashboard.cupons-generated")
          }
          value={
            partner.config.mechanic === "cashback"
              ? currency(m.totalRewards)
              : partner.config.mechanic === "pontos"
              ? numberBR(m.totalRewards * 100)
              : `${Math.floor(m.totalRewards)}`
          }
          delta={m.rewardsGrowth}
          icon={Coins}
          accent="emerald"
        />
        <StatCard
          label={t("dashboard.redemptions")}
          value={numberBR(m.totalRedemptions)}
          delta={m.redemptionsGrowth}
          icon={Gift}
          accent="slate"
        />
        <StatCard
          label={t("dashboard.purchases-today")}
          value={numberBR(m.purchasesToday)}
          hint={t("dashboard.processed-erp")}
          icon={Banknote}
          accent="amber"
        />
        <StatCard
          label={t("dashboard.balance")}
          value={currency(m.totalBalance)}
          hint={t("dashboard.available-redeem")}
          icon={Wallet}
          accent="emerald"
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="surface relative overflow-hidden rounded-xl p-6 lg:col-span-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{t("dashboard.chart-eyebrow")}</p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
                {t("dashboard.chart-title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dashboard.chart-desc")}
              </p>
            </div>
            <div className="hidden gap-4 sm:flex">
              <Legend
                color="hsl(var(--chart-1))"
                label={t("dashboard.legend-sales")}
              />
              <Legend
                color="hsl(var(--chart-2))"
                label={t("dashboard.legend-rewards")}
              />
            </div>
          </div>
          <div className="mt-6">
            <PurchaseChart data={purchaseSeries} />
          </div>
        </div>

        <div className="surface relative overflow-hidden rounded-xl p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{t("dashboard.customers-eyebrow")}</p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
                {t("dashboard.customers-title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dashboard.customers-desc")}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <CustomersChart data={activeCustomersSeries} />
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="surface relative overflow-hidden rounded-xl lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="eyebrow">{t("dashboard.recent-eyebrow")}</p>
              <h3 className="mt-1 font-display text-lg font-medium">
                {t("dashboard.recent-title")}
              </h3>
            </div>
            <Button asChild size="sm" variant="ghost" className="gap-1.5">
              <Link href="/compras">
                {t("dashboard.view-all")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {recentPurchases.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={p.customerAvatar} alt={p.customerName} />
                  <AvatarFallback>{initials(p.customerName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {p.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {relativeTime(p.createdAt)} · {p.partnerName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {currency(p.amount)}
                  </p>
                  <p className="text-xs text-emerald">
                    {partner.config.mechanic === "cupons"
                      ? `+${Math.floor(p.reward)} ${t("dashboard.cupons")}`
                      : `+${currency(p.reward)} ${
                          partner.config.mechanic === "cashback"
                            ? t("dashboard.cashback")
                            : t("dashboard.points")
                        }`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface relative overflow-hidden rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="eyebrow">{t("dashboard.top-eyebrow")}</p>
              <h3 className="mt-1 font-display text-lg font-medium">
                {t("dashboard.top-title")}
              </h3>
            </div>
            <Badge variant="emerald">Top 5</Badge>
          </div>
          <ul className="divide-y divide-border">
            {topCustomers.map((c, idx) => (
              <li
                key={c.id}
                className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-muted/30"
              >
                <span className="w-5 font-display text-sm text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={c.avatarUrl} alt={c.name} />
                  <AvatarFallback>{initials(c.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.balance-label")} {currency(c.currentBalance)}
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {currency(c.totalSpent)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
