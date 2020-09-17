import { useCallback } from 'react'

import useSoju from './useSoju'
import { useWallet } from 'use-wallet'

import { unstake, getSommelierContract } from '../soju/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(SommelierContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, soju],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
