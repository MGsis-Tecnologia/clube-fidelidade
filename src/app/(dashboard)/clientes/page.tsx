"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  CalendarClock,
  Download,
  Gift,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { customers, purchases, redemptions } from "@/mocks/seed";
import {
  currency,
  formatCPF,
  formatDate,
  formatPhone,
  initials,
  relativeTime,
} from "@/lib/formatters";
import type { Customer, CustomerStatus } from "@/types";

const statusVariant: Record<CustomerStatus, "emerald" | "amber" | "slate"> = {
  ativo: "emerald",
  vip: "amber",
  inativo: "slate",
};

const statusLabel: Record<CustomerStatus, string> = {
  ativo: "Ativo",
  vip: "VIP",
  inativo: "Inativo",
};

export default function ClientesPage() {
  const [selected, setSelected] = React.useState<Customer | null>(null);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Cliente",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={c.avatarUrl} alt={c.name} />
              <AvatarFallback>{initials(c.name)}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "cpf",
      header: "Documento",
      cell: ({ row }) => (
        <div className="font-mono text-xs">
          <p className="text-foreground">{formatCPF(row.original.cpf)}</p>
          <p className="text-muted-foreground">
            {formatPhone(row.original.phone.replace(/^55/, ""))}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "totalSpent",
      header: "Total gasto",
      cell: ({ row }) => (
        <span className="font-medium">{currency(row.original.totalSpent)}</span>
      ),
    },
    {
      accessorKey: "currentBalance",
      header: "Saldo atual",
      cell: ({ row }) => (
        <span className="text-emerald font-medium">
          {currency(row.original.currentBalance)}
        </span>
      ),
    },
    {
      accessorKey: "totalAccumulated",
      header: "Acumulado",
      cell: ({ row }) => currency(row.original.totalAccumulated),
    },
    {
      accessorKey: "lastPurchaseAt",
      header: "Última compra",
      cell: ({ row }) =>
        row.original.lastPurchaseAt ? (
          <span className="text-muted-foreground">
            {relativeTime(row.original.lastPurchaseAt)}
          </span>
        ) : (
          "—"
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

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={`${customers.length} clientes`}
        title="Clientes do programa"
        description="Visualize, pesquise e investigue cada cliente. O drawer lateral mostra histórico completo, saldo e validade dos pontos."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
            <Button variant="emerald" size="sm">
              <Plus className="h-4 w-4" />
              Adicionar cliente
            </Button>
          </>
        }
      />

      <DataTable
        columns={columns}
        data={customers}
        globalFilterPlaceholder="Buscar por nome, e-mail ou CPF..."
        globalFilterFn={(row, q) =>
          row.name.toLowerCase().includes(q) ||
          row.email.toLowerCase().includes(q) ||
          row.cpf.includes(q.replace(/\D/g, ""))
        }
        onRowClick={(row) => setSelected(row)}
        pageSize={10}
      />

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-xl">
          {selected ? <CustomerDetail customer={selected} /> : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function CustomerDetail({ customer }: { customer: Customer }) {
  const customerPurchases = purchases.filter((p) => p.customerId === customer.id);
  const customerRedemptions = redemptions.filter(
    (r) => r.customerId === customer.id,
  );

  return (
    <div>
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-emerald/10 via-card to-card px-6 pb-8 pt-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber/20 blur-3xl"
          aria-hidden
        />
        <SheetHeader>
          <SheetTitle className="sr-only">{customer.name}</SheetTitle>
          <SheetDescription className="sr-only">
            Detalhes completos do cliente
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-4 ring-card">
            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
            <AvatarFallback>{initials(customer.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Badge variant={statusVariant[customer.status]}>
              {statusLabel[customer.status]}
            </Badge>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              {customer.name}
            </h2>
            <p className="text-xs text-muted-foreground">
              cliente desde {formatDate(customer.createdAt)}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Saldo atual" value={currency(customer.currentBalance)} accent />
          <Stat label="Total acumulado" value={currency(customer.totalAccumulated)} />
          <Stat label="Total gasto" value={currency(customer.totalSpent)} />
        </dl>

        {customer.pointsExpiration ? (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber/30 bg-amber/10 px-3 py-2 text-xs text-amber">
            <CalendarClock className="h-3.5 w-3.5" />
            <span>
              Validade dos pontos: {formatDate(customer.pointsExpiration)}
            </span>
          </div>
        ) : null}

        <dl className="mt-6 grid grid-cols-2 gap-3 text-xs">
          <InfoRow label="CPF" value={formatCPF(customer.cpf)} mono />
          <InfoRow
            label="Telefone"
            value={formatPhone(customer.phone.replace(/^55/, ""))}
            mono
          />
          <InfoRow label="E-mail" value={customer.email} className="col-span-2" />
        </dl>
      </div>

      <div className="px-6 py-6">
        <Tabs defaultValue="purchases">
          <TabsList className="w-full">
            <TabsTrigger value="purchases" className="flex-1">
              <ShoppingBag className="h-3.5 w-3.5" /> Compras
            </TabsTrigger>
            <TabsTrigger value="redemptions" className="flex-1">
              <Gift className="h-3.5 w-3.5" /> Resgates
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex-1">
              <Users className="h-3.5 w-3.5" /> Resumo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            {customerPurchases.length === 0 ? (
              <EmptyHistory icon={ShoppingBag} text="Sem compras registradas" />
            ) : (
              <ul className="divide-y divide-border rounded-lg border border-border">
                {customerPurchases.slice(0, 8).map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{currency(p.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        {relativeTime(p.createdAt)} · {p.partnerName}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-emerald">
                      +{currency(p.reward)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="redemptions">
            {customerRedemptions.length === 0 ? (
              <EmptyHistory icon={Gift} text="Sem resgates registrados" />
            ) : (
              <ul className="divide-y divide-border rounded-lg border border-border">
                {customerRedemptions.slice(0, 8).map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-medium capitalize">{r.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {relativeTime(r.createdAt)}
                      </p>
                    </div>
                    <span className="text-xs font-medium">
                      −{currency(r.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="summary">
            <div className="space-y-3 rounded-lg border border-border p-4 text-sm">
              <SummaryRow
                label="Compras realizadas"
                value={customerPurchases.length.toString()}
              />
              <SummaryRow
                label="Ticket médio"
                value={
                  customerPurchases.length
                    ? currency(
                        customerPurchases.reduce((a, p) => a + p.amount, 0) /
                          customerPurchases.length,
                      )
                    : currency(0)
                }
              />
              <SummaryRow
                label="Resgates"
                value={customerRedemptions.length.toString()}
              />
              <SummaryRow
                label="Total resgatado"
                value={currency(
                  customerRedemptions.reduce((a, r) => a + r.amount, 0),
                )}
              />
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Ver perfil completo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`display-num text-lg font-medium ${
          accent ? "text-emerald" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
  className,
}: {
  label: string;
  value: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className={`mt-0.5 ${mono ? "font-mono" : ""} text-foreground`}>
        {value}
      </dd>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function EmptyHistory({
  icon: Icon,
  text,
}: {
  icon: typeof ShoppingBag;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
      <Icon className="h-6 w-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
