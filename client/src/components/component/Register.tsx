import { Card } from "react-bootstrap"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {  register } from "../../services/api/auth/AuthService"

export  const Register:React.FC= ()=> {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>("");
  const navigator = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await register(email,username, password);
      console.log(data);
      navigator("/home", {replace:true})
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
    }
  };
  return (
    <Card className="rounded-xl mx-auto max-w-sm shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-black">Create a new account to get started with our platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 " onSubmit={handleRegister} >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}  />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label> 
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
      
    </Card>
  )
}