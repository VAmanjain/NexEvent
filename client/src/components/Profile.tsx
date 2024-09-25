import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkedinIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getUserProfile } from '../services/api/UserProfile';
import { getEventByProfile } from '../services/api/EventService';
import { EventsDto } from '../services/interfaces/EventInterface.type';
import { getToken } from '../services/api/auth/AuthService';
import { setAuthToken } from '../services/api/axiosInstance';

const Profile: React.FC = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const [userData, setUserData] = useState<any>(null); // State to hold user profile data
  const [events, setEvents] = useState<EventsDto[]>([]); // State to hold event data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch the user profile and events data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);
        const data = await getUserProfile(id); // Fetch data using getUserProfile(id)
        setUserData(data); // Store the fetched data in state

        const eventData: EventsDto[] = await getEventByProfile(id); // Fetch events by profile ID
        setEvents(eventData); // Store the events data

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching user profile or events:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  // Display loading state until data is fetched
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Separate hosted and past events
  const hostingEvents = events;
  const pastEvents = events;

  // Render the profile once data is available
  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Avatar className="w-24 h-24 md:w-32 md:h-32">
            <AvatarImage src={userData?.image || "/placeholder.svg"} alt={userData?.username || "User"} />
            <AvatarFallback className='text-slate-600'>Image</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{userData?.username || "Unknown User"}</h1>
            <p className="text-gray-400">Joined {userData?.joinedDate || "Unknown Date"}</p>
            <p className="mt-2">{userData?.eventsHosted || 0} Hosted · {userData?.eventsAttended || 0} Attended</p>
            <div className='flex gap-4'>
              {userData?.socialMedia?.linkedin && (
                <a target='blank' href={userData.socialMedia.linkedin}>
                  <LinkedinIcon className="mt-2 w-6 h-6 mx-auto md:mx-0" />
                </a>
              )}
              {userData?.socialMedia?.twitter && (
                <a target='blank' href={userData.socialMedia.twitter}>
                  <TwitterIcon className="mt-2 w-6 h-6 mx-auto md:mx-0" />
                </a>
              )}
              {userData?.socialMedia?.instagram && (
                <a target='blank' href={userData.socialMedia.instagram}>
                  <InstagramIcon className="mt-2 w-6 h-6 mx-auto md:mx-0" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Hosting Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Hosting</h2>
          {hostingEvents.length > 0 ? (
            hostingEvents.map((event: EventsDto) => (
              <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                    You're Invited
                  </div>
                  <div>
                    <CardTitle className='text-white'>{event.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={userData?.image || "/placeholder.svg"} alt={userData?.username || "User"} />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-300">By {userData?.username || "Unknown User"}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-400 font-semibold">{event.status || "Upcoming"}</p>
                  <p className="text-gray-300">{event.dateTime || "Unknown Time"}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-300">No hosting events available.</p>
          )}
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>
          {pastEvents.length > 0 ? (
            pastEvents.map((event: EventsDto) => (
              <Card key={event.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-xs">Event Image</span>
                  </div>
                  <div>
                    <CardTitle className='text-white'>{event.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={userData?.image || "/placeholder.svg"} alt={userData?.username || "User"} />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-300">By {userData?.username || "Unknown User"}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{event.dateTime || "Unknown Time"} · {event.location || "Unknown Location"}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-300">No past events available.</p>
          )}
        </section>

        {/* Profile ID */}
        <div>Profile ID: {id}</div> {/* Displaying the profile ID */}
      </div>
    </div>
  );
};

export default Profile;
