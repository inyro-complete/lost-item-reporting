// src/components/Item/ItemDetail.js
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../services/api/axiosInstance'

export default function ItemDetail({ type }) {
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const endpoint = type === 'lost'
            ? `/api/lost-items/${id}`
            : `/api/found-items/${id}`

        const res = await axiosInstance.get(endpoint)
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

  return (
      <div>
        <h2>{title}</h2>
        <img
            src={imageUrl}
            alt="이미지"
            style={{ width: '240px', height: '240px', objectFit: 'cover' }}
        />
        <p>위치: {location}</p>
        <p>날짜: {new Date(date).toLocaleDateString()}</p>
        <p>상태: {status}</p>
        <p>내용: {description}</p>
      </div>
  )
}
