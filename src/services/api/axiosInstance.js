// src/services/api/axiosInstance.js
// axios 기본 설정 파일

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://Lost-item-reporting-env.eba-3xgaf7bp.us-east-1.elasticbeanstalk.com/auth/loginLost-item-reporting-env.eba-3xgaf7bp.us-east-1.elasticbeanstalk.com', // 임시 더미 주소
  timeout: 5000, // 요청 제한 시간 (5초)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
