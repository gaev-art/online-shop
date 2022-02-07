import React from 'react';
import {Navigate, Route, Routes, NavLink} from 'react-router-dom';

const pages = ['first', 'second'];

export const App = () => (
    <div>
        <div style={{
            height: "60px",
            boxShadow: '0 0 5px rgba(141, 23, 23, 0.5)',
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div>
                {pages.map((page) => (
                    <NavLink style={{textDecoration: 'none', margin: "0 50px 0 50px"}} key={page} to={page}>
                        {page}
                    </NavLink>
                ))}
            </div>
            <div style={{margin: "0 50px 0 50px"}}>
                <NavLink style={{textDecoration: 'none', marginRight: '20px'}} to={'/login'}>
                    Login
                </NavLink>
                <button onClick={() => alert('logout')}> Logout</button>
            </div>
        </div>
        <div style={{textAlign: 'center'}}>
            <Routes>
                <Route path="/" element={<h1>first page</h1>}/>
                <Route path="/second" element={<h1>second page</h1>}/>
                <Route path="/login" element={<h1>login page</h1>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    </div>
);

