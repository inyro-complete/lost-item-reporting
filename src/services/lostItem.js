// src/services/lostItem.js

import axiosInstance from './api/axiosInstance'

import { USE_MOCK } from '../config'
import { mockPostLostItem } from './mockData'

// 분실물 등록
export const createLostItem = async (data) => {
  if (USE_MOCK) {
    return {
      success: true,
      data: mockPostLostItem,
    }
  }

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('title', data.title) // 명세서 키
  formData.append('description', data.content) // 명세서 키
  formData.append('lostLocation', data.location) // 명세서 키
  formData.append('lostDate', data.date) // 명세서 키
  if (data.file) {
    formData.append('imageFile', data.file) // 명세서 키
  }

  const res = await axiosInstance.post('/api/lost-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

// 글 삭제 함수
export const deleteLostItem = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/api/lost-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.status
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      return { status: 500, message: 'Server Error' }
    }
  }
}

// 분실물 수정
export const updateLostItem = async (id, data) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.content) // ItemWrite에서는 content라고 관리했음
  formData.append('lostLocation', data.location)
  formData.append('lostDate', data.date)
  if (data.file) {
    formData.append('file', data.file)
  }

  try {
    const response = await axiosInstance.put(`/api/lost-items/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      return { status: 500, message: 'Server Error' }
    }
  }
}
