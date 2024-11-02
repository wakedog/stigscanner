import { create } from 'zustand';
import { STIG, STIGCheck } from '../types';

interface Store {
  stigs: STIG[];
  checks: STIGCheck[];
  setStigs: (stigs: STIG[]) => void;
  setChecks: (checks: STIGCheck[]) => void;
  updateCheck: (checkId: string, updates: Partial<STIGCheck>) => void;
}

export const useStore = create<Store>((set) => ({
  stigs: [],
  checks: [],
  setStigs: (stigs) => set({ stigs }),
  setChecks: (checks) => set({ checks }),
  updateCheck: (checkId, updates) =>
    set((state) => ({
      checks: state.checks.map((check) =>
        check.id === checkId ? { ...check, ...updates } : check
      ),
    })),
}));