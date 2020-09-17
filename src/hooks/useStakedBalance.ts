import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getSommelierContract } from '../soju/utils'
import useSoju from './useSoju'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(SommelierContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, soju])

  useEffect(() => {
    if (account && soju) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, soju])

  return balance
}

export default useStakedBalance
