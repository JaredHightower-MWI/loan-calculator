import { Table, Accordion, Tabs } from 'flowbite-react'
import React from 'react'
import { RatesAndTermsButton } from './RatesAndTermsButton'
import { useRecoilValue } from 'recoil'
import {
  purchasePriceAtom,
  purchasePricePercentageCoveredAtom,
  regularRateAtom,
  rehabCostAtom,
  rehabPercentageCoveredAtom,
  selectedRatesAtom,
  premiumRateAtom,
} from '../utils/atom'
import { RateBreakdown } from './RateBreakdown'
import { DealOrNoDeal } from './DealOrNoDeal'

export const ResultsTables = () => {
  const originalPP = useRecoilValue(purchasePriceAtom)
  const originalRC = useRecoilValue(rehabCostAtom)
  const selectedRate = useRecoilValue(selectedRatesAtom)
  const coveredRehab = useRecoilValue(rehabPercentageCoveredAtom)
  const premiumRates = useRecoilValue(premiumRateAtom)
  const loanToValueAmount = useRecoilValue(regularRateAtom)

  const coveredPurchasePrice = useRecoilValue(
    purchasePricePercentageCoveredAtom
  )

  const percentageCovered = (selected: string) => {
    if (selected == '') return ''

    if (selectedRate == 'standard') {
      return '90%'
    }
    return '100%'
  }

  const ltvPercentage = (selected: string) => {
    if (selected == '') return ''

    if (selectedRate == 'standard') {
      return '65%'
    }
    return '70%'
  }

  const displayPercentageRates = percentageCovered(selectedRate)
  const displayLtvPercentage = ltvPercentage(selectedRate)

  return (
    <div className='mt-10'>
      <Tabs.Group
        aria-label='Tabs with underline'
        style='underline'
        className='flex justify-evenly'
      >
        <Tabs.Item title='10% Rule'>
          <DealOrNoDeal />
        </Tabs.Item>
        <Tabs.Item active={true} title='Acquisition Rates'>
          <div className='flex flex-row my-10 justify-evenly'>
            <RatesAndTermsButton selectedRates='standard' />
            <RatesAndTermsButton selectedRates='premium' />
          </div>
          <Table striped={true}>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Purchase Price
                </Table.Cell>
                <Table.Cell>{displayPercentageRates}</Table.Cell>
                <Table.Cell>
                  {selectedRate == 'standard'
                    ? coveredPurchasePrice
                    : originalPP}
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  Rehab
                </Table.Cell>
                <Table.Cell>{displayPercentageRates}</Table.Cell>
                <Table.Cell>
                  {selectedRate == 'standard' ? coveredRehab : originalRC}
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  ARV Loan To Value (loan amount)
                </Table.Cell>
                <Table.Cell>{displayLtvPercentage}</Table.Cell>
                <Table.Cell>
                  {selectedRate == 'standard'
                    ? loanToValueAmount
                    : premiumRates}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div className='my-6'>
            {loanToValueAmount !== '' && (
              <RateBreakdown selectedRates={selectedRate} />
            )}
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  )
}
