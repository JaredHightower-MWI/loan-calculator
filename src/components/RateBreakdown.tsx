import React from 'react'
import { Table, Accordion } from 'flowbite-react'
import { BiErrorAlt } from 'react-icons/bi'
import { useRecoilValue } from 'recoil'
import {
  addPPandRCAtom,
  loanBasedOnArvAtom,
  premiumRateAtom,
  purchasePriceAtom,
  purchasePricePercentageCoveredAtom,
  rehabCostAtom,
  rehabPercentageCoveredAtom,
  selectedRatesAtom,
} from '@/utils/atom'

interface RateBreakdownProps {
  selectedRates: string
}

export const RateBreakdown = ({ selectedRates }: RateBreakdownProps) => {
  const sumForPPandRC = useRecoilValue(addPPandRCAtom)
  const sumForARVAndLTV = useRecoilValue(loanBasedOnArvAtom)
  const premiumRates = useRecoilValue(premiumRateAtom)
  const coveredRehab = useRecoilValue(rehabPercentageCoveredAtom)

  const coveredPurchasePrice = useRecoilValue(
    purchasePricePercentageCoveredAtom
  )

  return (
    <>
      {selectedRates === 'standard' ? (
        <Accordion arrowIcon={BiErrorAlt}>
          <Accordion.Panel>
            <Accordion.Title>
              How is are standard rates calculated?
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                Purchase Price at 90% = {coveredPurchasePrice}
              </p>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                Rehab cost at 90% = {coveredRehab}
              </p>
              <p className='mb-2 text-gray-400 dark:text-gray-300'>
                Closing cost covered by borrower ~10%
              </p>
              <span className='mb-2 text-gray-500 dark:text-gray-400'>
                PP Covered + Rehab Covered = {sumForPPandRC}
                <br />
                <hr className='my-2 solid' />
              </span>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                ARV Loan To Value 65% = {sumForARVAndLTV}
              </p>
              <p className='mb-2 text-gray-400 dark:text-gray-300'>
                Loan amount will be the lesser of the two
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      ) : (
        <Accordion arrowIcon={BiErrorAlt}>
          <Accordion.Panel>
            <Accordion.Title>
              How is are standard rates calculated?
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                Purchase Price covered at 100%
              </p>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                Rehab cost at 100%
              </p>
              <span className='mb-2 text-gray-500 dark:text-gray-400'>
                Closing cost covered at 100%
                <br />
                <hr className='my-2 solid' />
              </span>
              <p className='mb-2 text-gray-500 dark:text-gray-400'>
                After Repair Value L.T.V 70% (Loan Amount) = {premiumRates}
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      )}
    </>
  )
}
