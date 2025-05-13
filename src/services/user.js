// src/services/user.js

import axiosInstance from './api/axiosInstance'



// 내가 쓴 글 목록 조회
export const getMyPosts = async (type = 'lost', page = 1, size = 10) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  try {
    const response = await axiosInstance.get(`/api/users/my-posts`, {
      params: { type, page, size },
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

// 내 정보 조회
export const getMyInfo = async () => {
  const res = await axiosInstance.get('/api/users/mypage', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return res.data
}

// 회원 탈퇴
export const deleteUser = async (password) => {
  const res = await axiosInstance.delete('/api/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { password },
  })
  return res.data
}