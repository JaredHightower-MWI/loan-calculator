export const premiumRates = (arv: number) => {
  const LOAN_TO_VALUE = 0.7

  const loanAmount = arv * LOAN_TO_VALUE

  const formatOption = { style: 'currency', currency: 'USD' }
  const formattedLoanAmount = new Intl.NumberFormat(
    'en-US',
    formatOption
  ).format(loanAmount)

  return formattedLoanAmount
}
