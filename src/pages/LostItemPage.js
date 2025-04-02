// src/pages/LostItemPage.js
// 분실물 게시판 페이지

import React from 'react'
import LostItemBoard from '../components/Item/LostItemBoard'
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";


export default function FoundItemPage() {
  const navigate = useNavigate()

  return (
      <div>
        <h2>#잃어버리셨나요?</h2>

        <button onClick={() => {
          navigate('/lost/write')
        }}>글쓰기
        </button>

        {/* 분실물 검색 */}
        <SearchBar />
        <LostItemBoard/>
      </div>
  )
}