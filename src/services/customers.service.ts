import type { Customer } from "@/types";
import { customers as mockCustomers } from "@/mocks/seed";

// Stub: substituir pelos endpoints reais quando o backend for plugado.
export const customersService = {
  async list(): Promise<Customer[]> {
    return mockCustomers;
  },
  async getById(id: string): Promise<Customer | undefined> {
    return mockCustomers.find((c) => c.id === id);
  },
};
