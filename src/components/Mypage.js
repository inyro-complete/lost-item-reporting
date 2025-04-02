// components/Mypage.js
// Mypage UI

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Mypage() {
  const navigate = useNavigate()
  const isLogin = !!localStorage.getItem('token')

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')  // 로그인 안 됐으면 로그인 페이지로 이동
    }
  }, [isLogin, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleChangePassword = () => {
    navigate('/change-password')
  }

  return (
      <div>
        <h1>마이페이지</h1>

        <section>
          <h2>회원 정보</h2>
          <ul>
            <li><strong>닉네임</strong></li>
            <li><strong>이메일</strong></li>
          </ul>

          <button>탈퇴</button>
          <button onClick={handleChangePassword}>비밀번호 변경</button>
        </section>


        <section>
          <h2>작성글</h2>
          <table>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>날짜</th>
              <th>삭제</th>
            </tr>

            <tr>
              // 내용들
            </tr>
          </table>
        </section>

        <button onClick={handleLogout}>로그아웃</button>
      </div>
  )
}
