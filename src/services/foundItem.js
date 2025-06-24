// src/services/foundItem.js

import axiosInstance from './api/axiosInstance'

import { USE_MOCK } from '../config'
import { mockPostFoundItem } from './mockData'

// 습득물 전체 목록 조회 (페이징)
export const fetchFoundItemList = async (page, size) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const res = await axiosInstance.get('/api/found-items', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      size,
    },
  })

  return res.data
}

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
  formData.append('title', data.title)
  formData.append('description', data.content)
  formData.append('foundLocation', data.location)
  formData.append('storageLocation', data.location)  // 추가됨
  formData.append('foundDate', data.foundDate)       // 이름 변경됨
  formData.append('status', data.status)
  if (data.file) {
    formData.append('image', data.file)              // 이름 변경됨
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
  formData.append('title', data.title)
  formData.append('description', data.content)
  formData.append('foundLocation', data.location)
  formData.append('storageLocation', data.location)  // 추가됨
  formData.append('foundDate', data.foundDate)       // 이름 변경됨
  formData.append('status', data.status)
  if (data.file) {
    formData.append('image', data.file)              // 이름 변경됨
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
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      return { status: 500, message: 'Server Error' }
    }
  }
}
