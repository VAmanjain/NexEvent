import React, { useEffect, useState } from 'react';
import { MapPin, Users, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { EventsDto } from '../services/interfaces/EventInterface.type';
import { getEvent, getEventByProfile } from '../services/api/EventService';
import { getToken, getUser } from '../services/api/auth/AuthService';
import { setAuthToken } from '../services/api/axiosInstance';
import { getUserProfile } from '../services/api/UserProfile';

type Event = {
  id: number;
  date: string;
  day: string;
  time: string;
  title: string;
  location: string;
  organizers: string;
  attendees: number;
  image: string;
  isUpcoming: boolean;
};

const events: Event[] = [
  {
    id: 1,
    date: 'Apr 15',
    day: 'Saturday',
    time: '10:00 AM',
    title: 'Tech Conference 2024',
    location: 'Virtual Event',
    organizers: 'TechCorp',
    attendees: 1000,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: true
  },
  {
    id: 2,
    date: 'May 1',
    day: 'Wednesday',
    time: '2:00 PM',
    title: 'AI Workshop',
    location: 'Innovation Hub',
    organizers: 'AI Research Group',
    attendees: 150,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: true
  },
  {
    id: 3,
    date: 'May 20',
    day: 'Monday',
    time: '11:00 AM',
    title: 'Startup Pitch Day',
    location: 'Entrepreneurship Center',
    organizers: 'Venture Capital Firm',
    attendees: 200,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: true
  },
  {
    id: 4,
    date: 'Mar 10',
    day: 'Friday',
    time: '3:00 PM',
    title: 'Web Dev Bootcamp',
    location: 'Code Academy',
    organizers: 'Frontend Masters',
    attendees: 75,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: false
  },
  {
    id: 5,
    date: 'Feb 28',
    day: 'Wednesday',
    time: '1:00 PM',
    title: 'Data Science Symposium',
    location: 'University Auditorium',
    organizers: 'Data Science Society',
    attendees: 300,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: false
  },
  {
    id: 6,
    date: 'Jan 15',
    day: 'Monday',
    time: '9:00 AM',
    title: 'Cybersecurity Conference',
    location: 'Tech Center',
    organizers: 'SecureNet',
    attendees: 250,
    image: '/placeholder.svg?height=100&width=100',
    isUpcoming: false
  }
  // ... (other events)
];
const Events: React.FC = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [events, setEvents] = useState<EventsDto[]>([]); // State to hold event data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [userData, setUserData] = useState<any>(null);
  // Fetch events when the component mounts



  // Fetch the user profile and events data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);
        const user = await getUser();
        const data = await getUserProfile(user?.id); // Fetch data using getUserProfile(id)
        setUserData(data); // Store the fetched data in state

        const eventData: EventsDto[] = await getEventByProfile(userData?.id); // Fetch events by profile ID
        setEvents(eventData); // Store the events data

        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching user profile or events:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
    const intervalId = setInterval(fetchUserProfile, 10000); // Fetch every minute

    return () => clearInterval(intervalId);
  }, []);

  // Display loading state until data is fetched
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  // Filter events based on upcoming or past status
  // const events = events.filter(event => event);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Events</h1>
          <div className="bg-white bg-opacity-10 rounded-full p-1">
            <Button
              variant={showUpcoming ? 'default' : 'ghost'}
              onClick={() => setShowUpcoming(true)}
              className="rounded-full text-white"
            >
              Upcoming
            </Button>
            <Button
              variant={!showUpcoming ? 'default' : 'ghost'}
              onClick={() => setShowUpcoming(false)}
              className="rounded-full text-white"
            >
              Past
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {events?.map((event, index) => (
            <div key={event.id} className="flex">
              <div className="w-40 text-right pr-10 relative">
                <div className="font-bold text-lg">{event.startingTime}</div>
                {/* <div className="text-gray-300">{event.day}</div> */}
                {index !== events.length - 1 && (
                  <div className="absolute top-10 bottom-0 right-5 w-px border-r-2 border-dotted border-white border-opacity-30" />
                )}
                <div className="absolute top-3 -right-1.5 w-3 h-3 bg-white rounded-full" />
              </div>
              <Card className="flex-1 bg-white bg-opacity-5 border-white border-opacity-10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-semibold mb-2 text-gray-200">{event.time}</div>
                      <h2 className="text-2xl font-bold mb-4 text-white">{event.title}</h2>
                      <div className="flex items-center text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.addressLink}
                      </div>
                      {event.hostName && (
                        <div className="flex items-center text-gray-300 mb-2">
                          <Users className="w-4 h-4 mr-2" />
                          {event.hostName}
                        </div>
                      )}
                      {/* {event.attendees > 0 && (
                        <div className="flex items-center mt-4">
                          <div className="flex -space-x-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-300">+{event.attendees} going</span>
                        </div>
                      )} */}
                    </div>
                    <img src={event.image} alt={event.name} className="w-24 h-24 rounded-lg object-cover" />
                  </div>
                  <Button variant="outline" className="mt-6 text-black border-white border-opacity-50 hover:bg-white hover:bg-opacity-10">
                    Manage Event <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;