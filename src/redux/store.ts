import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { authReducer } from './authReducer';


const rootReducer = combineReducers({
  auth: authReducer,
});


export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));