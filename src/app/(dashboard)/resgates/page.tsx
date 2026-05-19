"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Filter, Gift } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { redemptions } from "@/mocks/seed";
import {
  currency,
  formatDateTime,
  initials,
  numberBR,
} from "@/lib/formatters";
import type { Redemption, RedemptionStatus, RedemptionType } from "@/types";

const statusVariant: Record<
  RedemptionStatus,
  "emerald" | "amber" | "rose"
> = {
  concluido: "emerald",
  pendente: "amber",
  cancelado: "rose",
};

const statusLabel: Record<RedemptionStatus, string> = {
  concluido: "Concluído",
  pendente: "Pendente",
  cancelado: "Cancelado",
};

const typeLabel: Record<RedemptionType, string> = {
  saldo: "Saldo em conta",
  produto: "Produto",
  desconto: "Desconto na próxima compra",
};

export default function ResgatesPage() {
  const [statusFilter, setStatusFilter] = React.useState<
    RedemptionStatus | "all"
  >("all");
  const [typeFilter, setTypeFilter] = React.useState<RedemptionType | "all">(
    "all",
  );

  const filtered = React.useMemo(() => {
    let list = redemptions;
    if (statusFilter !== "all") list = list.filter((r) => r.status === statusFilter);
    if (typeFilter !== "all") list = list.filter((r) => r.type === typeFilter);
    return list;
  }, [statusFilter, typeFilter]);

  const totalAmount = filtered.reduce((a, r) => a + r.amount, 0);
  const concluded = filtered.filter((r) => r.status === "concluido");

  const columns: ColumnDef<Redemption>[] = [
    {
      accessorKey: "customerName",
      header: "Cliente",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.customerAvatar} />
            <AvatarFallback>{initials(row.original.customerName)}</AvatarFallback>
          </Avatar>
          <div className="leading-tight">
            <p className="font-medium text-foreground">
              {row.original.customerName}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {row.original.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Valor resgatado",
      cell: ({ row }) => (
        <span className="font-medium">{currency(row.original.amount)}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => (
        <Badge variant="outline">{typeLabel[row.original.type]}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Data",
      cell: ({ row }) => formatDateTime(row.original.createdAt),
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

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Resgates"
        title="Histórico de resgates"
        description="Acompanhe o uso real do programa: cada vez que um cliente converte seu saldo em vantagem."
      />

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Resgates no filtro"
          value={numberBR(filtered.length)}
          icon={Gift}
          accent="emerald"
        />
        <StatCard
          label="Total resgatado"
          value={currency(totalAmount)}
          accent="amber"
        />
        <StatCard
          label="Concluídos"
          value={numberBR(concluded.length)}
          accent="emerald"
        />
        <StatCard
          label="Ticket médio"
          value={
            filtered.length ? currency(totalAmount / filtered.length) : currency(0)
          }
          accent="slate"
        />
      </section>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filtered}
          globalFilterPlaceholder="Buscar resgate por cliente..."
          globalFilterFn={(row, q) =>
            row.customerName.toLowerCase().includes(q) ||
            row.id.toLowerCase().includes(q)
          }
          toolbar={
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={typeFilter}
                onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}
              >
                <SelectTrigger className="h-9 w-44 text-sm">
                  <Filter className="h-3.5 w-3.5" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="saldo">Saldo em conta</SelectItem>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="desconto">Desconto</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}
              >
                <SelectTrigger className="h-9 w-40 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
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
