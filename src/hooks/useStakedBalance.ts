import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getSommelierContract } from '../kbar/utils'
import useKbar from './useKbar'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const kbar = useKbar()
  const SommelierContract = getSommelierContract(kbar)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(SommelierContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, kbar])

  useEffect(() => {
    if (account && kbar) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, kbar])

  return balance
}

export default useStakedBalance
