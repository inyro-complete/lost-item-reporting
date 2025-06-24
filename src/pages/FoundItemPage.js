// src/pages/FoundItemPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FoundItemBoard from '../components/Item/FoundItemBoard'
import SearchBar from '../components/SearchBar'
import { fetchFoundItemList } from '../services/foundItem.js'
import '../assets/css/FoundItemPage.css'

export default function FoundItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1) // 습득물 API는 1페이지부터 시작
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await fetchFoundItemList(page - 1, PAGE_SIZE, keyword) // 페이지는 0부터 API에 요청
        setItems(data.content) // API 응답 구조에 맞게 설정
        setTotalPages(data.pageable.totalPages) // totalPages 위치 수정
      } catch (error) {
        console.error('아이템 불러오기 실패', error)
      }
    }

    fetchItems()
  }, [page, keyword])

  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword)
    setPage(1) // 검색어 바뀌면 1페이지로 초기화
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
