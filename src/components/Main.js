// src/components/Main.js
import React from 'react'
import LostItemPreview from './Item/LostItemPreview'
import FoundItemPreview from './Item/FoundItemPreview'
import '../assets/css/Main.css';

export default function Main({ onNavigate, lostItems, foundItems }) {
  return (
      <main className="main-content">
        <section className="category-section">
          <h2
              onClick={() => {
                onNavigate('/found')
              }}
              style={{
                cursor: 'pointer',
              }}
          >
            #주인 찾아요!
          </h2>
          <button onClick={() => onNavigate('/found')}>
            습득물 게시판 바로가기
          </button>
          <FoundItemPreview items={foundItems} />
        </section>

        <section className="category-section">
          <h2
              onClick={() => {
                onNavigate('/lost')
              }}
              style={{
                cursor: 'pointer',
              }}
          >
            #잃어버리셨나요?
          </h2>
          <button onClick={() => onNavigate('/lost')}>
            분실물 게시판 바로가기
          </button>
          <LostItemPreview items={lostItems} />
        </section>
      </main>
  )
}
