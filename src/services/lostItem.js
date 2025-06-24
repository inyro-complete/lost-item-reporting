// src/services/lostItem.js

import axiosInstance from './api/axiosInstance'
import { USE_MOCK } from '../config'
import { mockPostLostItem } from './mockData'

// ✅ 분실물 등록
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
  formData.append('title', data.title)
  formData.append('description', data.content)
  formData.append('lostLocation', data.location)
  formData.append('lostDate', data.foundDate)
  if (data.file) {
    formData.append('imageFile', data.file)
  }

  for (let pair of formData.entries()) {
    console.log(pair[0] + ':', pair[1])
  }

  const res = await axiosInstance.post('/api/lost-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

// ✅ 분실물 전체 목록 조회 (명세서 기준: /api/lost-items/list)
export const fetchLostItemList = async (page, size, title = '') => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const res = await axiosInstance.get('/api/lost-items/list', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      size,
      title: title || undefined,
    },
  })

  return res.data
}

// ✅ 분실물 삭제
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

// ✅ 분실물 수정
export const updateLostItem = async (id, data) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('description', data.content)
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
