// src/components/Item/LostItemPreview.js
// 분실물 미리보기 카드 10개 보여주는 컴포넌트


import React, { useRef } from 'react';
import {useNavigate} from "react-router-dom";
import '../../assets/css/FoundItemPreview.css';

export default function FoundItemPreview({ items }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="found-slider-container">
      <button className="slide-button left" onClick={() => scroll('left')}>{'<'}</button>
      <div className="found-slider" ref={sliderRef}>
        {items.map((item) => (
          <div
            key={item.foundItemId}
            className="found-card"
            onClick={() => navigate(`/found/${item.foundItemId}`)}
          >
            <img
              src={item.imageUrl || '/images/default_Item_Thumbnail.png'}
              alt="분실물 이미지"
            />
            <h4>{item.title}</h4>
            <p>{item.foundLocation}</p>
            <p>{new Date(item.dateFound).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <button className="slide-button right" onClick={() => scroll('right')}>{'>'}</button>
    </div>
  );
}