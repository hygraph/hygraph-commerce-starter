import * as React from 'react'

import { currencies } from 'graphcms.config'
import useLocalStorage from '@/hooks/use-local-storage'

const SettingsContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SWITCH_CURRENCY':
      return { ...state, activeCurrency: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function SettingsProvider({ children }) {
  const [savedSettings, saveSettings] = useLocalStorage(
    'graphcms-commerce-reference',
    {
      activeCurrency: currencies.find((currency) => Boolean(currency.default))
    }
  )
  const [state, dispatch] = React.useReducer(reducer, savedSettings)
  const [hasMounted, setHasMounted] = React.useState(false)

  const switchCurrency = (currency) =>
    dispatch({ type: 'SWITCH_CURRENCY', payload: currency })

  React.useEffect(() => {
    saveSettings(state)
  }, [state, saveSettings])

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  return (
    <SettingsContext.Provider
      value={{
        ...state,
        switchCurrency
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

const useSettingsContext = () => {
  const context = React.useContext(SettingsContext)

  if (!context)
    throw new Error('useSettingsContext must be used within a SettingsProvider')

  return context
}

export { SettingsProvider, useSettingsContext }
