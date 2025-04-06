// src/components/Item/LostItemPreview.js
// 분실물 미리보기 카드 10개 보여주는 컴포넌트


import React from 'react';
import {useNavigate} from "react-router-dom";

export default function FoundItemPreview({ items }) {
  const navigate = useNavigate();
  return (
      <div>
        {items.map((item) => (
            <div
                key={item.lostItemId}
                onClick={() => {
                  navigate(`/found/${item.foundItemId}`);
                }}
                style={{cursor:"pointer"}}
            >
              <img
                  src={item.imageUrl ? item.imageUrl : '/images/default_Item_Thumbnail.png'}
                  alt="분실물 이미지"
              />
              <h4>{item.title}</h4>
              <p>{item.foundLocation}</p>
              <p>{new Date(item.dateFound).toLocaleDateString()}</p>
            </div>
        ))}
      </div>
  )
}
