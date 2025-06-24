// src/components/Item/ItemDetail.js
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/api/axiosInstance'
import { createChatRoom } from '../../services/api/chatApi'

export default function ItemDetail({ type }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const endpoint = type === 'lost'
            ? `/api/lost-items/${id}`
            : `/api/found-items/${id}`

        const res = await axiosInstance.get(endpoint)
        console.log('item data:', res.data)  // 여기 찍어보기
        setItem(res.data)
      } catch (err) {
        console.error('상세 정보 불러오기 실패', err)
      }
    }

    fetchItem()
  }, [id, type])


  if (!item) return <div>게시물을 찾을 수 없습니다.</div>

  const title = item.title || item.itemName
  const description = item.description || item.itemDescription
  const location = item.lostLocation || item.foundLocation
  const date = item.lostDate || item.dateFound
  const imageUrl = item.imageUrl || '/images/default_Item_Thumbnail.png'
  const status =
      item.status === 'FINDING'
          ? '찾는 중'
          : item.status === 'FOUND' || item.status === 'STORED'
              ? '보관 완료'
              : '종료됨'

  const handleStartChat = async () => {
    try {
      const myUserId = Number(localStorage.getItem('userId'))
      const otherUserId = item.userId

      console.log('My User ID:', myUserId)
      console.log('Other User ID:', otherUserId)

      if (!myUserId || !otherUserId) {
        alert('유저 정보를 확인할 수 없습니다.')
        return
      }

      const res = await createChatRoom(myUserId, otherUserId)
      navigate(`/messages/${res.roomNumber}`)
    } catch (error) {
      console.error('채팅방 생성 실패', error)
      alert('채팅방 생성에 실패했습니다.')
    }
  }



  return (
      <div>
        <h2>{title}</h2>
        <img
            src={imageUrl}
            alt="이미지"
            style={{ width: '240px', height: '240px', objectFit: 'cover' }}
        />
        <p>잃어버린 위치: {location}</p>
        <p>날짜: {new Date(date).toLocaleDateString()}</p>
        <p>상태: {status}</p>
        <div>
          <div
              dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <button
            onClick={handleStartChat}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
        >
          쪽지 보내기
        </button>
      </div>
  )
}
