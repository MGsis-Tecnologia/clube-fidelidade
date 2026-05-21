"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Building2,
  Check,
  Copy,
  KeyRound,
  RefreshCw,
  Save,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { usePartnerStore } from "@/store/partner.store";
import { cn } from "@/lib/utils";

const schema = z.object({
  companyName: z.string().min(2, "Informe a razão social."),
  tradeName: z.string().min(2, "Informe o nome fantasia."),
  cnpj: z.string().min(14, "CNPJ inválido."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(8, "Telefone inválido."),
  address: z.string().min(5, "Informe o endereço completo."),
  mechanic: z.enum(["cashback", "pontos", "cupons"]),
  returnRate: z.coerce.number().min(0.1).max(100),
  minRedeem: z.coerce.number().min(0),
  expirationDays: z.coerce.number().min(1),
  allowPartialRedeem: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function ConfiguracoesPage() {
  const partner = usePartnerStore((s) => s.partner);
  const updatePartner = usePartnerStore((s) => s.updatePartner);
  const updateConfig = usePartnerStore((s) => s.updateConfig);
  const rotateToken = usePartnerStore((s) => s.rotateToken);

  const [copied, setCopied] = React.useState(false);
  const [confirmRotate, setConfirmRotate] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: partner.companyName,
      tradeName: partner.tradeName,
      cnpj: partner.cnpj,
      email: partner.email,
      phone: partner.phone,
      address: partner.address,
      mechanic: partner.config.mechanic,
      returnRate: partner.config.returnRate,
      minRedeem: partner.config.minRedeem,
      expirationDays: partner.config.expirationDays,
      allowPartialRedeem: partner.config.allowPartialRedeem,
    },
  });

  const mechanic = watch("mechanic");

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 500));
    updatePartner({
      companyName: data.companyName,
      tradeName: data.tradeName,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
    updateConfig({
      mechanic: data.mechanic,
      returnRate: data.returnRate,
      minRedeem: data.minRedeem,
      expirationDays: data.expirationDays,
      allowPartialRedeem: data.allowPartialRedeem,
    });
    toast.success("Configurações atualizadas", {
      description: "O programa de fidelidade foi salvo com sucesso.",
    });
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(partner.erpToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    toast.success("Token copiado para a área de transferência.");
  };

  const payloadExample = JSON.stringify(
    { token: partner.erpToken, cliente: "11999999999", valor: 150.0 },
    null,
    2,
  );

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Configurações"
        title="Configure seu programa"
        description="Personalize a mecânica, a taxa de retorno e os limites do programa. Esses ajustes valem instantaneamente para todas as próximas transações."
      />

      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList>
          <TabsTrigger value="empresa">
            <Building2 className="h-3.5 w-3.5" /> Empresa
          </TabsTrigger>
          <TabsTrigger value="programa">
            <Wand2 className="h-3.5 w-3.5" /> Programa
          </TabsTrigger>
          <TabsTrigger value="integracao">
            <KeyRound className="h-3.5 w-3.5" /> Integração ERP
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TabsContent value="empresa" className="space-y-6">
            <div className="surface grid gap-6 rounded-xl p-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <p className="eyebrow">Identidade</p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                  Dados principais do parceiro
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esses dados aparecem em recibos, comunicações e na ficha do
                  cliente.
                </p>
              </div>

              <Field
                label="Nome da empresa"
                error={errors.companyName?.message}
                {...register("companyName")}
              />
              <Field
                label="Nome fantasia"
                error={errors.tradeName?.message}
                {...register("tradeName")}
              />
              <Field
                label="CNPJ"
                error={errors.cnpj?.message}
                {...register("cnpj")}
              />
              <Field
                label="E-mail"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />
              <Field
                label="Telefone"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Field
                label="Logo (URL)"
                placeholder="https://..."
                onChange={(e) => updatePartner({ logoUrl: e.target.value })}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Endereço"
                  error={errors.address?.message}
                  {...register("address")}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programa" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="surface space-y-6 rounded-xl p-6">
                <div>
                  <p className="eyebrow">Mecânica principal</p>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                    Como os clientes serão recompensados
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mechanic">Mecânica</Label>
                    <Select
                      value={mechanic}
                      onValueChange={(v) =>
                        setValue("mechanic", v as "cashback" | "pontos" | "cupons", {
                          shouldDirty: true,
                        })
                      }
                    >
                      <SelectTrigger id="mechanic">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cashback">Cashback</SelectItem>
                        <SelectItem value="pontos">Pontos</SelectItem>
                        <SelectItem value="cupons">Cupons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {mechanic === "cupons" ? (
                    <Field
                      label="Valor por cupom"
                      type="number"
                      step="0.01"
                      prefix="R$"
                      error={errors.returnRate?.message}
                      {...register("returnRate", { valueAsNumber: true })}
                    />
                  ) : (
                    <Field
                      label="Taxa de retorno (%)"
                      type="number"
                      step="0.1"
                      suffix="%"
                      error={errors.returnRate?.message}
                      {...register("returnRate", { valueAsNumber: true })}
                    />
                  )}
                  <Field
                    label="Valor mínimo para resgate"
                    type="number"
                    step="1"
                    prefix="R$"
                    error={errors.minRedeem?.message}
                    {...register("minRedeem", { valueAsNumber: true })}
                  />
                  <Field
                    label="Expiração do saldo (dias)"
                    type="number"
                    step="1"
                    suffix="dias"
                    error={errors.expirationDays?.message}
                    {...register("expirationDays", { valueAsNumber: true })}
                  />
                </div>

                <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4">
                  <div>
                    <p className="text-sm font-medium">Permitir resgate parcial</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      O cliente pode utilizar apenas parte do saldo em uma
                      compra, sem precisar atingir o valor cheio.
                    </p>
                  </div>
                  <Switch
                    checked={watch("allowPartialRedeem")}
                    onCheckedChange={(v) =>
                      setValue("allowPartialRedeem", v, { shouldDirty: true })
                    }
                  />
                </div>
              </div>

              <div className="surface relative overflow-hidden rounded-xl p-6">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald/20 blur-3xl"
                  aria-hidden
                />
                <p className="eyebrow">Pré-visualização</p>
                <h4 className="mt-2 font-display text-lg font-medium">
                  Cliente comprou {" "}
                  <span className="text-emerald">R$ 200,00</span>
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Com sua mecânica atual, o cliente receberá:
                </p>
                <p className="display-num mt-4 text-4xl font-medium text-emerald">
                  {mechanic === "cashback"
                    ? `R$ ${((watch("returnRate") || 0) * 2).toFixed(2)}`
                    : mechanic === "pontos"
                    ? `${Math.round((watch("returnRate") || 0) * 2 * 10)} pts`
                    : `${Math.floor(200 / (watch("returnRate") || 1))} cupons`}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {mechanic === "cashback"
                    ? `${watch("returnRate")}% do valor da compra`
                    : mechanic === "pontos"
                    ? `${watch("returnRate")} pontos a cada R$ 1,00`
                    : `1 cupom a cada R$ ${watch("returnRate")}`}
                </p>

                <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                    Saldo expira em {watch("expirationDays")} dias
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                    Mínimo de R$ {watch("minRedeem")} para resgate
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                    Resgate parcial {watch("allowPartialRedeem") ? "habilitado" : "desabilitado"}
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integracao" className="space-y-6">
            <div className="surface relative overflow-hidden rounded-xl p-6">
              <p className="eyebrow">Token de integração</p>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                Conecte seu ERP ao Clube Fidelidade
              </h3>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Utilize este token para autenticar cada chamada da sua API. Mantenha
                este valor em segredo — ele identifica o seu parceiro.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 font-mono text-sm">
                  <span className="truncate">{partner.erpToken}</span>
                  <Badge variant="emerald">ativo</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyToken}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                  <Button
                    type="button"
                    variant="emerald"
                    size="sm"
                    onClick={() => setConfirmRotate(true)}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Gerar novo
                  </Button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Endpoint
                  </p>
                  <p className="mt-1 font-mono text-sm">
                    POST https://api.clubefidelidade.app/v1/compras
                  </p>
                  <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Headers
                  </p>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-muted/60 p-3 font-mono text-xs text-foreground">
{`Authorization: Bearer ${partner.erpToken.slice(0, 14)}...
Content-Type: application/json`}
                  </pre>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Payload esperado
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-md bg-[hsl(160_14%_8%)] p-4 font-mono text-xs leading-relaxed text-[hsl(35_50%_85%)]">
{payloadExample}
                  </pre>
                  <p className="mt-3 text-xs text-muted-foreground">
                    O ERP envia CPF ou telefone do cliente e o valor da compra.
                    O sistema calcula o cashback/pontos automaticamente.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <div className="surface sticky bottom-4 z-10 flex flex-col items-center justify-between gap-3 rounded-xl p-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              As alterações são salvas localmente nesta demonstração.
            </p>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="emerald"
                size="sm"
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" />
                Salvar alterações
              </Button>
            </div>
          </div>
        </form>
      </Tabs>

      <ConfirmDialog
        open={confirmRotate}
        onOpenChange={setConfirmRotate}
        title="Gerar um novo token?"
        description="Ao gerar um novo token, o token atual deixa de ser válido imediatamente. Você precisará atualizar a configuração no ERP."
        confirmLabel="Sim, gerar novo"
        onConfirm={() => {
          rotateToken();
          toast.success("Novo token gerado", {
            description: "Atualize o token nas suas configurações do ERP.",
          });
        }}
      />
    </div>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  prefix?: string;
  suffix?: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, prefix, suffix, className, id, ...props }, ref) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\W+/g, "-")}`;
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId}>{label}</Label>
        <div
          className={cn(
            "relative flex items-center",
            (prefix || suffix) && "rounded-md border border-input bg-background",
          )}
        >
          {prefix ? (
            <span className="border-r border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              {prefix}
            </span>
          ) : null}
          <Input
            id={inputId}
            ref={ref}
            className={cn(
              prefix || suffix
                ? "border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                : "",
              className,
            )}
            {...props}
          />
          {suffix ? (
            <span className="border-l border-input bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              {suffix}
            </span>
          ) : null}
        </div>
        {error ? <p className="text-xs text-rose-500">{error}</p> : null}
      </div>
    );
  },
);
Field.displayName = "Field";
