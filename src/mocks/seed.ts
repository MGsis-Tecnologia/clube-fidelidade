import { faker } from "@faker-js/faker/locale/pt_BR";
import type {
  ActiveCustomersPoint,
  Customer,
  DashboardMetrics,
  Purchase,
  PurchaseSeriesPoint,
  Redemption,
} from "@/types";

faker.seed(20260518);

const TOTAL_CUSTOMERS = 84;
const TOTAL_PURCHASES = 220;
const TOTAL_REDEMPTIONS = 64;
const PARTNER_NAME = "Aurora Boutique";

function buildCustomers(): Customer[] {
  return Array.from({ length: TOTAL_CUSTOMERS }, (_, i) => {
    const name = faker.person.fullName();
    const totalSpent = faker.number.float({ min: 120, max: 18500, fractionDigits: 2 });
    const accumulated = +(totalSpent * 0.08).toFixed(2);
    const balance = +(accumulated * faker.number.float({ min: 0.3, max: 1, fractionDigits: 2 })).toFixed(2);
    const status = faker.helpers.weightedArrayElement([
      { value: "ativo" as const, weight: 7 },
      { value: "vip" as const, weight: 2 },
      { value: "inativo" as const, weight: 1 },
    ]);
    const lastPurchase = faker.date.recent({ days: status === "inativo" ? 180 : 35 });
    const expiration = faker.date.soon({ days: 240, refDate: lastPurchase });
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    return {
      id: `cli_${String(i + 1).padStart(4, "0")}`,
      name,
      cpf: faker.string.numeric(11),
      phone: `55${faker.string.numeric(10)}`,
      email: faker.internet.email({ firstName: name.split(" ")[0] }).toLowerCase(),
      avatarUrl: `https://api.dicebear.com/9.x/notionists/svg?seed=${slug}&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
      status,
      totalSpent,
      currentBalance: balance,
      totalAccumulated: accumulated,
      pointsExpiration: expiration.toISOString(),
      lastPurchaseAt: lastPurchase.toISOString(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    };
  });
}

function buildPurchases(customers: Customer[]): Purchase[] {
  return Array.from({ length: TOTAL_PURCHASES }, (_, i) => {
    const customer = faker.helpers.arrayElement(customers);
    const amount = faker.number.float({ min: 25, max: 1800, fractionDigits: 2 });
    const reward = +(amount * 0.08).toFixed(2);
    const status = faker.helpers.weightedArrayElement([
      { value: "processada" as const, weight: 8 },
      { value: "pendente" as const, weight: 1 },
      { value: "estornada" as const, weight: 1 },
    ]);
    return {
      id: `cmp_${String(i + 1).padStart(5, "0")}`,
      customerId: customer.id,
      customerName: customer.name,
      customerAvatar: customer.avatarUrl,
      amount,
      reward,
      status,
      partnerName: PARTNER_NAME,
      createdAt: faker.date.recent({ days: 60 }).toISOString(),
    };
  }).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

function buildRedemptions(customers: Customer[]): Redemption[] {
  return Array.from({ length: TOTAL_REDEMPTIONS }, (_, i) => {
    const customer = faker.helpers.arrayElement(customers);
    const amount = faker.number.float({ min: 20, max: 720, fractionDigits: 2 });
    const status = faker.helpers.weightedArrayElement([
      { value: "concluido" as const, weight: 7 },
      { value: "pendente" as const, weight: 2 },
      { value: "cancelado" as const, weight: 1 },
    ]);
    const type = faker.helpers.arrayElement(["saldo", "produto", "desconto"] as const);
    return {
      id: `rsg_${String(i + 1).padStart(5, "0")}`,
      customerId: customer.id,
      customerName: customer.name,
      customerAvatar: customer.avatarUrl,
      amount,
      type,
      status,
      createdAt: faker.date.recent({ days: 90 }).toISOString(),
    };
  }).sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

function buildPurchaseSeries(purchases: Purchase[]): PurchaseSeriesPoint[] {
  const days = 30;
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    const iso = date.toISOString().slice(0, 10);
    const dayPurchases = purchases.filter(
      (p) => p.createdAt.slice(0, 10) === iso && p.status !== "estornada",
    );
    return {
      date: iso,
      total: +dayPurchases.reduce((acc, p) => acc + p.amount, 0).toFixed(2),
      rewards: +dayPurchases.reduce((acc, p) => acc + p.reward, 0).toFixed(2),
    };
  });
}

function buildActiveCustomers(customers: Customer[]): ActiveCustomersPoint[] {
  const months = 6;
  return Array.from({ length: months }, (_, i) => {
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - (months - 1 - i));
    const label = monthDate.toLocaleDateString("pt-BR", { month: "short" });
    const base = customers.length;
    return {
      date: label,
      ativos: Math.round(base * (0.55 + i * 0.06) + faker.number.int({ min: -5, max: 5 })),
      novos: faker.number.int({ min: 6, max: 18 }),
    };
  });
}

function buildMetrics(
  customers: Customer[],
  purchases: Purchase[],
  redemptions: Redemption[],
): DashboardMetrics {
  const validPurchases = purchases.filter((p) => p.status !== "estornada");
  const totalSold = +validPurchases.reduce((acc, p) => acc + p.amount, 0).toFixed(2);
  const totalRewards = +validPurchases.reduce((acc, p) => acc + p.reward, 0).toFixed(2);
  const today = new Date().toISOString().slice(0, 10);
  const purchasesToday = validPurchases.filter((p) => p.createdAt.slice(0, 10) === today).length;
  return {
    totalCustomers: customers.length,
    totalSold,
    totalRewards,
    totalRedemptions: redemptions.filter((r) => r.status === "concluido").length,
    purchasesToday,
    totalBalance: +customers.reduce((acc, c) => acc + c.currentBalance, 0).toFixed(2),
    customersGrowth: 12.4,
    salesGrowth: 8.7,
    rewardsGrowth: 14.2,
    redemptionsGrowth: -3.1,
  };
}

export const customers = buildCustomers();
export const purchases = buildPurchases(customers);
export const redemptions = buildRedemptions(customers);
export const purchaseSeries = buildPurchaseSeries(purchases);
export const activeCustomersSeries = buildActiveCustomers(customers);
export const dashboardMetrics = buildMetrics(customers, purchases, redemptions);
