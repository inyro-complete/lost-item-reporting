// src/components/Mypage.js
// 마이페이지 UI + 내가 쓴 글 목록 + 상세 이동 + 삭제 + 수정 기능

import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { deleteLostItem } from '../services/lostItem'
import { deleteFoundItem } from '../services/foundItem'
import { getMyPosts } from '../services/user'
import '../assets/css/Mypage.css';

export default function Mypage() {
  const navigate = useNavigate()
  const isLogin = !!localStorage.getItem('token')
  const [myPosts, setMyPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 글 목록 불러오기
  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!isLogin) {
        navigate('/login')
        return
      }

      try {
        const lostPosts = await getMyPosts('lost', 1, 10)
        const foundPosts = await getMyPosts('found', 1, 10)

        const mergedPosts = [
          ...lostPosts.content.map(post => ({ ...post, type: 'lost' })),
          ...foundPosts.content.map(post => ({ ...post, type: 'found' }))
        ]

        setMyPosts(mergedPosts)
        setHasMore(
            lostPosts.pageable.totalPages > 1 || foundPosts.pageable.totalPages > 1
        )
      } catch (error) {
        console.log(error)
        alert('내 작성글 조회에 실패했습니다.')
      }
    }

    fetchMyPosts()
  }, [isLogin, navigate])

  // 더 보기
  const handleLoadMore = async () => {
    const nextPage = page + 1

    try {
      const lostPosts = await getMyPosts('lost', nextPage, 10)
      const foundPosts = await getMyPosts('found', nextPage, 10)

      const mergedPosts = [
        ...lostPosts.content.map(post => ({ ...post, type: 'lost' })),
        ...foundPosts.content.map(post => ({ ...post, type: 'found' }))
      ]

      if (mergedPosts.length === 0) {
        setHasMore(false)
        return
      }

      setMyPosts(prev => [...prev, ...mergedPosts])
      setPage(nextPage)
    } catch (error) {
      console.log(error)
      alert('더 불러오기 실패')
    }
  }

  // 글 삭제
  const handleDelete = async (post) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?')
    if (!confirmDelete) return

    const token = localStorage.getItem('token')
    if (!token) {
      alert('로그인이 필요합니다.')
      navigate('/login')
      return
    }

    let result
    if (post.type === 'lost') {
      result = await deleteLostItem(post.id, token)
    } else if (post.type === 'found') {
      result = await deleteFoundItem(post.id, token)
    } else {
      alert('알 수 없는 게시글 유형입니다.')
      return
    }

    if (result === 200) {
      alert('삭제 완료되었습니다.')
      setMyPosts(prev => prev.filter(p => p.id !== post.id))
    } else if (result.status === 403) {
      alert('삭제 권한이 없습니다.')
    } else if (result.status === 401) {
      alert('로그인이 필요하거나 토큰이 만료되었습니다.')
    } else {
      alert('알 수 없는 오류가 발생했습니다.')
    }
  }

  // 글 수정
  const handleEdit = (post) => {
    if (post.type === 'lost') {
      navigate(`/lost/items/${post.id}/edit`)
    } else if (post.type === 'found') {
      navigate(`/found/items/${post.id}/edit`)
    } else {
      alert('알 수 없는 게시글 유형입니다.')
    }
  }

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
      <div className="mypage-container">
        <h1>마이페이지</h1>

        <section className="user-info">
          <h2>회원 정보</h2>
          <ul>
            <li><strong>닉네임</strong></li>
            <li><strong>이메일</strong></li>
          </ul>
          <button onClick={handleWithdraw}>탈퇴</button>
          <button onClick={handleChangePassword}>비밀번호 변경</button>
        </section>

        <section className="post-section">
          <h2>작성글</h2>
          {myPosts.length === 0 ? (
              <p>작성한 글이 없습니다.</p>
          ) : (
              <>
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
                          <button onClick={() => handleDelete(post)}>삭제</button>
                        </td>
                        <td>
                          <button onClick={() => handleEdit(post)}>수정</button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>

                {hasMore && (
                    <button onClick={handleLoadMore} style={{ marginTop: '20px' }}>
                      더 보기
                    </button>
                )}
              </>
          )}
        </section>

        <button onClick={handleLogout}className="logout-button">로그아웃</button>
      </div>
  )
}
