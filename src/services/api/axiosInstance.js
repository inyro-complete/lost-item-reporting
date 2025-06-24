// src/services/api/axiosInstance.js
// axios 기본 설정 파일

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://lost-item-reporting-env.eba-3xgaf7bp.us-east-1.elasticbeanstalk.com',
  timeout: 5000,
})

//  토큰 자동으로 붙이도록 설정
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  console.log('🟡 인터셉터 안 토큰:', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('🟢 Authorization 헤더 붙임:', config.headers.Authorization)
  } else {
    console.log('🔴 토큰 없음')
  }
  return config
})
export default axiosInstance
