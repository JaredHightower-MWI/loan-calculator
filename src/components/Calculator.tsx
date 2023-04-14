import React, { useState } from 'react'
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
  const [onchangeInput1, setOnchangeInput1] = useState('')
  const [onchangeInput2, setOnchangeInput2] = useState('')
  const [onchangeInput3, setOnchangeInput3] = useState('')

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

    const purchasePrice: number = purchasePriceRef.current?.valueAsNumber!
    const rehabCost: number = rehabCostRef.current?.valueAsNumber!
    const arv: number = arvRef.current?.valueAsNumber!

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

  const removeDecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/\W(.\d+)/g)
    const cleanInput = e.target.valueAsNumber.toString().replace(regex, '')
    return cleanInput
  }

  return (
    <div className='flex justify-center w-full'>
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
            value={onchangeInput1}
            icon={BiPurchaseTagAlt}
            placeholder='Purchase Price'
            onWheelCapture={(e) => e.currentTarget.blur()}
            onChange={(e) => setOnchangeInput1(removeDecimal(e))}
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
            value={onchangeInput2}
            placeholder='Rehab Cost'
            onWheelCapture={(e) => e.currentTarget.blur()}
            onChange={(e) => setOnchangeInput2(removeDecimal(e))}
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
            value={onchangeInput3}
            placeholder='After Repair Value'
            onWheelCapture={(e) => e.currentTarget.blur()}
            onChange={(e) => setOnchangeInput3(removeDecimal(e))}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}
