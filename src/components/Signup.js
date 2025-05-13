// src/components/Signup.js

import { checkEmailApi, loginApi, signupApi } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/SignupPage.css'

export default function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 이메일 중복 체크
  const handleCheckEmail = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const res = await checkEmailApi(email)
      if (res.available) {
        alert(res.message)
      } else {
        setErrorMessage(res.message)
      }
    } catch (error) {
      setErrorMessage('중복 체크 실패')
    }
  }

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      // 회원가입 요청
      await signupApi({
        name,
        email,
        password,
        confirmPassword
      })

      console.log('회원가입 성공')

      // 회원가입 성공하면 바로 로그인 시도
      const loginRes = await loginApi(email, password)

      // 토큰 저장
      localStorage.setItem('token', loginRes.accessToken)
      localStorage.setItem('refreshToken', loginRes.refreshToken)

      // 메인 페이지로 이동
      navigate('/')
    } catch (err) {
      setErrorMessage(err.response?.data?.message || '회원가입 실패')
    }
  }

  return (
      <div className="signupWrap">
        <div className="title">회원가입</div>
        <form onSubmit={handleSubmit}>
          {/* 이메일 */}
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일"
          />

          {/* 중복 체크 */}
          <button type="button" onClick={handleCheckEmail}>중복체크</button>

          {/* 비밀번호 */}
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호"
          />

          {/* 비밀번호 확인 */}
          <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="비밀번호 확인"
          />

          {/* 닉네임 */}
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="닉네임"
          />

          {/* 에러 메시지 */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          <button type="submit">회원가입</button>

          <p>
            <Link to="/login">이미 회원이신가요?</Link>
          </p>
        </form>
      </div>
  )
}
