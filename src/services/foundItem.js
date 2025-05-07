// src/services/foundItem.js

import axiosInstance from './api/axiosInstance'

import { USE_MOCK } from '../config'
import { mockPostFoundItem } from './mockData'

// 습득물 등록
export const createFoundItem = async (data) => {
  if (USE_MOCK) {
    return {
      success: true,
      data: mockPostFoundItem,
    }
  }

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content)
  formData.append('foundLocation', data.location)
  formData.append('dateFound', data.date)
  formData.append('status', data.status)
  if (data.file) {
    formData.append('file', data.file)
  }

  const res = await axiosInstance.post('/api/found-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}


// 습득물 수정
export const updateFoundItem = async (id, data) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content)
  formData.append('foundLocation', data.location)
  formData.append('dateFound', data.date)
  formData.append('status', data.status)
  if (data.file) {
    formData.append('file', data.file)
  }

  try {
    const response = await axiosInstance.put(`/api/found-items/${id}`, formData, {
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

// 습득물 삭제
export const deleteFoundItem = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/api/found-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data  // ★ 여기 status가 아니라 data로
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      return { status: 500, message: 'Server Error' }
    }
  }
}
