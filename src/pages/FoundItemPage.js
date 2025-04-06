// src/pages/FoundItemPage.js
// 습득물 게시판 mock + 페이징 전체 처리 (페이지 번호 버튼 포함)

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FoundItemBoard from '../components/Item/FoundItemBoard'
import SearchBar from '../components/SearchBar'
import { mockFoundItems } from '../services/mockData'

export default function FoundItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 30
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])

  const totalPages = Math.ceil(mockFoundItems.length / PAGE_SIZE)

  useEffect(() => {
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    const currentItems = mockFoundItems.slice(start, end)
    setItems(currentItems)
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
