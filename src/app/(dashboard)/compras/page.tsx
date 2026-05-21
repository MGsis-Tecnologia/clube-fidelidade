"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Download, Filter, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { purchases } from "@/mocks/seed";
import {
  currency,
  formatDateTime,
  initials,
  numberBR,
} from "@/lib/formatters";
import { usePartnerStore } from "@/store/partner.store";
import type { Purchase, PurchaseStatus } from "@/types";

const statusVariant: Record<
  PurchaseStatus,
  "emerald" | "amber" | "rose" | "slate"
> = {
  processada: "emerald",
  pendente: "amber",
  estornada: "rose",
};

const statusLabel: Record<PurchaseStatus, string> = {
  processada: "Processada",
  pendente: "Pendente",
  estornada: "Estornada",
};

const periodOptions = [
  { label: "Últimos 7 dias", value: "7" },
  { label: "Últimos 30 dias", value: "30" },
  { label: "Últimos 60 dias", value: "60" },
  { label: "Todo o histórico", value: "all" },
];

export default function ComprasPage() {
  const partner = usePartnerStore((s) => s.partner);
  const [period, setPeriod] = React.useState("30");
  const [status, setStatus] = React.useState<PurchaseStatus | "all">("all");

  const filtered = React.useMemo(() => {
    let list = purchases;
    if (period !== "all") {
      const days = Number(period);
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      list = list.filter((p) => +new Date(p.createdAt) >= cutoff);
    }
    if (status !== "all") {
      list = list.filter((p) => p.status === status);
    }
    return list;
  }, [period, status]);

  const totals = React.useMemo(() => {
    const totalAmount = filtered.reduce((a, p) => a + p.amount, 0);
    const totalReward = filtered.reduce((a, p) => a + p.reward, 0);
    const processed = filtered.filter((p) => p.status === "processada").length;
    return {
      count: filtered.length,
      totalAmount,
      totalReward,
      processed,
    };
  }, [filtered]);

  const columns: ColumnDef<Purchase>[] = [
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => (
        <div className="leading-tight">
          <p className="text-foreground">{formatDateTime(row.original.createdAt)}</p>
          <p className="text-xs text-muted-foreground font-mono">{row.original.id}</p>
        </div>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Cliente",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.customerAvatar} />
            <AvatarFallback>{initials(row.original.customerName)}</AvatarFallback>
          </Avatar>
          <p className="font-medium text-foreground">{row.original.customerName}</p>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Valor",
      cell: ({ row }) => (
        <span className="font-medium">{currency(row.original.amount)}</span>
      ),
    },
    {
      accessorKey: "reward",
      header:
        partner.config.mechanic === "cashback"
          ? "Cashback"
          : partner.config.mechanic === "pontos"
          ? "Pontos"
          : "Cupons",
      cell: ({ row }) => (
        <span className="text-emerald font-medium">
          {partner.config.mechanic === "cupons"
            ? `+${Math.floor(row.original.reward)}`
            : `+${currency(row.original.reward)}`}
        </span>
      ),
    },
    {
      accessorKey: "partnerName",
      header: "Parceiro",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.partnerName}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status]}>
          {statusLabel[row.original.status]}
        </Badge>
      ),
    },
  ];

  const exportCsv = () => {
    const header = ["data", "cliente", "valor", "recompensa", "status"];
    const rows = filtered.map((p) => [
      p.createdAt,
      p.customerName,
      p.amount.toFixed(2),
      p.reward.toFixed(2),
      p.status,
    ]);
    const csv = [header, ...rows].map((r) => r.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compras-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Exportação concluída", {
      description: `${filtered.length} compras exportadas em CSV.`,
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Atividade transacional"
        title="Compras recebidas do ERP"
        description={`Visualize cada transação enviada pela integração e o ${
          partner.config.mechanic === "cupons"
            ? "cupom"
            : partner.config.mechanic === "pontos"
            ? "ponto"
            : "cashback"
        } gerado. Filtre por período, status ou cliente.`}
        actions={
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            Exportar CSV
          </Button>
        }
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Compras no período"
          value={numberBR(totals.count)}
          icon={ShoppingBag}
          accent="emerald"
        />
        <StatCard
          label="Total vendido"
          value={currency(totals.totalAmount)}
          accent="amber"
        />
        <StatCard
          label={
            partner.config.mechanic === "cashback"
              ? "Cashback gerado"
              : partner.config.mechanic === "pontos"
              ? "Pontos gerados"
              : "Cupons gerados"
          }
          value={
            partner.config.mechanic === "cupons"
              ? `${Math.floor(totals.totalReward)}`
              : currency(totals.totalReward)
          }
          accent="emerald"
        />
        <StatCard
          label="Processadas"
          value={numberBR(totals.processed)}
          hint="confirmadas pelo ERP"
          accent="slate"
        />
      </section>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filtered}
          globalFilterPlaceholder="Buscar por cliente ou ID..."
          globalFilterFn={(row, q) =>
            row.customerName.toLowerCase().includes(q) ||
            row.id.toLowerCase().includes(q)
          }
          toolbar={
            <div className="flex flex-wrap items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="h-9 w-44 text-sm">
                  <Filter className="h-3.5 w-3.5" />
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as typeof status)}
              >
                <SelectTrigger className="h-9 w-40 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="processada">Processada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="estornada">Estornada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
          pageSize={12}
        />
      </div>
    </div>
  );
}
