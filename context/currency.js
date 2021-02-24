import * as React from 'react'

const CurrencyContext = React.createContext()

function CurrencyProvider({ children, navigation }) {
  const defaultCurrency = navigation?.currencies?.find((currency) =>
    Boolean(currency.default)
  )

  const [activeCurrency, setActiveCurrency] = React.useState(defaultCurrency)

  React.useEffect(() => {
    setActiveCurrency(defaultCurrency)
  }, [navigation])

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
    throw new Error('useCurrencyContext must be used within a CurrencyProvider')

  return context
}

export { CurrencyProvider }
