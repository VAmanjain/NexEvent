import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api/auth/AuthService";



interface credentianls {
  token: string | null,
  expiresIn: number | null
}

type loginForm= {

}



export const Login:React.FC =()=> {


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<credentianls>();
  const navigator = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data);
      navigator("/home", {replace:true})
      setToken(data);
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  }; 


  return (
    <Card className="mx-auto max-w-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>Enter your email and password to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin} >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required   value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required  value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
