import type { Purchase } from "@/types";
import { purchases as mockPurchases } from "@/mocks/seed";

export const purchasesService = {
  async list(): Promise<Purchase[]> {
    return mockPurchases;
  },
  async byCustomer(customerId: string): Promise<Purchase[]> {
    return mockPurchases.filter((p) => p.customerId === customerId);
  },
};
