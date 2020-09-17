import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSoju from './useSoju'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getSommelierContract } from '../soju/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      SommelierContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, SommelierContract, lpContract])

  useEffect(() => {
    if (account && SommelierContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, SommelierContract, lpContract])

  return allowance
}

export default useAllowance
