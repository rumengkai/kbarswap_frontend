import { useCallback } from 'react'

import useSoju from './useSoju'
import { useWallet } from 'use-wallet'

import { harvest, getSommelierContract } from '../soju/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(SommelierContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, soju])

  return { onReward: handleReward }
}

export default useReward
