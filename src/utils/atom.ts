import { atom } from 'recoil'

export const purchasePriceAtom = atom({
  key: 'purchasePrice',
  default: '',
})
export const purchasePricePercentageCoveredAtom = atom({
  key: 'purchasePricePercentageCovered',
  default: '',
})

export const rehabCostAtom = atom({
  key: 'rehabCost',
  default: '',
})

export const rehabPercentageCoveredAtom = atom({
  key: 'rehabPercentageCovered',
  default: '',
})

export const addPPandRCAtom = atom({
  key: 'addPPandRC',
  default: '',
})

export const loanBasedOnArvAtom = atom({
  key: 'loanBasedOnArv',
  default: '',
})

export const regularRateAtom = atom({
  key: 'regularRate',
  default: '',
})
export const premiumRateAtom = atom({
  key: 'premiumRate',
  default: '',
})

export const selectedRatesAtom = atom({
  key: 'selectedRates',
  default: 'standard',
})

export const arvAtom = atom({
  key: 'arv',
  default: '',
})
