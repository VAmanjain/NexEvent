import React from 'react'
import { useParams } from 'react-router-dom'
import { EventManagement } from './event-management';

const EventSetting:React.FC = () => {
    const {id} = useParams();
  return (
    <div>EventSetting ------ {id}
    
    <EventManagement id={id} />
    </div>
  )
}

export default EventSetting