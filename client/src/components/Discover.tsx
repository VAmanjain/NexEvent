'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Calendar, CheckCircle, Clock, MapPin, Search, Tag, Users, XCircle } from 'lucide-react'
import type { EventsDto, HostDto } from '../services/interfaces/EventInterface.type'
import { getActiveEvents } from '../services/api/EventService'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'

const Discover =()=> {
  const [events, setEvents] = useState<EventsDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchActiveEvents = async () => {
      try {
        const eventData = await getActiveEvents()
        setEvents(eventData)
      } catch (error) {
        console.error("Error fetching active events:", error)
        setError("Failed to load active events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchActiveEvents()
  }, [])

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-center text-lg text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover <span className="text-purple-400">Events</span>
          </h1>
          <p className="mt-3 text-xl text-gray-300 sm:mt-4">Find your next experience</p>
        </motion.div>
        
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search events..."
              className="bg-gray-800 pl-10 text-white placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden bg-gray-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 bg-gray-700" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 bg-gray-700" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full bg-gray-700" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="group overflow-hidden border-gray-700 bg-gray-800/50 backdrop-blur-sm transition-all hover:bg-gray-800/70"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {event.type}
                        </Badge>
                        {event.approval ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {event.name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={event.image} alt={event.hostName} />
                          {/* <AvatarFallback>{event.hostName.slice(0, 2).toUpperCase()}</AvatarFallback> */}
                        </Avatar>
                        <span className="text-sm text-gray-300">by {event.hostName}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-300 line-clamp-3">{event.desc}</p>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          <span>{format(new Date(event.startingTime), 'PPP')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span>
                            {format(new Date(event.startingTime), 'p')} - {format(new Date(event.endingTime), 'p')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-purple-400" />
                          <a 
                            href={event.addressLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-purple-300 transition-colors"
                          >
                            View Location
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>{event.limit} spots</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4 text-purple-400" />
                          <span>{event.cal_name}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="w-full">
                        <h4 className="mb-2 font-semibold text-white">Hosts:</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.hosts.map((host: HostDto) => (
                            <Badge key={host.id} variant="outline" className="bg-gray-700/50 text-gray-300">
                              {host.name} {host.role && `(${host.role})`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-purple-600 text-white transition-all hover:bg-purple-700 hover:scale-105"
                      >
                        Join Event
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
export default Discover;