import { convertToUsd } from './formatToUsd'

const LOAN_TO_VALUE = 0.65
const COVERAGE_RATIO = 0.9

export const regularRates = (
  purchasePrice: number,
  rehab: number,
  arv: number
) => {
  const purchasePriceCovered = purchasePrice * COVERAGE_RATIO
  const rehabCostCovered = rehab * COVERAGE_RATIO
  const total = purchasePriceCovered + rehabCostCovered

  const loanAmount1 = total
  const loanAmount2 = arv * LOAN_TO_VALUE

  if (loanAmount1 < loanAmount2) {
    return convertToUsd(loanAmount1)
  }
  if (loanAmount2 < loanAmount1) {
    return convertToUsd(loanAmount2)
  }
}

export const percentCovered = (
  purchasePrice: number,
  rehab: number,
  arv: number
) => {
  const COVERAGE_RATIO = 0.9
  const purchasePriceCovered = purchasePrice * COVERAGE_RATIO
  const rehabCostCovered = rehab * COVERAGE_RATIO

  const addPPandRC = purchasePriceCovered + rehabCostCovered
  const loanBasedOnArv = arv * 0.65
  return [
    convertToUsd(purchasePriceCovered),
    convertToUsd(rehabCostCovered),
    convertToUsd(addPPandRC),
    convertToUsd(loanBasedOnArv),
  ]
}
