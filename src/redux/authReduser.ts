import {Dispatch} from 'redux'
import {InferActionTypes} from './store'

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

export const login = (data: any) => async (dispatch: Dispatch<ActionsType>) => {

}

