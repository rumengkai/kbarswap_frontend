import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Soju } from '../../soju'

export interface SojuContext {
  soju?: typeof Soju
}

export const Context = createContext<SojuContext>({
  soju: undefined,
})

declare global {
  interface Window {
    sojusauce: any
  }
}

const SojuProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [soju, setSoju] = useState<any>()

  // @ts-ignore
  window.soju = soju
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const sojuLib = new Soju(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setSoju(sojuLib)
      window.sojusauce = sojuLib
    }
  }, [ethereum])

  return <Context.Provider value={{ soju }}>{children}</Context.Provider>
}

export default SojuProvider
