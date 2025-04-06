// src/components/Mypage.js
// 마이페이지 UI + 내가 쓴 글 목록 + 상세 이동 + 삭제 + 수정 기능

import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { mockMyPosts } from '../services/mockData' // 지금은 mock 기준

export default function Mypage() {
  const navigate = useNavigate()
  const isLogin = !!localStorage.getItem('token')
  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    if (!isLogin) navigate('/login')
    setMyPosts(mockMyPosts.content) // 실제 API로 대체 가능
  }, [isLogin, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleChangePassword = () => {
    navigate('/change-password')
  }

  const handleWithdraw = () => {
    navigate('/withdraw')
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
          <button onClick={handleWithdraw}>탈퇴</button>
          <button onClick={handleChangePassword}>비밀번호 변경</button>
        </section>

        <section>
          <h2>작성글</h2>
          {myPosts.length === 0 ? (
              <p>작성한 글이 없습니다.</p>
          ) : (
              <table>
                <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>삭제</th>
                  <th>수정</th>
                </tr>
                </thead>
                <tbody>
                {myPosts.map((post, idx) => (
                    <tr key={`${post.type}-${post.id}`}>
                      <td>{idx + 1}</td>
                      <td>
                        <Link to={`/${post.type}/items/${post.id}`}>{post.itemName}</Link>
                      </td>
                      <td>{post.dateLost || post.dateFound}</td>
                      <td>
                        <button>
                          삭제
                        </button>
                      </td>
                      <td>
                        <button>
                          수정
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </section>

        <button onClick={handleLogout}>로그아웃</button>
      </div>
  )
}
