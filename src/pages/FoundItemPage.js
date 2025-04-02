// src/pages/FoundItemPage.js
// 습득물 게시판 페이지

import React from 'react'
import FoundItemBoard from '../components/Item/FoundItemBoard'
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function FoundItemPage() {
  const navigate = useNavigate()

  return (
      <div>
        <h2>#주인 찾아요!</h2>
        <button onClick={() => {
          navigate('/found/write')
        }}>글쓰기
        </button>


        {/* 습득물 검색 */}
        <SearchBar />
        <FoundItemBoard/>
      </div>
  )
}
