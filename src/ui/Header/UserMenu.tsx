import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import style from './style.module.css';
import '../../index.css';
import setting from '../../images/settings.png';
import exit from '../../images/exit.png';

type PropsType = {
  user: any;
};

export const UserMenu: React.FC<PropsType> = ({user}) => {
  const history = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div onMouseLeave={() => setIsOpenMenu(false)}>
      <div
        className={style.userMenu}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <img src={user.photo} alt="" style={{height: '30px'}}/>
        <span style={{margin: '0 50px 0 10px'}}>
          {user.lastName}
          {user.firstName}
        </span>
      </div>
      <div className={isOpenMenu ? `${style.opened} opened` : 'closed'}>
        <ul>
          <li
            className="list-item"
            onClick={() => {
              history('settings');
              setIsOpenMenu(false);
            }}
          >
            <img style={{marginRight: '12px'}} src={setting} alt=""/>
            Settings
          </li>
          <li
            className="list-item"
            onClick={() => {
              setIsOpenMenu(false);
              window.open(
                `${process.env.REACT_APP_API_BASE_URL}/logout`,
                '_self'
              );
            }}
          >
            <img style={{marginRight: '12px'}} src={exit} alt=""/>
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};
