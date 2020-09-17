import { useCallback } from 'react'

import useSoju from './useSoju'
import { useWallet } from 'use-wallet'

import { stake, getSommelierContract } from '../soju/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const soju = useSoju()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getSommelierContract(soju),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, soju],
  )
  return { onStake: handleStake }
}

export default useStake
