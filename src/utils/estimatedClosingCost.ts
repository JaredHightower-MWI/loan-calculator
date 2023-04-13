export const estimatedClosingCost = (
  purchasePrice: number,
  rehab: number,
  arv: number
) => {
  /* Step One */
  const stepOne = purchasePrice + rehab + arv
  console.log({ stepOne })

  /* Step Two */
  const estimatedCloseAndSellCost = stepOne * 0.1
  console.log({ estimatedCloseAndSellCost })

  return estimatedCloseAndSellCost
}
