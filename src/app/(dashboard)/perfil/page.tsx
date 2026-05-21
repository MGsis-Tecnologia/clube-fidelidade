"use client";

import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { useAuthStore } from "@/store/auth.store";
import { usePartnerStore } from "@/store/partner.store";
import { initials } from "@/lib/formatters";

export default function PerfilPage() {
  const user = useAuthStore((s) => s.user);
  const partner = usePartnerStore((s) => s.partner);

  if (!user) return null;

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Sua conta"
        title="Perfil do parceiro"
        description="Informações sobre você e o seu negócio dentro do Clube Fidelidade."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="surface relative overflow-hidden rounded-xl p-6">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald/15 blur-3xl"
            aria-hidden
          />
          <p className="eyebrow">Usuário</p>
          <div className="mt-4 flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-card">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <Badge variant="emerald">
                {user.role === "owner" ? "Proprietário" : "Gestor"}
              </Badge>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">
                {user.name}
              </h2>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <dl className="mt-8 space-y-3 text-sm">
            <Row icon={Mail} label="E-mail" value={user.email} />
            <Row icon={Phone} label="Telefone" value={partner.phone} />
            <Row icon={Building2} label="Empresa" value={partner.tradeName} />
            <Row icon={MapPin} label="Endereço" value={partner.address} />
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            <Button variant="emerald" size="sm">Editar perfil</Button>
            <Button variant="outline" size="sm">
              Alterar senha
            </Button>
          </div>
        </div>

        <div className="surface relative overflow-hidden rounded-xl p-6">
          <p className="eyebrow">Empresa</p>
          <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">
            {partner.companyName}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            CNPJ {partner.cnpj}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Mini
              label="Mecânica"
              value={
                partner.config.mechanic === "cashback"
                  ? "Cashback"
                  : partner.config.mechanic === "pontos"
                  ? "Pontos"
                  : "Cupons"
              }
            />
            <Mini
              label={partner.config.mechanic === "cupons" ? "Por cupom" : "Taxa"}
              value={
                partner.config.mechanic === "cupons"
                  ? `R$ ${partner.config.returnRate}`
                  : `${partner.config.returnRate}%`
              }
            />
            <Mini label="Mínimo resgate" value={`R$ ${partner.config.minRedeem}`} />
            <Mini label="Expira" value={`${partner.config.expirationDays} dias`} />
          </div>

          <div className="mt-6 rounded-lg border border-dashed border-border p-4 text-xs text-muted-foreground">
            Convide outros membros da sua equipe para acessar o painel.
            Disponível em breve.
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="display-num text-lg font-medium text-foreground">{value}</p>
    </div>
  );
}
