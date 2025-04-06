// src/services/lostItem.js

import axios from 'axios'
import { USE_MOCK } from '../config'
import { mockPostLostItem } from './mockData'

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
  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content)
  formData.append('lostLocation', data.location)
  formData.append('dateLost', data.date)
  formData.append('status', data.status)
  if (data.file) {
    formData.append('file', data.file)
  }

  const res = await axios.post('/api/lost-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export const updateLostItem = async (id, data) => {
  if (USE_MOCK) {
    return {
      success: true,
      data: mockPostLostItem,
    }
  }

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const formData = new FormData()
  formData.append('itemName', data.title)
  formData.append('itemDescription', data.content)
  formData.append('lostLocation', data.location)
  formData.append('dateLost', data.date)
  formData.append('status', data.status)
  if (data.file) {
    formData.append('file', data.file)
  }

  const res = await axios.put(`/api/lost-items/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}
