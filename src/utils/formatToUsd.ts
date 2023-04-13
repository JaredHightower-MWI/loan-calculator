export const convertToUsd = (value: number) => {
  const formatOption = { style: 'currency', currency: 'USD' }
  const formattedValueToUsd = new Intl.NumberFormat(
    'en-US',
    formatOption
  ).format(value)
  return formattedValueToUsd
}
