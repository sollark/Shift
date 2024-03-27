import { createContext, ReactNode } from 'react'

type MultistepFormContextProps = {
  children: ReactNode
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export type MultistepFormContextValue = {
  children: ReactNode
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export const MultistepFormContext = createContext<
  MultistepFormContextValue | undefined
>(undefined)

export const MultistepFormProvider = ({
  children,
  goToNextStep,
  goToPreviousStep,
}: MultistepFormContextProps) => {
  const contextValue: MultistepFormContextValue = {
    children,
    goToNextStep,
    goToPreviousStep,
  }

  return (
    <MultistepFormContext.Provider value={contextValue}>
      {children}
    </MultistepFormContext.Provider>
  )
}
