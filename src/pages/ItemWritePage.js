// src/pages/ItemWritePage.js

import React from 'react'
import { useLocation } from 'react-router-dom'
import ItemWrite from '../components/Item/ItemWrite'
import '../assets/css/ItemWritePage.css';

export default function ItemWritePage() {
  const location = useLocation()

  const isFound = location.pathname.includes('/found') // location.pathname은 지금 페이지 경로임 (ex: /found/write)

  // 분기 처리
  const type = isFound ? 'found' : 'lost' // 주소에 found가 들어있으면 true

  return (
    <div className='itemWritePage'>
      <ItemWrite type={type} />
    </div>
  )
}
