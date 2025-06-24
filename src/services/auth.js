// src/services/auth.js

import axiosInstance from './api/axiosInstance' // 서버 요청 보낼 때 사용할 axios 인스턴스 import

// 회원가입 API
export const signupApi = async (signupData) => {
  // signupData = { email, password, nickname } 이런 식으로 사용자가 입력한 데이터
  // 이 데이터를 서버의 /auth/signup 엔드포인트로 POST 요청해서 회원가입 시도
  const res = await axiosInstance.post('/auth/signup', signupData)
  // 서버가 응답한 데이터(res.data)를 반환
  return res.data
}

// 로그인 API
export const loginApi = async (email, password) => {
  // 사용자가 입력한 email, password를 서버의 /auth/login 엔드포인트로 POST 요청
  const res = await axiosInstance.post('/auth/login', {
    email,
    password
  })
  // 로그인 성공하면 서버가 accessToken, refreshToken 등을 내려줌
  return res.data
}

// 로그아웃 API
export const logoutApi = async () => {
  // 로컬스토리지에서 저장된 refreshToken 꺼내오기
  const refreshToken = localStorage.getItem('refreshToken')

  // refreshToken이 없으면 로그아웃 요청 안 보내고 함수 종료
  if (!refreshToken) {
    console.log('refreshToken 없음') // 디버깅용 로그
    return
  }

  // refreshToken을 'Refresh-Token' 헤더에 실어서 서버의 /auth/logout 엔드포인트로 GET 요청
  const res = await axiosInstance.get('/auth/logout', {
    headers: {
      'Refresh-Token': refreshToken
    }
  })

  // 서버 응답 반환
  return res.data
}

// 이메일 중복 체크 API
export const checkEmailApi = async (email) => {
  // 사용자가 입력한 이메일을 쿼리스트링으로 추가해서 서버의 /api/users/check-email로 GET 요청
  // 예시: /api/users/check-email?email=test@example.com
  const res = await axiosInstance.get(`/api/users/check-email?email=${email}`)

  // 서버가 내려주는 '이메일 사용 가능 여부' 결과 반환
  return res.data
}

// 비밀번호 변경 API
export const changePasswordApi = async (currentPassword, newPassword) => {
  // 토큰(로그인 인증용)을 로컬스토리지에서 꺼냄
  const token = localStorage.getItem('token')

  // 토큰이 없으면 에러 발생시켜서 중단
  if (!token) throw new Error('토큰 없음')

  // 현재 비밀번호와 새 비밀번호를 서버에 PATCH 요청
  // Authorization 헤더에 Bearer 토큰을 실어서 인증
  const res = await axiosInstance.patch('/api/users/password', {
    currentPassword,
    newPassword
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // 비밀번호 변경 결과 반환
  return res.data
}
