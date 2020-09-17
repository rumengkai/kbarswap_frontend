import { useCallback } from 'react'

import useSoju from './useSoju'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getSommelierContract } from '../soju/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const soju = useSoju()
  const SommelierContract = getSommelierContract(soju)

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
