import { arvAtom, purchasePriceAtom, rehabCostAtom } from '@/utils/atom'
import { convertToUsd } from '@/utils/formatToUsd'
import { Table } from 'flowbite-react'
import React from 'react'
import { useRecoilValue } from 'recoil'

const DESIREABLE_NET_PROFIT = 14000

export const DealOrNoDeal = () => {
  const originalPP = useRecoilValue(purchasePriceAtom)
  const originalRC = useRecoilValue(rehabCostAtom)
  const originalARV = useRecoilValue(arvAtom)

  const convertToNumber = (value: string) => {
    const removeDollarSign = value.replace('$', '')
    const removeCommas = removeDollarSign.replace(',', '')
    const convertToNumber = Number(removeCommas)
    return convertToNumber
  }

  const allInTotal =
    convertToNumber(originalPP) +
    convertToNumber(originalRC) +
    convertToNumber(originalARV)

  const escs = allInTotal * 0.1
  const etc = escs + convertToNumber(originalPP) + convertToNumber(originalRC)
  const netProfit = convertToNumber(originalARV) - etc
  const isAGoodDeal = netProfit >= DESIREABLE_NET_PROFIT

  const formattedAllInTotal = convertToUsd(allInTotal)
  const formattedEscs = convertToUsd(escs)
  const formattedEtc = convertToUsd(etc)
  const formattedNetProfits = convertToUsd(netProfit)

  return (
    <Table striped={true}>
      <Table.Head>
        <Table.HeadCell></Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y'>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            All In Total
          </Table.Cell>
          <Table.Cell> PP + R + ARV </Table.Cell>
          <Table.Cell>{formattedAllInTotal}</Table.Cell>
        </Table.Row>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            Estimated Closing and Selling Cost
          </Table.Cell>
          <Table.Cell>(All In Total) * 0.1 = ECSC</Table.Cell>
          <Table.Cell>{formattedEscs}</Table.Cell>
        </Table.Row>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            Estimated Total Cost
          </Table.Cell>
          <Table.Cell>ECSC + PP + R = ETC</Table.Cell>
          <Table.Cell>{formattedEtc}</Table.Cell>
        </Table.Row>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            Estimated Net Profit
          </Table.Cell>
          <Table.Cell>ARV - ETC = Estimated Net Profit</Table.Cell>
          <Table.Cell>{formattedNetProfits}</Table.Cell>
        </Table.Row>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            Is this a deal?
          </Table.Cell>
          <Table.Cell>A good deal is ENP of 14K or More</Table.Cell>
          <Table.Cell>{isAGoodDeal ? 'Yes' : 'No'}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
