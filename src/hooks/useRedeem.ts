import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../kbar/utils'

const useRedeem = (SommelierContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(SommelierContract, account)
    console.log(txHash)
    return txHash
  }, [account, SommelierContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
