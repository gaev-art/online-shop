import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Header.module.css'

const pages = ['first', 'second'];

type PropsType = {
    isAuth: boolean
}

export const Header = (props: PropsType) => {
    return (
        <div className={style.container}>
            <div style={{margin: "0 50px 0 50px"}}>
                {pages.map((page) => (
                    <NavLink style={{textDecoration: 'none', marginRight: '20px'}} key={page} to={page}>
                        {page}
                    </NavLink>
                ))}
            </div>
            <div style={{margin: "0 50px 0 50px"}}>
                {!props.isAuth
                    ?
                    <NavLink style={{textDecoration: 'none', marginRight: '20px'}} to={'/login'}>
                        Login
                    </NavLink>
                    :
                    <img style={{height: '25px', margin: "0 50px 0 50px"}}
                         src="https://e7.pngegg.com/pngimages/789/654/png-clipart-emoticon-smiley-emoji-smiley-miscellaneous-face-thumbnail.png"
                         alt=""/>
                }
                <button onClick={() => alert('Logout')}>Logout</button>
            </div>
        </div>
    );
};