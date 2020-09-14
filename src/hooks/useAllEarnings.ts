import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSommelierContract, getFarms } from '../kbar/utils'
import useKbar from './useKbar'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kbar = useKbar()
  const farms = getFarms(kbar)
  const SommelierContract = getSommelierContract(kbar)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(SommelierContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, SommelierContract, kbar])

  useEffect(() => {
    if (account && SommelierContract && kbar) {
      fetchAllBalances()
    }
  }, [account, block, SommelierContract, setBalance, kbar])

  return balances
}

export default useAllEarnings
