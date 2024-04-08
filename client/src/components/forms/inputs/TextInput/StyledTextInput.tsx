import { TextField, TextFieldProps, styled } from '@mui/material'

const StyledTextInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: '1rem 0',
  '& label': {
    color: theme.palette.neutral.dark,
  },
  // input label when focused
  '& label.Mui-focused': {
    color: theme.palette.primary.divider,
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.divider,
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: theme.palette.primary.divider,
  },
  // Root class for the outlined input field
  '& .MuiOutlinedInput-root': {
    // Border around the input field
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.divider,
      borderWidth: '2px',
    },
  },
}))

export default StyledTextInput
