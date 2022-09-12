import { createContext, useState } from 'react'
export const EmailContext = createContext({
  mainEmail: null,
  setMainEmail: () => null,
})
export const EmailProvider = ({ children }) => {
  const [mainEmail, setMainEmail] = useState(null)
  const value = { mainEmail, setMainEmail }

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
}
