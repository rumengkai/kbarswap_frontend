import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Kbar } from '../../kbar'

export interface KbarContext {
  kbar?: typeof Kbar
}

export const Context = createContext<KbarContext>({
  kbar: undefined,
})

declare global {
  interface Window {
    kbarsauce: any
  }
}

const KbarProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [kbar, setKbar] = useState<any>()

  // @ts-ignore
  window.kbar = kbar
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const kbarLib = new Kbar(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setKbar(kbarLib)
      window.kbarsauce = kbarLib
    }
  }, [ethereum])

  return <Context.Provider value={{ kbar }}>{children}</Context.Provider>
}

export default KbarProvider
