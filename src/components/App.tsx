import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../redux/store';
import style from './App.module.css';
import {Header} from './Header';
import {Login} from './Login';

export const App = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return (
    <div>
      <Header isAuth={isAuth} />
      <div className={style.contents}>
        <Routes>
          <Route path="/first" element={<h1>first page</h1>} />
          <Route path="/second" element={<h1>second page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/first" />} />
        </Routes>
      </div>
    </div>
  );
};
