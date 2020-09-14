import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSommelierContract } from '../kbar/utils'
import useKbar from './useKbar'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const kbar = useKbar()
  const SommelierContract = getSommelierContract(kbar)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(SommelierContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, SommelierContract, kbar])

  useEffect(() => {
    if (account && SommelierContract && kbar) {
      fetchBalance()
    }
  }, [account, block, SommelierContract, setBalance, kbar])

  return balance
}

export default useEarnings
