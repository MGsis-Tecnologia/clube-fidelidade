import type { Redemption } from "@/types";
import { redemptions as mockRedemptions } from "@/mocks/seed";

export const redemptionsService = {
  async list(): Promise<Redemption[]> {
    return mockRedemptions;
  },
  async byCustomer(customerId: string): Promise<Redemption[]> {
    return mockRedemptions.filter((r) => r.customerId === customerId);
  },
};
