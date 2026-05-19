import type { Partner } from "@/types";

export const defaultPartner: Partner = {
  id: "ptn_001",
  companyName: "Boutique Aurora Comércio Ltda",
  tradeName: "Aurora Boutique",
  cnpj: "12.345.678/0001-90",
  email: "contato@auroraboutique.com.br",
  phone: "(11) 99888-7766",
  address: "Rua Oscar Freire, 1.200 — Jardins, São Paulo / SP",
  logoUrl: undefined,
  config: {
    mechanic: "cashback",
    returnRate: 8,
    minRedeem: 50,
    expirationDays: 180,
    allowPartialRedeem: true,
  },
  erpToken: "fid_live_a3f72e91c4b8d0f1a2e6c5b3d9f4e8a7",
};
