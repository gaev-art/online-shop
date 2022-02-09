
import { Dispatch } from 'redux'
import { authApi, LoginType } from '../api/api'
import { InferActionTypes } from './store'



const SET_TOKEN = 'SET_TOKEN'




const initialState = {
  isAuth: false,


}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        isAuth: !!action.token,

      }
    }
    default:
      return state
  }
}

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
  setToken: (token: string) => {
    return {
      type: SET_TOKEN,
      token
    } as const
  },

}


export const getToken = () => async (dispatch: Dispatch<ActionsType>) => {
  let data = await authApi.me()
  localStorage.setItem('token', data.data.token)
  dispatch(actions.setToken(data.data.token))
}
export const login = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
  let res = await authApi.login(data)
  localStorage.setItem('token', res.data.token)
  dispatch(actions.setToken(res.data.token))

}

