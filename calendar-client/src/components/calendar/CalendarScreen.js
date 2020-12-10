import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import 'moment/locale/es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')
const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const [view, setView] = useState(localStorage.getItem('lastView') || 'month')
  const dispatch = useDispatch()
  const { events, eventActive } = useSelector((state) => state.calendar)
  const { uid } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  }
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }
  const onViewChange = (e) => {
    setView(e)
    localStorage.setItem('lastView', e)
  }
  const onSelectSlot = () => {
    dispatch(eventClearActiveEvent())
  }
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? '#367FC7' : '#465660',
      borderRadius: 0,
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }
    return { style }
  }
  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={view}
      />
      <AddNewFab />
      {eventActive && <DeleteEventFab />}
      <CalendarModal />
    </div>
  )
}
