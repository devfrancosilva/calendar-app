import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { preparesEvents } from '../helpers/preparesEvents'
import { types } from '../types/types'

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth
    try {
      const res = await fetchWithToken('events', event, 'POST')
      const body = await res.json()

      if (body.ok) {
        event.id = body.event.id
        event.user = {
          _id: uid,
          name,
        }

        dispatch(eventAddNew(event))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`events/${event.id}`, event, 'PUT')
      const body = await res.json()

      if (body.ok) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.eventActive
    try {
      const res = await fetchWithToken(`events/${id}`, {}, 'DELETE')
      const body = await res.json()

      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({
  type: types.eventDeleted,
})

export const eventLogout = () => ({ type: types.eventLogout })

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken('events')
      const body = await res.json()
      const events = preparesEvents(body.events)

      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (event) => ({ type: types.eventLoaded, payload: event })
