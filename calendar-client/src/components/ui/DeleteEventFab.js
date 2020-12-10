import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/events'

export const DeleteEventFab = () => {
  const dispach = useDispatch()

  const handleDelete = () => {
    dispach(eventStartDelete())
  }
  return (
    <button className='btn btn-danger fab-delete' onClick={handleDelete}>
      <i className='fas fa-trash'></i>
      <span> Borrar evento</span>
    </button>
  )
}
