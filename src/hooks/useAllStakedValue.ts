import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getSommelierContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../soju/utils'
import useSoju from './useSoju'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const soju = useSoju()
  const farms = getFarms(soju)
  const SommelierContract = getSommelierContract(soju)
  const wethContact = getWethContract(soju)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) => {
          return getTotalLPWethValue(
            SommelierContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          )
        },
      ),
    )
    setBalance(balances)
  }, [account, SommelierContract, soju])

  useEffect(() => {
    if (account && SommelierContract && soju) {
      fetchAllStakedValue()
    }
  }, [account, block, SommelierContract, setBalance, soju])

  return balances
}

export default useAllStakedValue
