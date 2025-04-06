// src/components/Main.js
import React from 'react';
import SearchBar from './SearchBar';
import {useNavigate} from "react-router-dom";
import { mockLostItems, mockFoundItems} from "../services/mockData";
import LostItemPreview from "./Item/LostItemPreview";
import FoundItemPreview from "./Item/FoundItemPreview";

export default function Main({ onNavigate }) {
  const navigate = useNavigate();

  const foundPreview = mockFoundItems.slice(0, 10)
  const lostPreview = mockLostItems.slice(0, 10)

  const handleSearch = (keyword) => {
    console.log('검색어:', keyword)
    // 나중에 API 요청 (안에 axios.get() 추가 하면 될 듯?
  }

  return (
      <>
        <main className="main-content">
          <section className="category-section">
            <h2 onClick={() => {
              navigate('/found')
            }}
            style = {{
              cursor: 'pointer',
            }}
            >#주인 찾아요!</h2>
            <button onClick={() => onNavigate('/found')}>
              습득물 게시판 바로가기
            </button>
            <FoundItemPreview items={foundPreview}/>
          </section>

          <section className="category-section">
            <h2 onClick={() => {
              navigate('/lost')
            }}
            style = {{
              cursor: 'pointer',
            }}
            >#잃어버리셨나요?</h2>
            <button onClick={() => onNavigate('/lost')}>
              분실물 게시판 바로가기
            </button>
            <LostItemPreview items={lostPreview}/>
          </section>
        </main>
      </>

  );
}
