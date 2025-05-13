// pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';
import '../assets/css/LoginPage.css';
import { loginApi } from '../services/auth';
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate(); // 훅 호출

  const handleLogin = async (email, password) => {
    try {
      const data = await loginApi(email, password)

      localStorage.setItem('token', data.accessToken)         // accessToken 저장
      localStorage.setItem('refreshToken', data.refreshToken) // refreshToken도 저장

      navigate('/')
    } catch (e) {
      alert('로그인 실패')
      console.error(e)
    }
  }

  return (
      <div className="loginPageWrapper">
        <Login onLogin={handleLogin}/>
        {/*
        props임. onLogin 실행 시 handleLogin 실행됨
        "Login에게 onLogin이라는 이름으로 handleLogin 함수를 줌"
        즉 props로 함수 하나를 전달하는 것임
        나중에 Login 컴포넌트 안에서 onLogin(email, password) 실행하면 → handleLogin(email, password)가 실행됨.
        */}
      </div>
  )
}


