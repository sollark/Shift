import { SnackbarProvider } from 'notistack'
import { FC, ReactNode } from 'react'

type NotificationsProviderProps = {
  children: ReactNode
}
const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  return (
    <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
      {children}
    </SnackbarProvider>
  )
}

export default NotificationsProvider
