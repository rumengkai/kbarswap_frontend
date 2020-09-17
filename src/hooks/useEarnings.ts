import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSommelierContract } from '../soju/utils'
import useSoju from './useSoju'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(SommelierContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, SommelierContract, soju])

  useEffect(() => {
    if (account && SommelierContract && soju) {
      fetchBalance()
    }
  }, [account, block, SommelierContract, setBalance, soju])

  return balance
}

export default useEarnings
