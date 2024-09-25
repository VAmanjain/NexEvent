import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface ProtectedProps {
    allowedRole: string;
  }

const Unprotected: React.FC<ProtectedProps> = ({allowedRole }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const navigator = useNavigate();

        useEffect(()=>{
            if (isAuthenticated) {
                // return <Navigate to="signup" replace />
                navigator('/home', { replace: true });
            }
        },[allowedRole, navigator])

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Unprotected
