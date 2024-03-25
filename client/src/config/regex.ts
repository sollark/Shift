const USER_NAME = /^[a-zA-Z0-9-_]{3,24}$/
const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/
const PHONE_NUMBER_IL = /^\d{3}-?\d{7}$/

export const REGEX = {
  USER_NAME,
  PASSWORD,
  PHONE_NUMBER_IL,
}
