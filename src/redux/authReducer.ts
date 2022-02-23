import { Dispatch } from 'redux'
import { authApi } from '../api/api'
import { InferActionTypes } from './store'


const SET_TOKEN = 'SET_TOKEN'


const initialState = {
    user: null as Object | null
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                user: action.user,
            }
        }
        default:
            return state
    }
}

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
    setUser: (user: object | null) => {
        return {
            type: SET_TOKEN,
            user
        } as const
    },

}


export const isAuth = () => async (dispatch: Dispatch<ActionsType>) => {
    const user = await authApi.me()
    user ? dispatch(actions.setUser(user)) : dispatch(actions.setUser(null))
}
export const login = () => async (dispatch: Dispatch<ActionsType>) => {
    const user = await authApi.login()
    user ? dispatch(actions.setUser(user)) : dispatch(actions.setUser(null))
}
export const logout = () => async (dispatch: Dispatch<ActionsType>) => {
    await authApi.logout()
    dispatch(actions.setUser(null))
}

