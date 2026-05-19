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
  redemptions,
} from "@/mocks/seed";
import { currency, initials, numberBR, relativeTime } from "@/lib/formatters";
import { usePartnerStore } from "@/store/partner.store";

export default function DashboardPage() {
  const partner = usePartnerStore((s) => s.partner);
  const m = dashboardMetrics;

  const recentPurchases = purchases.slice(0, 6);
  const topCustomers = [...customers]
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={`Bem-vinda · ${partner.tradeName}`}
        title="Visão geral do seu programa"
        description="Acompanhe vendas, recompensas e o engajamento dos seus clientes em um só lugar — com a precisão de um relatório financeiro."
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link href="/compras">
                <TrendingUp className="h-4 w-4" />
                Ver compras
              </Link>
            </Button>
            <Button variant="emerald" size="sm" asChild>
              <Link href="/configuracoes">
                <Sparkles className="h-4 w-4" />
                Ajustar programa
              </Link>
            </Button>
          </>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          label="Clientes ativos"
          value={numberBR(m.totalCustomers)}
          delta={m.customersGrowth}
          hint="últimos 30 dias"
          icon={Users}
          accent="emerald"
        />
        <StatCard
          label="Total vendido"
          value={currency(m.totalSold)}
          delta={m.salesGrowth}
          hint="mês corrente"
          icon={ShoppingBag}
          accent="amber"
        />
        <StatCard
          label={partner.config.mechanic === "cashback" ? "Cashback gerado" : "Pontos gerados"}
          value={
            partner.config.mechanic === "cashback"
              ? currency(m.totalRewards)
              : numberBR(m.totalRewards * 100)
          }
          delta={m.rewardsGrowth}
          icon={Coins}
          accent="emerald"
        />
        <StatCard
          label="Resgates realizados"
          value={numberBR(m.totalRedemptions)}
          delta={m.redemptionsGrowth}
          icon={Gift}
          accent="slate"
        />
        <StatCard
          label="Compras hoje"
          value={numberBR(m.purchasesToday)}
          hint="processadas pelo ERP"
          icon={Banknote}
          accent="amber"
        />
        <StatCard
          label="Saldo distribuído"
          value={currency(m.totalBalance)}
          hint="disponível para resgate"
          icon={Wallet}
          accent="emerald"
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="surface relative overflow-hidden rounded-xl p-6 lg:col-span-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Movimentação · 30 dias</p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
                Compras &amp; recompensas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Volume diário de vendas processadas pelo ERP e o respectivo
                cashback gerado para os clientes.
              </p>
            </div>
            <div className="hidden gap-4 sm:flex">
              <Legend color="hsl(var(--chart-1))" label="Vendas" />
              <Legend color="hsl(var(--chart-2))" label="Recompensas" />
            </div>
          </div>
          <div className="mt-6">
            <PurchaseChart data={purchaseSeries} />
          </div>
        </div>

        <div className="surface relative overflow-hidden rounded-xl p-6 lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">Clientes · 6 meses</p>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
                Base ativa
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Crescimento da base ativa e aquisição mensal.
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
              <p className="eyebrow">Atividade recente</p>
              <h3 className="mt-1 font-display text-lg font-medium">
                Últimas compras recebidas
              </h3>
            </div>
            <Button asChild size="sm" variant="ghost" className="gap-1.5">
              <Link href="/compras">
                Ver todas
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
                    +{currency(p.reward)}{" "}
                    {partner.config.mechanic === "cashback" ? "cashback" : "pontos"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface relative overflow-hidden rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="eyebrow">Curadoria</p>
              <h3 className="mt-1 font-display text-lg font-medium">
                Clientes mais valiosos
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
                    saldo {currency(c.currentBalance)}
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
