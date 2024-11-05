import React, { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import store from '../redux/store';
import { getToken } from '../services/api/auth/AuthService';
import { setAuthToken } from '../services/api/axiosInstance';
import { checkAuth } from '../redux/slices/authSlice';
import { Nav } from './Nav';
import { NavBar } from './NavBar';

const NavRoot: React.FC = () => {


  const [auth, setAuth] = useState<boolean>(store.getState().auth.isAuthenticated);

  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setAuth(store.getState().auth.isAuthenticated);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
       {auth? <NavBar/>:<Nav/>}
        <Outlet/>
    </div>
  )
}

export default NavRoot