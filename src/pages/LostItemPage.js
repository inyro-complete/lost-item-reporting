// src/pages/LostItemPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LostItemBoard from '../components/Item/LostItemBoard'
import SearchBar from '../components/SearchBar'
import axiosInstance from '../services/api/axiosInstance'
import '../assets/css/LostItemPage.css'

export default function LostItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 10
  const [page, setPage] = useState(0) // 서버는 0페이지부터 시작
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('') // 검색어 상태 추가

  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get('/api/lost-items', {
        params: {
          title: keyword,
          page: page,
          size: PAGE_SIZE,
        }
      })
      setItems(res.data.content)
      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.error('분실물 목록 불러오기 실패', error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [page, keyword]) // 페이지나 검색어가 바뀔 때마다 다시 요청

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword)
    setPage(0) // 검색 시 첫 페이지로
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i)

  return (
      <div className='lost-post'>
        <h2>#잃어버리셨나요?</h2>

        <button className="write-button" onClick={() => navigate('/lost/write')}>글쓰기</button>

        <SearchBar onSearch={handleSearch} />

        <LostItemBoard items={items} />

        <div className="pagination">
          <button onClick={() => setPage(0)} disabled={page === 0}>{'<<'}</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>{'<'}</button>

          {page > 2 && <span>...</span>}

          {pageNumbers
              .filter((num) => Math.abs(page - num) <= 2)
              .map((num) => (
                  <button key={num} onClick={() => setPage(num)} disabled={num === page}>
                    {num + 1}
                  </button>
              ))}

          {page < totalPages - 3 && <span>...</span>}

          <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>{'>'}</button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>{'>>'}</button>
        </div>
      </div>
  )
}
