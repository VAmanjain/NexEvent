import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { EventsDto } from '../services/interfaces/EventInterface.type'
import { getAllEvents } from '../services/api/EventService'

const events = [
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Colombia Tech Week",
    description: "The most important week of free events of the tech ecosystem in LATAM +150 funds & investors,...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "#HKWeb3 Events Calendar",
    description: "The Hong Kong Web3 calendar of events - curated by WhatYouBuilding.com and Web...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "the ai salon",
    description: "Conversations on the meaning and impact of artificial intelligence as it intersects area...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Network State Conference",
    description: "Our annual conference is in Singapore on September 22, 2024.",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Honolulu Tech Week",
    description: "Join us for a week of events hosted by industry executives, startup leaders, investors, polic...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "TOKEN2049 Singapore",
    description: "Explore side events at TOKEN2049 Singapore, September 18-19, where leadin...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Breakpoint 2024 Community Events",
    description: "Community run side events happening during Breakpoint 2024.",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Framer",
    description: "Find Framer Meetups across the globe. Hosting an event? Submit it to our official meetup calenda...",
  },
  {
    logo: "/placeholder.svg?height=40&width=40",
    title: "Toronto Tech Fest 2024",
    description: "#TorontoTechFest is an unbranded series of events hosted by various members of...",
  },
]

// const Discover: React.FC = () => {
//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-white mb-2 pl-8"> Latest Events</h1>
//       <h2 className="text-2xl text-gray-300 mb-8 pl-8">That We Love</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//         {events.map((event, index) => (
//           <Card key={index} className="bg-opacity-10 backdrop-blur-sm bg-gray-800 border-gray-700 max-w-sm w-full">
//             <CardHeader>
//               <div className="flex items-center space-x-4">
//                 <img src={event.logo} alt="a" className="w-10 h-10" />
//                 <CardTitle className="text-white text-lg">{event.title}</CardTitle>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-300 text-sm">{event.description}</p>
//             </CardContent>
//             <CardFooter>
//               <Button variant="secondary" className="w-full">Join</Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Discover

const Discover: React.FC = () => {
  const [events, setEvents] = useState<EventsDto[]>([]); // State to hold event data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch all events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData: EventsDto[] = await getAllEvents(); // Fetch events from API
        setEvents(eventData); // Set fetched events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchEvents();
  }, []);

  // Display loading state until data is fetched
  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white mb-2 pl-8">Latest Events</h1>
      <h2 className="text-2xl text-gray-300 mb-8 pl-8">That We Love</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {events.map((event) => (
          <Card key={event.id} className="bg-opacity-10 backdrop-blur-sm bg-gray-800 border-gray-700 max-w-sm w-full">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img src={event.image} alt={event.name} className="w-10 h-10" />
                <CardTitle className="text-white text-lg">{event.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{event.desc}</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Join</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Discover;