export interface OwnershipCost {
  insurance: number;
  maintenance: number;
}

export const ownershipCosts: Record<number, OwnershipCost> = {
  1: {
    insurance: 40000,
    maintenance: 25000,
  },
  2: {
    insurance: 35000,
    maintenance: 20000,
  },
  3: {
    insurance: 30000,
    maintenance: 18000,
  },
  4: {
    insurance: 25000,
    maintenance: 15000,
  },
  5: {
    insurance: 18000,
    maintenance: 10000,
  },
  6: {
    insurance: 14000,
    maintenance: 8000,
  },
};
