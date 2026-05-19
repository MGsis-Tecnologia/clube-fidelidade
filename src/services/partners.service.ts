import type { Partner } from "@/types";
import { defaultPartner } from "@/mocks/partner";

export const partnersService = {
  async getCurrent(): Promise<Partner> {
    return defaultPartner;
  },
  async update(partial: Partial<Partner>): Promise<Partner> {
    return { ...defaultPartner, ...partial };
  },
};
