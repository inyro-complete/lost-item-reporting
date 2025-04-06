// src/components/Item/LostItemBoard.js
// 분실물 카드 리스트 컴포넌트 (mock 기반)

import React from 'react'
import {useNavigate} from "react-router-dom";

const LostItemBoard = ({ items }) => {
  const navigate = useNavigate()

  return (
      <div>
        {items.map((item) => ( // 각 분실물 데이터를 반복해서 카드로 출력
            <div key={item.lostItemId}
              onClick={() => {
                navigate(`/lost/${item.lostItemId}`);
              }}

            > {/* 리액트 고유 key 설정 (map 쓸 떄 필요한 필수 속성)*/}
              {/* 이미지 없을 때 -> 기본 이미지 출력
              있으면 -> 진짜 이미지 출력*/}
              <img
                  src={item.imageUrl ? item.imageUrl : '/images/default_Item_Thumbnail.png'} // TODO: default_Item_Thumbnail 이미지 추가
                  alt="분실물 이미지"
                  width="150"
              />

              <h3>{item.title}</h3>
              <p>{item.lostLocation}</p>
              <p>{new Date(item.lostDate).toLocaleDateString()}</p> {/* 날짜를 한국식 날짜 형식으로 변환 */}
              <p>{item.status === 'FINDING' ? '찾는 중' : '찾기완료'}</p>
            </div>
        ))}
      </div>
  )
}

export default LostItemBoard
