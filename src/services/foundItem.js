// src/services/foundItem.js
// 습득물 등록 관련 API

import axios from 'axios'
import { mockPostFoundItem } from './mockData'

const USE_MOCK = true  // true면 mock 응답, false면 실제 axios 요청
// 나중에 백이랑 연결할 때 false로 바꾸기

export const createFoundItem = async (data) => {
  console.log('습득물 등록 요청:', data)

  if (USE_MOCK) {
    // 모킹용 응답
    return {
      success: true,
      data: mockPostFoundItem
    }
  }

  // 실제 서버 요청용
  const formData = new FormData() //  formData(파일 포함해서 데이터를 보낼 때 사용하는 전용 객체) 객체 생성

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  // 서버에 보내야 할 항목들을 FormData에 추가
  // .append()에 넣는 키 이름이 API 명세와 동일해야 함.
  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content) // 본문
  formData.append('foundLocation', data.location)
  formData.append('dateFound', data.date)
  formData.append('status', data.status)
  if (data.file) {
    formData.append('file', data.file)
  }

  const res = await axios.post('/api/found-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
