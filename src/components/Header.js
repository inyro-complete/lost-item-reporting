// components/Header.js
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutApi } from '../services/auth'
import { useEffect, useState } from 'react'
import smuLogo from '../assets/img/smuLogo.png'
import '../assets/css/Header.css';


export default function Header() {
  const navigate = useNavigate()

  // 토큰 유무로 로그인 여부 판단
  const isLogin = !!localStorage.getItem('token')

  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(()=>{
    if(isDarkMode){
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  // 로그아웃 버튼 클릭시 실행
  const handleLogout = async () => {
    try {
      await logoutApi() // 서버에도 로그아웃 설정
    } catch(err) {
      console.log('서버 로그아웃 실패', err)
    }

    // (서버랑 관계 없음) 프론트 상태 정리
    localStorage.removeItem('token') // 토큰 삭제 => 로그아웃!
    navigate('/')
  }

  return (
      <div className="header-container">
        <header className="header-wrap">

          {/* 왼쪽: 로고 */}
          <div className="header-left-wrap">
            <Link to="/" className="logo-text">
              <img src={smuLogo} alt="로고" style={{ width: '50px', height: 'auto' }} />
            </Link>
          </div>

          {/* 오른쪽: 버튼들 */}
          <div className="header-right-wrap">

            {/* 다크모드, 토글 형식의 아이콘으로 변경하면 좋을듯? */}
            <button className="header-button" onClick={() => {setIsDarkMode(!isDarkMode)}}>
              {isDarkMode? '라이트모드' : '다크모드'}
            </button>

            {/* 쪽지함 */}
            <Link to="/messages" className="header-button">
              쪽지함
            </Link>

            {/* 로그인 여부에 따라 조건부 버튼 렌더링
            삼항 연산자 사용 조건 ? 참일 때 실행 : 거짓일 때 실행

            */}
            {isLogin ? (
                <>
                  {/* 로그인 O → 마이페이지 / 로그아웃 */}
                  <button className="header-button" onClick={() => navigate('/mypage')}>
                    MY
                  </button>
                  <button
                      className="header-button"
                      onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </>
            ) : (
                <>
                  {/* 로그인 X → 로그인 / 회원가입 */}
                  <button className="header-button" onClick={() => navigate('/login')}>
                    로그인
                  </button>
                  <button className="header-button" onClick={() => navigate('/signup')}>
                    회원가입
                  </button>
                </>
            )}
          </div>
        </header>
      </div>
  )
}
