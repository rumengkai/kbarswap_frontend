import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSommelierContract, getFarms } from '../soju/utils'
import useSoju from './useSoju'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const soju = useSoju()
  const farms = getFarms(soju)
  const SommelierContract = getSommelierContract(soju)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(SommelierContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, SommelierContract, soju])

  useEffect(() => {
    if (account && SommelierContract && soju) {
      fetchAllBalances()
    }
  }, [account, block, SommelierContract, setBalance, soju])

  return balances
}

export default useAllEarnings
