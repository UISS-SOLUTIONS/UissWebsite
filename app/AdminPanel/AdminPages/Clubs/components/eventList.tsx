import { fetchData } from '@/app/actions'
import React from 'react'
import UpcomingEventsCard from './upcomingEventsCards';

interface props {
    id: string
}
const EventList:React.FC<props> = async ({id}) => {
    let events: any[] = []
    try{
         const response = await fetchData(`http://localhost:3000/api/events/${id}`);
         if(response.success){
            events = response.data.events
         }
    }catch (e){
        throw new Error((e as Error).message)
    }
  return (
    <>
    {
        events.map(event => {
            return(
                <UpcomingEventsCard key={event.id} title={event.title} date={event.date}/>
            )
        })
    }
    </>
  )
}

export default EventList