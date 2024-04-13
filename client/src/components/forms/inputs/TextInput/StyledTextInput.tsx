import { TextField, TextFieldProps, styled } from '@mui/material'

const StyledTextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: '1rem 0',
  '& label': {
    color: theme.palette.neutral.dark,
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.neutral.dark,
  },
  // Border
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.divider,
    borderWidth: '2px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
}))

export default StyledTextInput
