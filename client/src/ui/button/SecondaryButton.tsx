import { Button, ButtonProps, styled } from '@mui/material'

const SecondaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '1rem 0',
  marginInlineEnd: '1rem',
  borderStyle: 'solid',
  borderColor: theme.palette.secondary.main,
  borderWidth: '2px',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

export default SecondaryButton

/* using href forces a page reload */
/* <SecondaryButton onClick={() => navigate({ to: '/account/edit' })}>Edit</SecondaryButton> */
