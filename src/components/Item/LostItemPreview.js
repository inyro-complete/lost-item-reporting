// src/components/Item/LostItemPreview.js

// LostItemPreview에서 쓸 것
import React from 'react';
import {useNavigate} from "react-router-dom";

export default function LostItemPreview({ items }) {
  const navigate = useNavigate();
  return (
      <div>
        {items.map((item) => (
          <div
              onClick={() => {
                navigate(`/lost/${item.lostItemId}`)}}
              style={{cursor: 'pointer'}}
              key={item.lostItemId}
          >
            <img
                src={item.imageUrl ? item.imageUrl : '/images/default_Item_Thumbnail.png'}
                alt="분실물 이미지"
            />
            <h4>{item.title}</h4>
            <p>{item.lostLocation}</p>
            <p>{new Date(item.lostDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
  )
}
