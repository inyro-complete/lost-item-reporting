// src/services/auth.js

import axiosInstance from './api/axiosInstance'
import { USE_MOCK } from '../config'


// 회원가입 API
export const signupApi = async (signupData) => {
  if (USE_MOCK) {
    console.log('mock signup:', signupData)
    return {
      message: 'User registered successfully.'
    }
  }

  const res = await axiosInstance.post('/auth/signup', signupData)
  return res.data
}

// 로그인 API
export const loginApi = async (email, password) => {
  if (USE_MOCK) {
    console.log('mock login:', email, password)
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600
    }
  }

  const res = await axiosInstance.post('/auth/login', {
    email,
    password
  })

  return res.data
}

// 로그아웃 API
export const logoutApi = async () => {
  const refreshToken = localStorage.getItem('refreshToken') // 저장해놓은 리프레시 토큰(=로그인 인증을 대신할 수 있는 토큰) 꺼냄

  if (!refreshToken) {
    console.log('refreshToken 없음')
    return
  }

  if (USE_MOCK) {
    console.log('mock logout:', refreshToken)
    return {
      message: '모킹 로그아웃 성공'
    }
  }

  const res = await axiosInstance.get('/auth/logout', {
    headers: {
      'Refresh-Token': refreshToken // Refresh-Token 실어서 서버에 보냄 -
    }
  })

  return res.data // 서버가 보낸 응답 리턴
}

// 이메일 중복 체크 API
export const checkEmailApi = async (email) => {
  if (USE_MOCK) {
    if (email === 'used@example.com') {
      return {
        available: false,
        message: '이미 사용 중인 이메일입니다.'
      }
    } else {
      return {
        available: true,
        message: '사용 가능한 이메일입니다.'
      }
    }
  }

  const res = await axiosInstance.get(`/api/users/check-email?email=${email}`) // 쿼리스트링 추가
  return res.data
}

// 비밀번호 변경 API
export const changePasswordApi = async (currentPassword, newPassword) => {
  if (USE_MOCK) {
    return {
      message: '비밀번호가 성공적으로 변경되었습니다.'
    }
  }

  const token = localStorage.getItem('token')
  if (!token) throw new Error('토큰 없음')

  const res = await axiosInstance.patch('/api/users/password', {
    currentPassword,
    newPassword
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}
