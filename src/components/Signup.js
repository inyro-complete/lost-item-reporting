// components/Signup.js
import {checkEmailApi, loginApi, signupApi} from '../services/auth';
import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import '../assets/css/SignupPage.css';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 이메일 중복 체크
  const handleCheckEmail = async (e) => {
    e.preventDefault(); // 폼 안에서 버튼 누르는 거니까 필요함
    setErrorMessage('') // 초기화

    try {
      const res = await checkEmailApi(email)
      if (res.available) {
        alert(res.message); // 사용 가능한 아이디입니다. (알림창 띄워서 즉시 보여주기)
      } else { // false일 경우 -> setErrorMessage(<div className="error"> 같은 곳에 화면 내 텍스트로 표실할 것임. (결고 메세지처럼 화면에 고정 표시)
        setErrorMessage(res.message)
      }
    } catch (error) {
      setErrorMessage('중복 체크 실패')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 1. 회원가입 요청
      // res: 응답 객체
      // res.data: 서버가 보내 준 응답 내용 중 진짜 본문, 즉 응답 예시

      const res = await signupApi({
        name,
        email,
        password,
        confirmPassword,
      })

      console.log('회원가입 성공', res.data)

      // 2. 로그인 요청(자동 로그인)
      const loginRes = await loginApi(email, password)

      // 3. 토큰 저장
      localStorage.setItem('token', loginRes.token);

      // 4. 메인페이지로 이동
      navigate('/')
    } catch (err) { // err: axios 에러 정보를 확인 할 수 있는 객체
      // 에러 응답 처리
      setErrorMessage(err.response?.data?.error || '회원가입 실패') // 서버가 에러 메세지를 보내면 그걸 보여주고, 그게 없으면 기본 메세지 '회원가입 실패' 를 보여줘라.
    }

  };

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

          {/* 비밀 번호*/}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="비밀번호"
          />

          {/* 비밀번호 확인*/}
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
              onChange={(e) => {
                setName(e.target.value)
              }}
              required
              placeholder="닉네임"
          />

          {/* 에러 메세지 호출
          errorMessage가 비어있지 않으면 true -> 랜더링
          errorMessage가 빈 문자열("")이면 false -> 랜더링 X
          */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          <button type="submit">회원가입</button>

          <p>
            <Link to="/login">이미 회원이신가요?</Link>
          </p>
        </form>
      </div>
  );
}
