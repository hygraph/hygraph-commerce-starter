import * as React from 'react'

import { currencies } from 'graphcms.config'
import useLocalStorage from '@/hooks/use-local-storage'

const CurrencyContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SWITCH_CURRENCY':
      return { ...state, activeCurrency: action.payload }
    default:
      throw new Error('No action specified')
  }
}

function CurrencyProvider({ children }) {
  const [savedCurrency, saveCurrency] = useLocalStorage(
    'graphcms-commerce-reference',
    {
      activeCurrency: currencies.find((currency) => Boolean(currency.default))
    }
  )
  const [state, dispatch] = React.useReducer(reducer, savedCurrency)
  const [hasMounted, setHasMounted] = React.useState(false)

  const switchCurrency = (currency) =>
    dispatch({ type: 'SWITCH_CURRENCY', payload: currency })

  React.useEffect(() => {
    saveCurrency(state)
  }, [state, saveCurrency])

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <CurrencyContext.Provider
      value={{
        ...state,
        switchCurrency
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencyContext = () => {
  const context = React.useContext(CurrencyContext)

  if (!context)
    throw new Error('useCurrencyContext must be used within a CurrencyProvider')

  return context
}

export { CurrencyProvider }
