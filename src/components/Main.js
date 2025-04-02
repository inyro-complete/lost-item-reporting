// src/components/Main.js
import React from 'react';
import SearchBar from './SearchBar';

export default function Main({ onNavigate }) {
  const handleSearch = (keyword) => {
    console.log('검색어:', keyword)
    // 나중에 API 요청 (안에 axios.get() 추가 하면 될 듯?
  }

  return (
      <>

        <main className="main-content">
          <section className="category-section">
            <h2>#주인 찾아요!</h2>
            <button onClick={() => onNavigate('/found')}>
              습득물 게시판 바로가기
            </button>
            습득물이 카드 형식으로 보여질 예정
          </section>

          <section className="category-section">
            <h2>#잃어버리셨나요?</h2>
            <button onClick={() => onNavigate('/lost')}>
              분실물 게시판 바로가기
            </button>
            분실물 카드 형식으로 보여질 예정
          </section>
        </main>
      </>

  );
}
