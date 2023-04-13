import React from 'react'
import { BiPurchaseTagAlt, BiWrench, BiHomeSmile } from 'react-icons/bi'
import { Button, Label, TextInput } from 'flowbite-react'
import { percentCovered, regularRates } from '@/utils/regularRates'
import { premiumRates } from '@/utils/premiumRates'
import { useSetRecoilState } from 'recoil'
import {
  premiumRateAtom,
  regularRateAtom,
  addPPandRCAtom,
  loanBasedOnArvAtom,
  purchasePriceAtom,
  rehabCostAtom,
  rehabPercentageCoveredAtom,
  purchasePricePercentageCoveredAtom,
  arvAtom,
} from '../utils/atom'
import { convertToUsd } from '@/utils/formatToUsd'

export const Calculator = () => {
  const setPurchasePrice = useSetRecoilState(purchasePriceAtom)
  const setRehabCost = useSetRecoilState(rehabCostAtom)
  const setArv = useSetRecoilState(arvAtom)

  const setSumForPPandRC = useSetRecoilState(addPPandRCAtom)
  const setSumForArvLtv = useSetRecoilState(loanBasedOnArvAtom)

  const setRegularRateLoanAmount = useSetRecoilState(regularRateAtom)
  const setPremiumRateLoanAmount = useSetRecoilState(premiumRateAtom)

  const setRCPercentCovered = useSetRecoilState(rehabPercentageCoveredAtom)
  const setPPPercentCovered = useSetRecoilState(
    purchasePricePercentageCoveredAtom
  )

  const purchasePriceRef = React.useRef<HTMLInputElement>(null)
  const rehabCostRef = React.useRef<HTMLInputElement>(null)
  const arvRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const purchasePrice = purchasePriceRef.current?.valueAsNumber
    const rehabCost = rehabCostRef.current?.valueAsNumber
    const arv = arvRef.current?.valueAsNumber

    if (purchasePrice && rehabCost && arv) {
      const [
        purchasePriceCovered,
        rehabCostCovered,
        addedPPandRC,
        loanBasedOnArv,
      ] = percentCovered(purchasePrice, rehabCost, arv)

      const standardLoanAmount = regularRates(purchasePrice, rehabCost, arv)
      const premiumLoanAmount = premiumRates(arv)

      const formattedPP = convertToUsd(purchasePrice)
      const formattedRC = convertToUsd(rehabCost)
      const formattedARV = convertToUsd(arv)

      setPurchasePrice(formattedPP)
      setRehabCost(formattedRC)
      setArv(formattedARV)

      setSumForPPandRC(addedPPandRC)
      setSumForArvLtv(loanBasedOnArv)

      setPPPercentCovered(purchasePriceCovered)
      setRCPercentCovered(rehabCostCovered)

      setRegularRateLoanAmount(standardLoanAmount!)
      setPremiumRateLoanAmount(premiumLoanAmount)
    }
    return
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <div className='block mb-2'>
          <Label htmlFor='purchasePrice' value='Purchase Price' />
        </div>
        <TextInput
          id='purchasePrice'
          type='number'
          required={true}
          ref={purchasePriceRef}
          icon={BiPurchaseTagAlt}
          placeholder='Purchase Price'
        />
      </div>
      <div>
        <div className='block mb-2'>
          <Label htmlFor='rehab' value='Rehab' />
        </div>
        <TextInput
          id='rehab'
          type='number'
          required={true}
          icon={BiWrench}
          ref={rehabCostRef}
          placeholder='Rehab Cost'
        />
      </div>
      <div>
        <div className='block mb-2'>
          <Label htmlFor='arv' value='After Repair Value' />
        </div>
        <TextInput
          id='arv'
          type='number'
          ref={arvRef}
          required={true}
          icon={BiHomeSmile}
          placeholder='After Repair Value'
        />
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  )
}
