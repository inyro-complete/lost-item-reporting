// pages/ChangePasswordPage.js
import React from 'react'
import {useState} from "react";
import {changePasswordApi} from "../services/auth";
import {useNavigate} from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if(newPassword != confirmNewPassword){
      setErrorMessage('새 비밀번호가 일치하지 않습니다.')
      return
    }

    try{
      const res = await changePasswordApi(currentPassword, newPassword)
      alert(res.message)
      navigate('/mypage')
    } catch (err) {
      setErrorMessage(err.response?.data?.message || '비밀번호 변경 실패')
    }
  }

  return (
      <div>
        <h1>비밀번호 변경</h1>

        <form onSubmit = {handleSubmit}>
          <label>현재 비밀번호</label>
          <input
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value)
              }}
              required
          />

          <label>새 비밀번호</label>
          <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
              required
          />

          <label>비밀번호 확인</label>
          <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value)
              }}
              required
          />

          {errorMessage && <div className="error">{errorMessage}</div>}

          <button type="submit">확인</button>
        </form>
      </div>

  )
}
