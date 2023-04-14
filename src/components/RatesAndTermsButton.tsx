import { Button } from 'flowbite-react'
import React, { useCallback, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedRatesAtom } from '../utils/atom'

interface RatesAndTermsProps {
  selectedRates: string
}

export const RatesAndTermsButton = ({ selectedRates }: RatesAndTermsProps) => {
  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useRecoilState(selectedRatesAtom)

  const handleClick = useCallback(() => {
    setSelected(selectedRates)
    setIsActive(isActive)
  }, [isActive, selectedRates, setSelected])

  const standardActive = selected === 'standard' ? false : true
  const premiumActive = selected === 'premium' ? false : true

  return (
    <div>
      {selectedRates === 'standard' && (
        <Button
          className='w-20'
          size='md'
          outline={standardActive}
          onClick={handleClick}
        >
          {selectedRates}
        </Button>
      )}
      {selectedRates === 'premium' && (
        <Button
          className='w-20'
          size='md'
          outline={premiumActive}
          onClick={handleClick}
        >
          {selectedRates}
        </Button>
      )}
    </div>
  )
}
