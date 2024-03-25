import Cookies from 'js-cookie'

const getCookieValue = (cookieName: string): string | undefined => {
  return Cookies.get(cookieName)
}

export const cookieService = {
  getCookieValue,
}
