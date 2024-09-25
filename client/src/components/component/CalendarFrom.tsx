import { useEffect, useState } from "react";
import store from "../../redux/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { setAuthToken } from "../../services/api/axiosInstance";
import { getToken, getUser } from "../../services/api/auth/AuthService";
import { createCalendar } from "../../services/api/Calendar";


interface userInfo{
  id:number | undefined,
  username:string | undefined
}

export const CalendarFrom =()=> {

  const [calendarName, setCalendarName] = useState<string>("");
  const [user, setUser] = useState<userInfo>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await store.dispatch(getToken);
        setAuthToken(token);
  
        const user = await getUser();
        console.log("User:", user);
        setUser(user)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);


  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try {
      const data = createCalendar(calendarName,  user?.username, user?.id );
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="w-auto max-w-md">
      <CardHeader>
        <CardTitle>Create Calendar</CardTitle>
        <CardDescription>Enter a name for your new calendar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit} >
          <div className="space-y-2">
            <Label htmlFor="calendar-name">Calendar Name</Label>
            <Input id="calendar-name" type="text" placeholder="My Calendar" className="w-full"  value={calendarName} onChange={(e)=>setCalendarName(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Create Calendar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
