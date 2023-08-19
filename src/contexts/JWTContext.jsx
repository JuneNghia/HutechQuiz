import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

import { ACCOUNT_INITIALISE, LOGIN, LOGOUT } from '../store/actions'
import RouteLoader from '../components/Loader/RouteLoader'
import AuthService from '../services/auth.service'
import accountReducer from '../store/accountReducer'
import UserService from '../services/user.service'

const initialState = {
  isLoggedIn: false,
  isInitialised: false,
  user: null
}

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false
  }
  const decoded = jwtDecode(serviceToken)
  return decoded.iat > Date.now() / 1000
}

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken)
  } else {
    localStorage.removeItem('serviceToken')
  }
}

const JWTContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {}
})

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState)

  const login = async (phoneOrEmail, password) => {
    const response = await AuthService.login(phoneOrEmail, password)
    const { access_token, user } = response.data.data
    setSession(access_token)
    dispatch({
      type: LOGIN,
      payload: {
        user: user
      }
    })
  }

  const logout = () => {
    setSession(null)
    dispatch({ type: LOGOUT })
  }

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = await window.localStorage.getItem('serviceToken')
        if (serviceToken) {
          setSession(serviceToken)
          const response = await UserService.getMe()
          const { data } = response.data
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: true,
              user: data
            }
          })
        } else {
          dispatch({
            type: ACCOUNT_INITIALISE,
            payload: {
              isLoggedIn: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.log(err)
        dispatch({
          type: ACCOUNT_INITIALISE,
          payload: {
            isLoggedIn: false,
            user: null
          }
        })
      }
    }

    init()
  }, [])

  if (!state.isInitialised) {
    return <RouteLoader />
  }

  return <JWTContext.Provider value={{ ...state, login, logout }}>{children}</JWTContext.Provider>
}

export default JWTContext
