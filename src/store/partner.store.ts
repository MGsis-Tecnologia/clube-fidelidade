"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Partner } from "@/types";
import { defaultPartner } from "@/mocks/partner";

interface PartnerState {
  partner: Partner;
  updatePartner: (partial: Partial<Partner>) => void;
  updateConfig: (partial: Partial<Partner["config"]>) => void;
  rotateToken: () => void;
}

function generateToken() {
  const segment = () =>
    Math.random().toString(16).slice(2, 10).padEnd(8, "0");
  return `fid_live_${segment()}${segment()}${segment()}${segment()}`;
}

export const usePartnerStore = create<PartnerState>()(
  persist(
    (set) => ({
      partner: defaultPartner,
      updatePartner: (partial) =>
        set((s) => ({ partner: { ...s.partner, ...partial } })),
      updateConfig: (partial) =>
        set((s) => ({
          partner: { ...s.partner, config: { ...s.partner.config, ...partial } },
        })),
      rotateToken: () => set((s) => ({ partner: { ...s.partner, erpToken: generateToken() } })),
    }),
    { name: "clube-fidelidade-partner" },
  ),
);
