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
