import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./components/login/Login";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./redux/store";
import {actions, getToken} from "./redux/authReducer";
import {Header} from "./components/Header/Header";


export const App = () => {
    const dispatch = useDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getToken())
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(actions.setToken(token))
        }

    }, [])
    return (
        <div>
            <Header isAuth={isAuth}/>
            <div style={{textAlign: 'center'}}>
                <Routes>
                    <Route path="/" element={<h1>first page</h1>}/>
                    <Route path="/second" element={<h1>second page</h1>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
        </div>
    )
}

