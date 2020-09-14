import { useCallback } from 'react'

import useKbar from './useKbar'
import { useWallet } from 'use-wallet'

import { unstake, getSommelierContract } from '../kbar/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const kbar = useKbar()
  const SommelierContract = getSommelierContract(kbar)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(SommelierContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, kbar],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
