import React, { useEffect, useState } from 'react';
import { MapPin, Users, ChevronRight, Info, User, ChevronLeft, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { EventsDto } from '../services/interfaces/EventInterface.type';
import { getEvent, getEventByProfile, getPastEventsForUser, getUpcomingEventsForUser } from '../services/api/EventService';
import { getToken, getUser } from '../services/api/auth/AuthService';
import { setAuthToken } from '../services/api/axiosInstance';
import { getUserProfile } from '../services/api/UserProfile';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';



const Events: React.FC = () => {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [events, setEvents] = useState<EventsDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfileAndEvents = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);
        const user = await getUser();
        const userProfile = await getUserProfile(user?.id)
        const upcomingEventData = await getUpcomingEventsForUser(userProfile?.id);
        const pastEventData = await getPastEventsForUser(userProfile?.id);
        setEvents([...upcomingEventData, ...pastEventData]);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileAndEvents();
    const intervalId = setInterval(fetchUserProfileAndEvents, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const generateCalendarDays = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];
    
    // Previous month days
    const prevMonthDays = firstDay.getDay();
    for (let i = 0; i < prevMonthDays; i++) {
      days.push({ date: '', isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: i, isCurrentMonth: true });
    }
    
    return days;
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Events</h1>
          <div className="bg-[#1c2635] rounded-full p-1">
            <Button
              variant={showUpcoming ? 'default' : 'ghost'}
              onClick={() => setShowUpcoming(true)}
              className="rounded-full text-white hover:text-white"
            >
              Upcoming
            </Button>
            <Button
              variant={!showUpcoming ? 'default' : 'ghost'}
              onClick={() => setShowUpcoming(false)}
              className="rounded-full text-white hover:text-white"
            >
              Past
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {events
            ?.filter(event => 
              showUpcoming 
                ? new Date(event.startingTime) > new Date() 
                : new Date(event.endingTime) < new Date()
            )
            .map((event) => {
              const startDate = new Date(event.startingTime);
              const endDate = new Date(event.endingTime);
              const duration = `${Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60))}h`;
              const calendarDays = generateCalendarDays(startDate);

              return (
                <div key={event.id} className="flex">
                  <div className="w-44 text-right pr-8 pt-2">
                    <div className="text-white">
                      <div className="font-bold text-lg">
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }).format(startDate)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {startDate.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <Card className="flex-1 bg-[#1c2635] border-0">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        {event.limit && (
                          <Badge className="bg-[#1d3050] text-[#5a9cf8] border-0 rounded-sm text-xs mb-2">
                            Limited to {event.limit} attendees
                          </Badge>
                        )}
                        <h2 className="text-xl font-bold text-white mt-2">{event.name}</h2>
                      </div>

                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3 text-gray-400 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#2b3544] flex items-center justify-center text-xs">
                              {duration}
                            </span>
                            <div className="flex items-center gap-2 ml-2">
                              <ChevronLeft className="w-4 h-4 text-gray-500" />
                              <span>{startDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>View Location</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            <span>Status: {event.status}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Host: {event.hostName}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {endDate.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              })} (End)
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            <div className="text-gray-500 text-xs">Su</div>
                            <div className="text-gray-500 text-xs">Mo</div>
                            <div className="text-gray-500 text-xs">Tu</div>
                            <div className="text-gray-500 text-xs">We</div>
                            <div className="text-gray-500 text-xs">Th</div>
                            <div className="text-gray-500 text-xs">Fr</div>
                            <div className="text-gray-500 text-xs">Sa</div>
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, index) => (
                              <div
                                key={index}
                                className={`
                                  text-center p-1 text-xs
                                  ${!day.date ? 'text-gray-700' : 
                                    day.date === startDate.getDate() ? 'bg-white text-black rounded' : 
                                    'text-gray-400'}
                                `}
                              >
                                {day.date}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button 
                          variant="default"
                          className="bg-white text-black hover:bg-gray-200"
                        >
                          Manage Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {event.image && (
                    <div className="ml-6">
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Events;
