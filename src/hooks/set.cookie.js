import Cookies from "js-cookie"

const setCookie = (cookiename, object) => {
  Cookies.set(cookiename, object, {
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}

export default setCookie