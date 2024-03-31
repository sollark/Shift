import { accountService } from '@/service/account.service'
import { authService } from '@/service/auth.service'
import SecondaryButton from '@/ui/button/SecondaryButton'
import React from 'react'

const OneClickSignIn: React.FC = () => {
  // const navigate = useNavigate()

  const handleSignIn = async (role: string) => {
    switch (role) {
      case 'user':
        await authService.signIn('user@test.com', 'userpass@')
        break
      case 'admin':
        await authService.signIn('admin@test.com', 'adminpass@')
        break
      default:
        break
    }

    // Fetch account and save it to the store
    await accountService.getAccount()

    // Navigate to next page
    // const isAccountComplete = accountSelector.isComplete(
    //   useAccountStore.getState()
    // )
    // if (isAccountComplete) navigate({ to: '/' })
    // else navigate({ to: '/account/edit' })
  }

  return (
    <div style={{ display: 'flex' }}>
      <SecondaryButton onClick={() => handleSignIn('user')}>
        Sign in as User
      </SecondaryButton>
      <SecondaryButton onClick={() => handleSignIn('admin')}>
        Sign in as Admin
      </SecondaryButton>
    </div>
  )
}

export default OneClickSignIn
