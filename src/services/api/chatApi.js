// src/services/api/chatApi.js
import axiosInstance from './axiosInstance'

export const createChatRoom = async (userId, otherId) => {
  const res = await axiosInstance.post('/chatting/room', {
    userId,
    otherId,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  })
  return res.data
}

export const deleteChatRoom = async (roomNumber) => {
  const res = await axiosInstance.get(`/rooms/${roomNumber}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
  })
  return res.data
}