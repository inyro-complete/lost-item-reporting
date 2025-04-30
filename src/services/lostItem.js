// src/services/lostItem.js
// 분실물 등록 관련 API

import axios from 'axios'
import {mockPostLostItem} from "./mockData";

const USE_MOCK = true

export const createLostItem = async (data) => {
  console.log('분실물 등록 요청:', data)

  if(USE_MOCK) {
    return {
      success: true,
      data: mockPostLostItem
    }
  }

  // 실제 서버 요청용
  const formData = new FormData()

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')


  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content)
  formData.append('lostLocation', data.location)
  formData.append('dateLost', data.date)
  formData.append('status', data.status)
  if (data.file) { // 파일 첨부는 선택 사항
    formData.append('file', data.file)
  }

  const res = await axios.post('/api/lost-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}