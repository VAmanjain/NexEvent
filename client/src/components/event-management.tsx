import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Users, CheckSquare, UserPlus, Download, RotateCcw, Search, MessageSquare, Share2, Edit, Calendar, Copy, X } from "lucide-react"
import { EventsDto } from "../services/interfaces/EventInterface.type"
import { UserProfileInfo1 } from "../services/interfaces/UserProfileInfo.type"
import store from "../redux/store"
import { getEvent } from "../services/api/EventService"
import { getToken, getUser } from "../services/api/auth/AuthService"
import axiosInstance, { setAuthToken } from "../services/api/axiosInstance"
import { getUserProfile } from "../services/api/UserProfile"
import { CreateGuest, getGuestsByEventId } from "../services/api/GuestService"
import { Guest } from "../services/interfaces/Guest.type"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Textarea } from "./ui/textarea"

interface EventManagementProps {
  id:   string  |undefined;
}

export const EventManagement: React.FC<EventManagementProps> = ({ id }) =>{

  const [emails, setEmails] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [emailList, setEmailList] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false)
  const [formData, setFormData] = useState<EventsDto | null | any>();
  const [userProfile, setUserProfile] = useState<UserProfileInfo1 | null | any>();
  const [user, setUser] = useState({
    id: NaN,
    fullName: "",
    email: "",
  });

  const [guest, setGuest] = useState<Guest>({
    name: "",
    guestId: NaN,
    eventId: NaN,
    emails: "",
    status: "",
    guestCode:""
  });

  const [guests, setGuests] = useState<Guest[]>([]);
// State for filtering and searching guests
const [filterStatus, setFilterStatus] = useState<string>('all');
const [searchTerm, setSearchTerm] = useState<string>('');


const EnterInEvent = async () => {
  if (formData) {
    const newGuest: Guest = {
      name: user.fullName,
      guestId: user.id,
      eventId: formData.id,
      emails: user.email,
      status: "Check In",
      guestCode:""
    };
    setGuest(newGuest);
    CreateGuest(newGuest);
    const guestsData = await getGuestsByEventId(id); // Fetch guests by event ID
    setGuests(guestsData);
    console.log("Guest state updated:", newGuest);
  } else {
    console.error("formData is not available.");
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await store.dispatch(getToken);
        setAuthToken(token);
        const data = await getEvent(id);
        const userInfo = await getUser();
        setUser(userInfo);
        setFormData(data);

        // Fetch user profile
        const userProfileInfo: UserProfileInfo1 = await getUserProfile(
          userInfo?.id
        );
        setUserProfile(userProfileInfo);

        // Fetch guests for this event
        const guestsData = await getGuestsByEventId(id); // Fetch guests by event ID
        setGuests(guestsData); // Set fetched guests in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const intervalId = setInterval(fetchUserData, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  },[])
  const [activeTab, setActiveTab] = useState("overview")
  const [customUrl, setCustomUrl] = useState("lu.ma/5kd5hfwo")

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "guests", label: "Guests" },
    { id: "more", label: "More" },
  ]
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!formData) return <div>Loading...</div>;

  const glassEffect = "bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 text-white hover:bg-opacity-20 transition-all duration-200"

  const filteredGuests = guests.filter(guest => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'going' && guest.status === 'Going') ||
      (filterStatus === 'notgoing' && guest.status !== 'Going');

    const matchesSearch =
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.emails.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.guestCode.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`http://localhost:5173/event/${formData?.id}`).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && emails.trim()) {
      const trimmedEmail = emails.trim();
      if (validateEmail(trimmedEmail) && !emailList.includes(trimmedEmail)) {
        setEmailList([...emailList, trimmedEmail]);
        console.log(emailList);
        
        setEmails(""); // Clear the input after adding
        setEmailError(""); // Clear any previous error
      } else if (!validateEmail(trimmedEmail) && trimmedEmail) {
        setEmailError(`Invalid email: ${trimmedEmail}`);
      }
      e.preventDefault(); // Prevent default action (like form submission)
    }
  };

  // const handleInvite = () => {
  //   if (emailList.length > 0) {
  //     console.log("Inviting:", emailList);
  //     // Here you would typically send the invitations
  //     setIsInviteDialogOpen(false);
  //     setEmailList([]); // Clear the list after sending invitations
  //   }
  // };

  // const removeEmail = (emailToRemove: string) => {
  //   setEmailList(emailList.filter(email => email !== emailToRemove));
  // }

  const sendInvitations = async (emailArray: string[]) => {
    const eventDate = new Date(formData.startingTime);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const mailDto = {
      to: emailArray,
      subject: "You're Invited to Our Event!",
      // message: `
      //   <h1>Welcome!</h1>
      //   <p>We are excited to invite you to our upcoming event. Here are the details:</p>
      //   <ul>
      //     <li><strong>Date:</strong> ${formattedDate}</li>
      //     <li><strong>Time:</strong> ${formattedTime}</li>
      //     <li><strong>Location:</strong> <a href="${formData.addressLink}" target="_blank">${formData.addressLink}</a></li>
      //   </ul>
      //   <p>We hope to see you there!</p>
      // `,
      message: `
            
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #333;">Welcome!</h1>
            <p style="line-height: 1.6; color: #555;">We are excited to invite you to our upcoming event. Here are the details:</p>
            <div style="background-color: #e7f3fe; border-left: 6px solid #2196F3; padding: 10px; margin-bottom: 20px;">
              <p style="color: #333;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="color: #333;"><strong>Time:</strong> ${formattedTime}</p>
              <p style="color: #333;"><strong>Location:</strong> <a href="${formData.addressLink}" target="_blank" style="color: #2196F3;">${formData.addressLink}</a></p>
            </div>
            <p style="line-height: 1.6; color: #555;">We hope to see you there!</p>
            <a href="${`http://localhost:5173/event/${formData?.id}`}" target="_blank" style="display:inline-block; padding:10px 20px; color:white; background-color:#2196F3; text-decoration:none; border-radius:5px;">View Event Details</a>
          </div>
          <div style="margin-top: 20px; font-size: 12px; color: #aaa;">
            <p>If you have any questions, feel free to contact us.</p>
          </div>
          `,
        
    
      time: Date.now(), // You can adjust this as needed
    };

    try {
      const response = await axiosInstance.post('/mail/sent', mailDto); // Adjust the URL based on your API configuration
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error sending invitations:", error); // Handle error response
    }
  };

  const handleInvite = () => {
    if (emailList.length > 0) {
      sendInvitations(emailList); // Call the function to send invitations
      setIsInviteDialogOpen(false);
      setEmailList([]); // Clear the list after sending invitations
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter(email => email !== emailToRemove));
  };

  return (
    <div className="min-h-screen bg-transparent bg-opacity-90 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">hanji</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`text-sm ${
                  activeTab === tab.id ? "text-white border-b-2 border-white" : "text-gray-400"
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* <Button variant="secondary" className={`flex items-center justify-center ${glassEffect}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Guests
              </Button> */}
              {/* <Button variant="secondary" className={`flex items-center justify-center ${glassEffect}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send a Post
              </Button> */}
              {/* <Button variant="secondary" className={`flex items-center justify-center ${glassEffect}`}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Event
              </Button> */}
              {/* <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Guests
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${glassEffect} text-white`}>
                  <DialogHeader>
                    <DialogTitle>Invite Guests</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm">Enter email addresses separated by commas:</p>
                    <Textarea
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      className={glassEffect}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    <Button onClick={handleInvite} className={glassEffect}>
                      Send Invitations
                    </Button>
                  </div>
                </DialogContent>
              </Dialog> */}

<Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Guests
        </Button>
      </DialogTrigger>
      <DialogContent className={`${glassEffect} text-white`}>
        <DialogHeader>
          <DialogTitle>Invite Guests</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm">Enter email addresses and press Enter:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {emailList.map((email) => (
              <div key={email} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                {email}
                <button onClick={() => removeEmail(email)} className="ml-2 text-red-200 hover:text-red-400">x</button>
              </div>
            ))}
          </div>
          <Textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type an email and press Enter"
            className={glassEffect}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <Button onClick={handleInvite} className={glassEffect}>
            Send Invitations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${glassEffect} text-white`}>
                  <DialogHeader>
                    <DialogTitle>Share Event</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <Input value={`http://localhost:5173/event/${formData?.id}`} readOnly className={glassEffect} />
                    <Button onClick={handleCopyUrl} className={glassEffect}>
                      {isCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

    
<Card className="bg-white bg-opacity-10 mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-start text-white ">
              <div>
                <h2 className="text-3xl font-bold mb-4">{formData.name}</h2>
                <span className="text-2xl font-bold mb-4">Timming</span>
                <p className="text-sm mb-2">{new Date(formData.startingTime).toLocaleDateString()}</p>
                <p className="text-sm mb-4">{formatTime(formData.startingTime)} - {formatTime(formData.endingTime)}</p>
                <p className="text-sm mb-4">Address: <a href={formData.addressLink} className="bg-white bg-opacity-10 mb-8 px-2 py-1 rounded-sm ">  {formData.addressLink}</a> </p>
                <p className="text-sm font-semibold">Description: <p className="font-normal"> {formData.desc} </p></p >
                {/* <p className="text-sm">Host(s): {formData.hosts.map(host => host.name).join(', ')}</p> */}
              </div>
              <img src={formData.image} alt={formData.name} className="rounded-lg w-[200px] " />
            </div>

            {/* Additional Event Details */}
            <div className="mt-6">
              <Button className={`w-full flex items-center justify-center bg-white bg-opacity-10`}>
                Edit Event
              </Button>
            </div>
          </CardContent>
        </Card>

            {/* <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-4">
                <Button variant="secondary" size="sm" className={glassEffect}>
                  Share Event
                </Button>
                <Button variant="secondary" size="sm" className={glassEffect}>
                  Edit Event
                </Button>
                <Button variant="secondary" size="sm" className={glassEffect}>
                  Change Photo
                </Button>
              </div>
            </div> */}

            <Card className={glassEffect}>
              <CardHeader>
                <CardTitle>Invites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">Invite subscribers, contacts and past guests via email or SMS.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <div>
                      <p className="font-semibold">No Invites Sent</p>
                      <p className="text-sm text-gray-300">You can invite subscribers, contacts and past guests to the event.</p>
                    </div>
                  </div>
                  <Button variant="outline" className={glassEffect}>Invite Guests</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="guests" className="mt-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">At a Glance</h2>
              <p className="text-green-500 mb-2">1 guest</p>
              <div className="w-full h-2 bg-green-500 rounded-full mb-2"></div>
              <p className="text-green-500">• 1 Going</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Guests
              </Button>
              <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
                <CheckSquare className="mr-2 h-4 w-4" />
                Check In Guests
              </Button>
              <Button variant="outline" className={`flex items-center justify-center ${glassEffect}`}>
                <Users className="mr-2 h-4 w-4" />
                Guest List
                <span className="text-xs ml-2">Shown to guests</span>
              </Button>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Guest List</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className={glassEffect}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className={glassEffect}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search" className={`pl-8 ${glassEffect}`} />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <Select>
                <SelectTrigger className={`w-[180px] ${glassEffect}`}>
                  <SelectValue placeholder="All Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guests</SelectItem>
                  <SelectItem value="going">Going</SelectItem>
                  <SelectItem value="notgoing">Not Going</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className={`w-[180px] ${glassEffect}`}>
                  <SelectValue placeholder="Register Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow className={glassEffect}>
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Register Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className={glassEffect}>
                  <TableCell className="font-medium">Aman Jain 2022pietraman002@poornima.org</TableCell>
                  <TableCell>
                    <span className="text-green-500">Going</span>
                  </TableCell>
                  <TableCell>This Minute</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent> */}
<TabsContent value="guests" className="mt-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">At a Glance</h2>
            <p className="text-green-500 mb-2">{filteredGuests.length} guest{filteredGuests.length !== 1 ? 's' : ''}</p>
            <div className="w-full h-2 bg-green-500 rounded-full mb-2"></div>
            <p className="text-green-500">• {filteredGuests.filter(guest => guest.status === 'Going' ||  guest.status === 'going' ).length} Going</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* <Button variant="secondary" className={`flex items-center justify-center`}>
              Invite Guests
            </Button> */}
             <Button variant="secondary" className={`flex items-center justify-center ${glassEffect}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Guests
              </Button>
            {/* <Button variant="secondary" className={`flex items-center justify-center`}>
              Check In Guests
            </Button> */}
            {/* <Button variant="secondary" className={`flex items-center justify-center`}>
              Guest List
              <span className="text-xs ml-2">Shown to guests</span>
            </Button> */}
          </div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Guest List</h2>
            {/* <div className="flex gap-2">
              <Button variant="outline" size="icon">
                Download Button
                Download
              </Button>
              <Button variant="outline" size="icon">
                Refresh Button
                Refresh
              </Button>
            </div> */}
          </div>
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-8 ${glassEffect} w-full px-2 py-2 rounded-md `}
              />
              {/* Add Search Icon if necessary */}
            </div>
          </div>
          {/* <div className="flex justify-between mb-4">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={`${glassEffect}`}>
              <option value="all">All Guests</option>
              <option value="going">Going</option>
              <option value="notgoing">Not Going</option>
            </select>
            Add additional filters if necessary
          </div> */}

          {/* Guest Table */}
          <Table className="rounded-sm">
            <TableHeader>
              <TableRow className={glassEffect}>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>emails</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.guestId} className={glassEffect}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>{guest.emails}</TableCell> 
                  {/* <TableCell>
                    
                  </TableCell> */}
                  {/* Action Button for Check In */}
                  {guest.status === 'Going' || guest.status === 'going' ? (
                    <TableCell>
                      <div className="flex justify-between items-center">
                      <span className="text-green-300  font-semibold">
                      {guest.status}  
                    </span>
                      <Button 
                        onClick={() => EnterInEvent(guest)} 
                        variant="outline"
                        className={`bg-green-500 text-white`}
                      >
                        Check In
                      </Button>
                      </div>
                     
                    </TableCell>):
                    <TableCell>
                      <span className="text-red-600 font-semibold">
                      {guest.status} : 
                    </span>
                     
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TabsContent>

          <TabsContent value="more" className="mt-6">
            <div className="space-y-8">
              {/* <Card className={glassEffect}>
                <CardHeader>
                  <CardTitle>Clone Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Create a new event with the same information as this one. Everything except the guest list and event tickets will be copied over.</p>
                  <Button className={glassEffect}>
                    <Copy className="mr-2 h-4 w-4" />
                    Clone Event
                  </Button>
                </CardContent>
              </Card> */}

              <Card className={glassEffect}>
                <CardHeader>
                  <CardTitle>Event Page</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">When you choose a new URL, the current one will no longer work. Do not change your URL if you have already shared the event.</p>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} className={glassEffect} />
                    <Button className={glassEffect}>Update</Button>
                  </div>
                  {/* <Button variant="outline" className={glassEffect}>
                    Learn More
                  </Button> */}
                </CardContent>
              </Card>

              {/* <Card className={glassEffect}>
                <CardHeader>
                  <CardTitle>Embed Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Have your own site? Embed the event to let visitors know about it.</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Button className={glassEffect}>
                      Embed as Button
                    </Button>
                    <Button className={glassEffect}>
                      Embed Event Page
                    </Button>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-md">
                    <p className="text-sm text-gray-300 mb-2">Paste the following HTML code snippet to your page:</p>
                    <code className="text-xs text-gray-400">
                      {`<iframe src="https://lu.ma/embed-checkout/evt-IXu7do9PreLK9bM" width="100%" height="800" frameborder="0" style="border: 1px solid #bfcbda88; border-radius: 4px;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`}
                    </code>
                  </div>
                </CardContent>
              </Card> */}

              {/* <Card className={glassEffect}>
                <CardHeader>
                  <CardTitle>Transfer Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">You can transfer the event to a calendar to grant its admins manage access to the event. Event proceeds will be paid out to the Stripe account connected to the calendar.</p>
                  <Button className={glassEffect}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Move to Calendar
                  </Button>
                </CardContent>
              </Card> */}

              <Card className={glassEffect}>
                <CardHeader>
                  <CardTitle>Cancel Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Cancel and permanently delete this event. This operation cannot be undone. If there are any registered guests, we will notify them that the event has been canceled.</p>
                  <Button variant="destructive" className={glassEffect}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* <Card className={`${glassEffect} mt-8`}>
          <CardHeader>
            <CardTitle>Event Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="background p-6 rounded-lg">
              <img src="/placeholder.svg?height=200&width=200" alt="Event" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-2xl font-bold mb-2">hanji</h2>
              <p className="text-sm mb-2">Hosted by Aman Jain</p>
              <div className="flex items-center mb-2">
                <span className="text-sm mr-2">Tuesday, September 17</span>
                <span className="text-sm">7:00 AM - 8:00 AM</span>
              </div>
              <p className="text-sm mb-4">To Be Announced</p>
              <div className="flex items-center justify-between">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">LIVE</span>
                <span className="text-sm font-semibold">You're In</span>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )

}