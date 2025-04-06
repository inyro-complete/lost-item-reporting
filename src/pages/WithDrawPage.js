// src/pages/WithdrawPage.js
// api 명세서 아직 XX 모킹도x
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function WithdrawPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password) {
      alert('비밀번호를 입력하세요.')
      return
    }

    const confirm = window.confirm('정말 탈퇴하시겠습니까?')
    if (!confirm) return

    // 여기에 탈퇴 API 연결 예정
    alert('탈퇴 완료되었습니다.')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
      <div>
        <h2>회원 탈퇴</h2>
        <form onSubmit={handleSubmit}>
          <label>비밀번호 확인</label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">탈퇴하기</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </form>
      </div>
  )
}
