import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useKbar from '../../hooks/useKbar'

import { bnToDec } from '../../utils'
import { getSommelierContract, getEarned } from '../../kbar/utils'
import { getFarms } from '../../kbar/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const kbar = useKbar()
  const { account } = useWallet()

  const farms = getFarms(kbar)

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
