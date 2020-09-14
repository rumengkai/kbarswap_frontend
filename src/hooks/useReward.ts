import { useCallback } from 'react'

import useKbar from './useKbar'
import { useWallet } from 'use-wallet'

import { harvest, getSommelierContract } from '../kbar/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const kbar = useKbar()
  const SommelierContract = getSommelierContract(kbar)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(SommelierContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, kbar])

  return { onReward: handleReward }
}

export default useReward
