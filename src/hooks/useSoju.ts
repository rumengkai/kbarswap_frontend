import { useContext } from 'react'
import { Context } from '../contexts/SojuProvider'

const useSoju = () => {
  const { soju } = useContext(Context)
  return soju
}

export default useSoju
