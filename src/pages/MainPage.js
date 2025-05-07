// src/pages/MainPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import Main from '../components/Main'
import axiosInstance from '../services/api/axiosInstance'

export default function MainPage() {
  const navigate = useNavigate()

  const [lostItems, setLostItems] = useState([])
  const [foundItems, setFoundItems] = useState([])

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await axiosInstance.get('/api/lost-items/list', {
          params: { page: 0, size: 10 }
        })
        setLostItems(res.data.content)
      } catch (error) {
        console.error('분실물 미리보기 로딩 실패', error)
      }
    }

    const fetchFoundItems = async () => {
      try {
        const res = await axiosInstance.get('/api/found-items', {
          params: { page: 0, size: 10 }
        })
        setFoundItems(res.data.content)
      } catch (error) {
        console.error('습득물 미리보기 로딩 실패', error)
      }
    }

    fetchLostItems()
    fetchFoundItems()
  }, [])

  return (
      <>
        {/* 통합 검색 */}
        <SearchBar />

        {/* Main 컴포넌트로 데이터 넘기기 */}
        <Main
            onNavigate={navigate}
            lostItems={lostItems}
            foundItems={foundItems}
        />
      </>
  )
}
