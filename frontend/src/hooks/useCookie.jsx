export const useCookie = () => {
  const getCookies = () => {
    const allCookies = document.cookie.split('; ')
    const cookies = {}

    if (allCookies) {
      allCookies.forEach((cookie) => {
        const key = cookie.split('=')[0]
        const values = cookie.split('=')[1]
        cookies[key] = JSON.parse(decodeURIComponent(values).replace(/^j:/, ''))
      })

      return cookies
    }

    return null
  }

  return { getCookies }
}
