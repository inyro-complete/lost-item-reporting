// src/services/api/chatApi.js
import axiosInstance from './axiosInstance'



// 채팅방 생성
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

// 채팅방 목록 조회
export const getChatRooms = async () => {
  const res = await axiosInstance.get('/chatting/rooms', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}

// 삭제
export const deleteChatRoom = async (roomNumber) => {
  const res = await axiosInstance.get(`/rooms/${roomNumber}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}
