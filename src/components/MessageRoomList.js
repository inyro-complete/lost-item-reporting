// src/components/MessageRoomList.js
import React from 'react'
import { Link } from 'react-router-dom'
import { deleteChatRoom } from '../services/api/chatApi'
import '../assets/css/MessageRoomList.css'

export default function MessageRoomList({ rooms, reloadRooms }) {
  const handleDelete = async (roomNumber) => {
    if (window.confirm('채팅방을 삭제하시겠습니까?')) {
      try {
        await deleteChatRoom(roomNumber)
        alert('삭제 완료!')
        reloadRooms() // 다시 불러오기
      } catch (error) {
        console.error('삭제 실패', error)
      }
    }
  }

  if (rooms.length === 0) {
    return <div>쪽지함이 비어 있습니다</div>
  }

  return (
      <ul className="message-room-list">
        {rooms.map((room) => (
            <li key={room.roomNumber} className="message-room-item">
              <Link to={`/messages/${room.roomNumber}`}>
                {room.messages.length > 0
                    ? room.messages[0].message || '사진이 있습니다'
                    : '대화 내용 없음'}
              </Link>
              <button
                  onClick={() => handleDelete(room.roomNumber)}
                  className="delete-button"
              >
                삭제
              </button>
            </li>
        ))}
      </ul>
  )
}
