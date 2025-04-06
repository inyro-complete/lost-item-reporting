// src/pages/LostItemPage.js
// 분실물 게시판 mock + 페이징 전체 처리 (페이지 번호 버튼 포함)

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LostItemBoard from '../components/Item/LostItemBoard'
import SearchBar from '../components/SearchBar'
import { mockLostItems } from '../services/mockData'

export default function LostItemPage() {
  const navigate = useNavigate()

  const PAGE_SIZE = 30                     // 한 페이지당 보여줄 아이템 수
  const [page, setPage] = useState(1)      // 현재 페이지 번호 (1부터 시작)
  const [items, setItems] = useState([]) // 현재 페이지에 보여줄 mock 데이터 저장

  const totalPages = Math.ceil(mockLostItems.length / PAGE_SIZE) // 전체 페이지 수 계산. ceil(): 올림 처리(소숫점이 있으면 무조건 올림)

  // 페이지 변경될 때마다 mock 데이터에서 잘라서 세팅
  // useEffect로 현재 페이지 데이터 세팅
  useEffect(() => {
    // 현재 페이지에서 보여줄 mock 데이터 계산 구간
    const start = (page - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE

    // slice: 해당 범위만 잘라서 보여줌.
    const currentItems = mockLostItems.slice(start, end)
    setItems(currentItems)
  }, [page]) // page가 바뀔 때마다 실행됨.

  // 페이지 번호 배열 생성 (예: totalpages = 5라면, pageNumbers = [1,2,3,4,5])
  // Array.from(): 어떤 조건이나 길이에 맞게 새로운 배열 생성. (배열을 만들어서 리턴함 -> 그래서 pageNumbers가 배열이 된 것)
  // pageNumbers는 배열임
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1) // 화살표함수
  /* Array.from() 호출
    length: totalPages 만큼 요소 만들기
    그 안을 (i + 1)로 채우기
    → 그 결과가 배열이 됨
    → 그 배열을 pageNumbers에 넣음 */

  return (
      <div>
        <h2>#잃어버리셨나요?</h2>

        {/* 글쓰기 버튼 */}
        <button onClick={() => navigate('/lost/write')}>글쓰기</button>

        {/* 검색창 */}
        <SearchBar />

        {/* 현재 페이지 아이템 목록 출력 */}
        <LostItemBoard items={items} />

        {/* 페이징 컨트롤 */}
        <div>
          {/* 맨 앞 페이지로 이동 */}
          <button onClick={() => setPage(1)} disabled={page === 1}>
            {'<<'}
          </button>

          {/* 이전 페이지 */}
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            {'<'}
          </button>

          {/* 앞쪽 생략 ... 표시
              현재 페이지가 3보다 클 때만 ...이라는 글자를 화면에 보여줌
          */}
          {page > 3 && <span>...</span>} {/* 조건 && 결과(조건이 true일 때만 결과 실행 */}

          {/* 현재 페이지 기준 앞뒤 몇 개만 보여줌(1부터 totalPages까지 숫자 배열 만든 다음, 현재 페이지 기준 ±2만 남기고, 버튼으로 보여주는 코드) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1) // [1, 2, 3, ..., totalPages] 이라는 배열 생성됨

              // 예: page=5 -> [3,4,5,6,7]만 남음
              // num: 배열 요소의 하나하나 (예: 1,2,3,...,totalPages)
              .filter((num) => Math.abs(page - num) <= 2) // 현재 페이지 page에서 숫자 num까지의 거리 차이가 2 이하인 것만 남김.
              .map((num) => (
                  <button
                      key={num}
                      onClick={() => setPage(num)}
                      disabled={num === page}
                  >
                    {num}
                  </button>
              ))}

          {/* 뒤쪽 생략 ... 표시 */}
          {page < totalPages - 2 && <span>...</span>} {/* 현재 페이지가 마지막 페이지에서 2칸 이상 떨어져 있으면 ...을 보여줌. */}

          {/* 다음 페이지 */}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            {'>'}
          </button>

          {/* 맨 끝 페이지로 이동 */}
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            {'>>'}
          </button>

        </div>
      </div>
  )
}
