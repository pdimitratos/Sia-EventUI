import React from 'react'
import Event from './Event'

export const Events = ({events, ticketId, incidentId}) => {
  return (<div>{
    Array.from(events)
    .map(event =>
      <Event
        key={event.id}
        incidentId={incidentId}
        ticketId={ticketId}
        event={event}
      />)
    }</div>)
}

export default Events
