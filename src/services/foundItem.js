// src/services/foundItem.js

import axios from 'axios'
import { USE_MOCK } from '../config'
import { mockPostFoundItem } from './mockData'

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

  const res = await axios.post('/api/found-items', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}

export const updateFoundItem = async (id, data) => {
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

  const res = await axios.put(`/api/found-items/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data
}
