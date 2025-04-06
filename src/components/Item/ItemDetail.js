// src/components/Item/ItemDetail.js
// 분실물/습득물 상세 조회 컴포넌트 (mock 기반, type별 구분)
// + 수정도

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockLostItems, mockFoundItems } from '../../services/mockData'

export default function ItemDetail({ type, mode='create', itemId }) {
  const { id } = useParams()  // URL에서 /lost/:id 또는 /found/:id 에서 id 추출
  const [item, setItem] = useState(null)

  useEffect(() => {
    // type에 따라 사용할 데이터 다르게 설정
    const dataList = type === 'lost' ? mockLostItems : mockFoundItems

    // 해당 id에 맞는 항목 찾기
    const targetItem = dataList.find((el) => {
      const itemId = type === 'lost' ? el.lostItemId : el.foundItemId
      return String(itemId) === id
    })

    setItem(targetItem)
  }, [id, type])

  if (!item) return <div>게시물을 찾을 수 없습니다.</div>

  // 데이터 구조: lost와 found가 다르기 때문에 분기 처리
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
