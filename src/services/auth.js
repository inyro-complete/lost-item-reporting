// services/auth.js
import axios from 'axios'
import { USE_MOCK } from '../config'

// 로그인 API
export const loginApi = async (email, password) => {
  if (USE_MOCK) {
    console.log('mock login:', email, password)

    return {
      token: 'fake-token-123456',
      user: {
        id: 1,
        email,
        name: '테스트 유저'
      }
    }
  }

  const res = await axios.post('/api/users/login', {
    email,
    password
  })
  return res.data
}

// 회원가입 API
export const signupApi = async (signupData) => {
  if (USE_MOCK) {
    console.log('mock signup:', signupData)

    return {
      message: '회원가입이 완료되었습니다.',
      user: {
        id: 2,
        email: signupData.email
      }
    }
  }

  const res = await axios.post('/api/users/signup', signupData)
  return res.data
}

// 로그아웃 API

export const logoutApi = async () => {
  const USE_MOCK = true
  const token = localStorage.getItem('token') // 로컬 스토리지에서 저장된 토큰 꺼냄(로그인한 사용자라면 있어야 정상)

  if (!token) return // 토큰이 없으면 로그아웃 보낼 이유 없음 -> 바로 리턴

  if (USE_MOCK) {
    console.log('mock logout: token =', token)
    return {
      message: '모킹 로그아웃 성공',
    }
  }

  // axios.post(url, data, config): 요청보낼주소, 요청바디, 헤더나 인증 설정 같은 옵션들
  // null : 보낼 요청 바디 없음
  const res = await axios.post('/api/users/logout', null, {
    headers: {
      Authorization: `Bearer ${token}`, // 진짜 토큰 값을 문자열로 붙임
    }
  })

  return res.data
}

// 이메일 중복 체크
export const checkEmailApi = async (email) => {
  const USE_MOCK = true

  if (USE_MOCK) {
    // 사용 가능한 이메일일 때
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

  // 실제 API 요청
  const res = await axios.get(`/api/users/check-email?email=${email}`)
  return res.data
}

// 비밀번호 변경
export const changePasswordApi = async(currentPassword, newPassword) => {
  const USE_MOCK = true
  if (USE_MOCK) {
    return{
      message: '비밀번호가 성공적으로 변경되었습니다.'
    }
  }


  // 실제 API 요청
  const token = localStorage.getItem('token') // token이 없으면 null 저장됨
  if(!token) throw new Error('토큰 없음') // token이 없으면 요청하지 말고, error를 발생시켜라
  // new Error(): js 내장 객체로 여러 객체를 생성함. throw는 그걸 터뜨려서 catch로 던지는 행위 (Mypage.js에서 try/catch 할 거임)
  //!token: false인값(null, undefined, '')이면 true로 반환됨

  const res = await axios.patch('/api/users/password', {
    currentPassword,
    newPassword
  }, {
    headers: {
    Authorization: `Bearer ${token}`,
  }
  })
  return res.data
}