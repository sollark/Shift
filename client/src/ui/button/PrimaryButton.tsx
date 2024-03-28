import { Button, ButtonProps, styled } from '@mui/material'

const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '1rem 0',
  marginInlineEnd: '1rem',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
}))

export default PrimaryButton

/* using href forces a page reload */
/* <PrimaryButton onClick={() => navigate({ to: '/account/edit' })}>Edit</PrimaryButton> */
