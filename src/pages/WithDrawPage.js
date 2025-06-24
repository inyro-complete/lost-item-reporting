import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../services/user' // 이거 꼭 추가

export default function WithdrawPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password) {
      alert('비밀번호를 입력하세요.')
      return
    }

    const confirm = window.confirm('정말 탈퇴하시겠습니까?')
    if (!confirm) return

    try {
      const res = await deleteUser(password)
      alert('탈퇴 완료: ' + res.message)
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('탈퇴 실패: ' + (err.response?.data?.message || '서버 오류'))
    }
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
