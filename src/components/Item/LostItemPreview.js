// src/components/Item/LostItemPreview.js

// LostItemPreview에서 쓸 것
import React, { useRef} from 'react';
import {useNavigate} from "react-router-dom";
import '../../assets/css/LostItemPreview.css';


export default function LostItemPreview({ items }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="lost-slider-container">
      <button className="slide-button left" onClick={() => scroll('left')}>
        {'<'}
      </button>
      <div className="lost-slider" ref={sliderRef}>
        {items.map((item) => (
          <div
            key={item.lostItemId}
            className="lost-card"
            onClick={() => navigate(`/lost/${item.lostItemId}`)}
          >
            <img
              src={item.imageUrl || '/images/default_Item_Thumbnail.png'}
              alt="분실물 이미지"
            />
            <h4>{item.title}</h4>
            <p>{item.lostLocation}</p>
            <p>{new Date(item.lostDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <button className="slide-button right" onClick={() => scroll('right')}>
        {'>'}
      </button>
    </div>
  );
}