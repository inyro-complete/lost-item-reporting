// src/pages/FoundItemPage.js
// 습득물 게시판 (서버 데이터 + 페이징 처리)

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FoundItemBoard from '../components/Item/FoundItemBoard'
import SearchBar from '../components/SearchBar'
import axiosInstance from '../services/api/axiosInstance'

export default function FoundItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  // 습득물 목록 조회 (페이징)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axiosInstance.get('/api/found-items', {
          params: {
            page: page,
            size: PAGE_SIZE
          }
        })

        setItems(res.data.content)
        setTotalPages(res.data.pageable.totalPages)
      } catch (error) {
        console.error('습득물 목록 불러오기 실패', error)
      }
    }

    fetchItems()
  }, [page])


  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
      <div>
        <h2>#주인 찾아요!</h2>

        <button onClick={() => navigate('/found/write')}>글쓰기</button>

        <SearchBar />

        <FoundItemBoard items={items} />

        <div>
          <button onClick={() => setPage(1)} disabled={page === 1}>
            {'<<'}
          </button>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            {'<'}
          </button>

          {page > 3 && <span>...</span>}

          {pageNumbers
              .filter((num) => Math.abs(page - num) <= 2)
              .map((num) => (
                  <button
                      key={num}
                      onClick={() => setPage(num)}
                      disabled={num === page}
                  >
                    {num}
                  </button>
              ))}

          {page < totalPages - 2 && <span>...</span>}

          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            {'>'}
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            {'>>'}
          </button>
        </div>
      </div>
  )
}
