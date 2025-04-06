// src/components/Item/FoundItemBoard.js
// 습득물 카드 리스트 컴포넌트 (mock 기반)

import React, {useRef} from 'react'
import {useNavigate} from "react-router-dom";

const FoundItemBoard = ({ items }) => {
  const navigate = useNavigate()
  return (
      <div>
        {items.map((item) => (
            <div
                onClick={() => {
                  navigate(`/found/${item.foundItemId}`);
                }}
                key={item.foundItemId}>
              <img
                  src={item.imageUrl ? item.imageUrl : '/images/default_Item_Thumbnail.png'} // 이미지 없을 땐 기본 이미지 출력  TODO: default_Item_Thumbnail 이미지 추가 부탁해
                  alt="습득물 이미지"
                  width="150"
              />
              <h3>{item.title}</h3>
              <p>{item.foundLocation}</p>
              <p>{new Date(item.dateFound).toLocaleDateString()}</p>
              <p>{item.status === 'FINDING' ? '찾는 중' : '찾기완료'}</p>
            </div>
        ))}
      </div>
  )
}

export default FoundItemBoard
