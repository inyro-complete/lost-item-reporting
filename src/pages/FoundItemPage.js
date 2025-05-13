// src/pages/FoundItemPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FoundItemBoard from '../components/Item/FoundItemBoard'
import SearchBar from '../components/SearchBar'
import axiosInstance from '../services/api/axiosInstance'
import '../assets/css/FoundItemPage.css'

export default function FoundItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1) // 습득물 API는 1페이지부터 시작
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('')

  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get('/api/found-items', {
        params: {
          name: keyword,
          page: page,
          size: PAGE_SIZE,
        }
      })
      setItems(res.data.content)
      setTotalPages(res.data.pageable.totalPages)
    } catch (error) {
      console.error('습득물 목록 불러오기 실패', error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [page, keyword])

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword)
    setPage(1) // 검색 시 1페이지부터
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
      <div className='found-post'>
        <h2>#주인 찾아요!</h2>

        <button className="write-button" onClick={() => navigate('/found/write')}>글쓰기</button>

        <SearchBar onSearch={handleSearch} />

        <FoundItemBoard items={items} />

        <div className="pagination">
          <button onClick={() => setPage(1)} disabled={page === 1}>{'<<'}</button>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>{'<'}</button>

          {page > 3 && <span>...</span>}

          {pageNumbers
              .filter((num) => Math.abs(page - num) <= 2)
              .map((num) => (
                  <button key={num} onClick={() => setPage(num)} disabled={num === page}>
                    {num}
                  </button>
              ))}

          {page < totalPages - 2 && <span>...</span>}

          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>{'>'}</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>{'>>'}</button>
        </div>
      </div>
  )
}
