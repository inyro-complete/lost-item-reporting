// src/pages/LostItemPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LostItemBoard from '../components/Item/LostItemBoard'
import SearchBar from '../components/SearchBar'
import axiosInstance from '../services/api/axiosInstance'
import '../assets/css/LostItemPage.css';

export default function LostItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axiosInstance.get('/api/lost-items/list', {
          params: {
            page: page - 1, // 서버는 0부터 시작하는 경우 많음
            size: PAGE_SIZE
          }
        })

        setItems(res.data.content)
        setTotalPages(res.data.totalPages)
      } catch (error) {
        console.error('분실물 목록 불러오기 실패', error)
      }
    }

    fetchItems() // fetchItems는 useEffect 안에서 만든 "서버에 데이터를 요청하는 함수"
  }, [page])

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
      <div className='lost-post'>
        <h2>#잃어버리셨나요?</h2>

        <button className="write-button" onClick={() => navigate('/lost/write')}>글쓰기</button>

        <SearchBar />

        <LostItemBoard items={items} />

        <div className="pagination">
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
