export type ProgramMechanic = "cashback" | "pontos";

export type CustomerStatus = "ativo" | "inativo" | "vip";

export type PurchaseStatus = "processada" | "pendente" | "estornada";

export type RedemptionStatus = "concluido" | "pendente" | "cancelado";

export type RedemptionType = "saldo" | "produto" | "desconto";

export interface Partner {
  id: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
  logoUrl?: string;
  config: ProgramConfig;
  erpToken: string;
}

export interface ProgramConfig {
  mechanic: ProgramMechanic;
  returnRate: number; // % do valor da compra
  minRedeem: number; // valor monetário
  expirationDays: number;
  allowPartialRedeem: boolean;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  avatarUrl: string;
  status: CustomerStatus;
  totalSpent: number;
  currentBalance: number;
  totalAccumulated: number;
  pointsExpiration?: string;
  lastPurchaseAt?: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  reward: number; // cashback ou pontos gerados
  status: PurchaseStatus;
  partnerName: string;
  createdAt: string;
}

export interface Redemption {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  amount: number;
  type: RedemptionType;
  status: RedemptionStatus;
  createdAt: string;
}

export interface DashboardMetrics {
  totalCustomers: number;
  totalSold: number;
  totalRewards: number;
  totalRedemptions: number;
  purchasesToday: number;
  totalBalance: number;
  customersGrowth: number; // %
  salesGrowth: number;
  rewardsGrowth: number;
  redemptionsGrowth: number;
}

export interface PurchaseSeriesPoint {
  date: string;
  total: number;
  rewards: number;
}

export interface ActiveCustomersPoint {
  date: string;
  ativos: number;
  novos: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "manager";
  avatarUrl: string;
  partnerId: string;
}
