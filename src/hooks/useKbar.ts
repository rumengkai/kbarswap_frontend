import { useContext } from 'react'
import { Context } from '../contexts/KbarProvider'

const useKbar = () => {
  const { kbar } = useContext(Context)
  return kbar
}

export default useKbar
