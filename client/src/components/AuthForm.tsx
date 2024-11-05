import React, { useState } from "react";
import { Login } from "./component/Login";
import { Register } from "./component/Register";


const AuthForm: React.FC = () => {
  const [isExist, setIsExist] = useState<Boolean>(true);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {isExist ? <Login /> : <Register />}

      {isExist ? (
        <>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?
            <span className="underline" onClick={() => setIsExist(false)}>
              Register
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?
            <span className="underline" onClick={() => setIsExist(true)}>
              Login
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
