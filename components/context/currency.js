import * as React from 'react'

const CurrencyContext = React.createContext()

function CurrencyProvider({ children, defaultCurrency }) {
  if (!defaultCurrency) throw new Error('A `defaultCurrency` must be provided')

  const [activeCurrency, setActiveCurrency] = React.useState(defaultCurrency)

  const switchCurrency = (currency) => setActiveCurrency(currency)

  return (
    <CurrencyContext.Provider value={{ activeCurrency, switchCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrencyContext = () => {
  const context = React.useContext(CurrencyContext)

  if (!context)
    throw new Error('useCurrencyContext must be used within an AuthProvider')

  return context
}

export { CurrencyProvider }
