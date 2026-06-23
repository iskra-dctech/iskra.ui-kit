import { useContext } from 'react'
import { IskraLocaleContext } from './IskraProvider.js'

export function useIskraLocale() {
  return useContext(IskraLocaleContext)
}
