import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSoju from '../../hooks/useSoju'

import { bnToDec } from '../../utils'
import { getSommelierContract, getEarned } from '../../soju/utils'
import { getFarms } from '../../soju/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const soju = useSoju()
  const { account } = useWallet()

  const farms = getFarms(soju)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
