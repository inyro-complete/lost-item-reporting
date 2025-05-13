// src/pages/MessagePage.js
import React, { useEffect, useState } from 'react'
import axiosInstance from '../services/api/axiosInstance'
import MessageRoomList from '../components/MessageRoomList'
import '../assets/css/MessagePage.css'

export default function MessagePage() {
  const [rooms, setRooms] = useState([])

  const fetchRooms = async () => {
    try {
      const res = await axiosInstance.get('/chatting/rooms', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setRooms(res.data)
    } catch (error) {
      console.error('채팅방 목록 불러오기 실패', error)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
      <div className="message-page">
        <h2>쪽지함</h2>
        <MessageRoomList rooms={rooms} reloadRooms={fetchRooms} />
      </div>
  )
}
