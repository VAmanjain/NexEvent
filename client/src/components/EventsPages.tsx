// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "./ui/button";
// import { EventsDto } from "../services/interfaces/EventInterface.type";
// import { getEvent } from "../services/api/EventService";
// import store from "../redux/store";
// import { getToken, getUser } from "../services/api/auth/AuthService";
// import { setAuthToken } from "../services/api/axiosInstance";
// import { CalendarIcon, ImageIcon, Users } from "lucide-react";
// import { Guest } from "../services/interfaces/Guest.type";
// import { CreateGuest } from "../services/api/GuestService";
// import { getUserProfile } from "../services/api/UserProfile";
// import { UserProfileInfo1 } from "../services/interfaces/UserProfileInfo.type";

// const EventsPages: React.FC = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState<EventsDto | null | any>();
//   const [userProfile, setUserProfile] = useState<UserProfileInfo1 | null |any>();
//   const [user, setUser] = useState({
//     id: NaN,
//     fullName: "",
//     email: "",
//   });
//   const [guest, setGuest] = useState<Guest>({
//     name: "",
//     guestId: NaN, // Replace with an actual UserProfile ID
//     eventId: NaN, // Replace with an actual Event ID
//     emails: "",
//     status:""
//   });

//   // const [ userProfile, setUserProfile] = useState<UserProfileInfo1>({
//   //   id:NaN,
//   //   username:"",
//   // });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = await store.dispatch(getToken);
//         setAuthToken(token);
//         console.log(token);
//         const data = await getEvent(id);
//         console.log("Data:", data);
//         const userInfo = await getUser();
//         console.log(userInfo);
//         setUser(userInfo);
//         setFormData(data);
//         const userProfileInfo:UserProfileInfo1 = await getUserProfile(userInfo?.id);
//         setUserProfile(userProfileInfo)
//         console.log(userProfile);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();

//     const intervalId = setInterval(fetchUserData, 60000); // Fetch every 60 seconds

//     return () => clearInterval(intervalId);
//   }, [id]);

//   const EnterInEvent = async() => {
//     if (formData) {
//       // Update guest state
//       const newGuest: Guest = {
//         name: user.fullName,
//         guestId: user.id,
//         eventId: formData.id, // Assuming formData has an id property
//         emails: user.email,
//         status:"going",
//       };
//       setGuest(newGuest);
//       CreateGuest(newGuest);
//       console.log("Guest state updated:", newGuest);

//     } else {
//       console.error("formData is not available.");
//     }
//   };

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { EventsDto } from "../services/interfaces/EventInterface.type";
import { getEvent } from "../services/api/EventService";
import store from "../redux/store";
import { getToken, getUser } from "../services/api/auth/AuthService";
import { setAuthToken } from "../services/api/axiosInstance";
import { CalendarIcon, ImageIcon, MoveUpRight, Users } from "lucide-react";
import { Guest } from "../services/interfaces/Guest.type";
import { CreateGuest, getGuestsByEventId } from "../services/api/GuestService"; // Adjust import as necessary
import { getUserProfile } from "../services/api/UserProfile";
import { UserProfileInfo1 } from "../services/interfaces/UserProfileInfo.type";
import { Link } from "react-router-dom";

const EventsPages: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<EventsDto | null | any>();
  const [userProfile, setUserProfile] = useState<
    UserProfileInfo1 | null | any
  >();
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
    status: "going",
    guestCode:""
  });

  const [guests, setGuests] = useState<Guest[]>([]); // State to hold guest data

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

    const intervalId = setInterval(fetchUserData, 10000); // Fetch every 60 seconds

    return () => clearInterval(intervalId);
  }, [id]);

  // const EnterInEvent = async () => {
  //   if (formData) {
  //     const newGuest: Guest = {
  //       name: user.fullName,
  //       guestId: user.id,
  //       eventId: formData.id,
  //       emails: user.email,
  //       status: "going",
  //       guestCode:""
  //     };
  //     setGuest(newGuest);
  //     const guests = await CreateGuest(newGuest);
  //     console.log("Guest state updated:", newGuest);
  //   } else {
  //     console.error("formData is not available.");
  //   }
  // };

  const EnterInEvent = async() => {
    if (formData) {
      // Update guest state
      const newGuest: Guest = {
        name: user.fullName,
        guestId: user.id,
        eventId: formData.id, // Assuming formData has an id property
        emails: user.email,
        status:"going",
        guestCode:""
      };
      setGuest(newGuest);
      CreateGuest(newGuest);
      console.log("Guest state updated:", newGuest);

    } else {
      console.error("formData is not available.");
    }
  };
  ;

  // Determine button text based on guest status and event starting time
  const isGuest = guests.some((guest) => guest.guestId === userProfile?.id);
  const isEventStarted = new Date(formData?.startingTime) < new Date();
  const isEventEnded = new Date(formData?.endingTime) < new Date();
  const isEventGoing = formData?.status === "going"; // Check if the event status is "going"

  let buttonText;
  let buttonClassName = "w-full bg-white text-black";

  if (isGuest) {
    buttonText = "Coming";
    buttonClassName += " bg-gray-400 text-white cursor-not-allowed"; // Disable button if already registered
  } else if (!isEventStarted && isEventGoing) {
    buttonText = "Join Event"; // Allow joining if the event is going and not started yet
  } else if (isEventEnded) {
    buttonText = "Event Ended";
    buttonClassName += " bg-gray-400 text-white cursor-not-allowed"; // Disable button if the event has ended
  } else {
    buttonText = "Register to Join"; // Default case for registration
  }// }


  return (
    <>
      <div className="w-full min-h-screen">
        <div className="  flex flex-col md:flex-row gap-6 p-6  mx-auto max-w-[1000px] text-white">
          <div className="w-full md:w-2/5 space-y-6">
            <div className="relative">
              <div className="aspect-[3/3] rounded-lg overflow-hidden">
                {formData?.image ? (
                  <img
                    src={formData?.image}
                    alt="Event preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center border border-white border-4">
                    <br /> <br />
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <p>Host by {formData?.hostName}</p>
            </div>

            {formData?.userProfileId == userProfile?.id ? (
              <div className="mx-2">
                
                  <Link to={`setting`} >
                    <Button className="text-white">
                       Manage Event <MoveUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <div className="flex justify-between">
              {/* <div className="w-[200px] cursor-pointer bg-white/10 rounded-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
        {formData?.cal_name || " Calendar"}
      </div> */}
              {/* <div className="w-[120px] text-center cursor-pointer bg-white/10 rounded-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
                {formData?.status || " Status"}
              </div> */}
            </div>
            <div className="h-12 focus-visible:border-none focus-visible:ring-0 text-4xl font-bold bg-transparent border-none focus:ring-0">
              {formData?.name || "Event Name"}
            </div>

            <div className="grid gap-2 md:w-3/4 bg-white/10 rounded-[12px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-[6px] md:p-2">
              <div className="flex items-center justify-between font-medium">
                <span className="text-sm md:text-xl">Starting At: </span>
                <div className="flex gap-[0.5px]">
                  <div className="bg-white/10 rounded-l-[8px] rounded-r-none shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2">
                    {formData?.startingTime?.split("T")[0] || "YYYY-MM-DD"}
                  </div>
                  <div className="bg-white/10 rounded-r-[8px] rounded-l-none shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2">
                    {formData?.startingTime?.split("T")[1] || "00:00"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="text-sm md:text-xl">Ending At: </span>
                <div className="flex gap-[0.5px]">
                  <div className="bg-white/10 rounded-l-[8px] rounded-r-none shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2">
                    {formData?.endingTime?.split("T")[0] || "YYYY-MM-DD"}
                  </div>
                  <div className="bg-white/10 rounded-r-[8px] rounded-l-none shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2">
                    {formData?.endingTime?.split("T")[1] || "00:00"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid">
              <span className="mb-1 text-wrap">Location</span>
              <a
                className="bg-white/10 rounded-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0  "
                href={formData?.addressLink}
              >
                {formData?.addressLink ||
                  "🌐 Offline location link or virtual link"}
              </a>
            </div>

            <div className="bg-white/10 rounded-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
              {formData?.desc || "📃 Event description"}
            </div>

            {/* <div className="space-y-[0.7px]">
              <h3 className="font-semibold mb-1">Event Options</h3>
              <div className="flex justify-between items-center cursor-pointer bg-white/10 rounded-t-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Require Approval</span>
                </div>
                <div>{formData?.approval ? "Yes" : "No"}</div>
              </div>
              <div className="flex justify-between items-center cursor-pointer bg-white/10 rounded-b-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Capacity</span>
                </div>
                <div className="bg-white/10 rounded-[8px] shadow-[0_4px_30px rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
                  {formData?.limit !== null ? formData?.limit : 0}
                </div>
              </div>
            </div> */}

            {/* <div className="space-y-[0.7px]">
      <h3 className="font-semibold mb-1">Hosts</h3>
      {formData.hosts.map((host, index) => (
        <HostComponent key={index} host={host} />
      ))}
    </div> */}

            {/* {buttonText === "coming" ? (
              <Button type="submit" className="w-full bg-white text-black">
                {buttonText}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-white text-black"
                onClick={EnterInEvent}
              >
                {buttonText}
              </Button>
            )} */}
       {buttonText === "Coming" ? (
              <Button type="submit" className={buttonClassName}>
                {buttonText}
              </Button>
            ) : (
             <Button className={buttonClassName} onClick={isEventGoing ? EnterInEvent : undefined}>
   {buttonText}
</Button>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPages;
