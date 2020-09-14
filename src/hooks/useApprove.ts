import { useCallback } from 'react'

import useKbar from './useKbar'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getSommelierContract } from '../kbar/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kbar = useKbar()
  const SommelierContract = getSommelierContract(kbar)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, SommelierContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, SommelierContract])

  return { onApprove: handleApprove }
}

export default useApprove
