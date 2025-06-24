import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/FoundItemBoard.css'  // 맞는 경로 확인

const FoundItemBoard = ({ items }) => {
  const navigate = useNavigate()

  return (
      <div className="found-item-board">
        {items.map((item) => (
            <div
                key={item.foundItemId}
                className="found-item-card"
                onClick={() => navigate(`/found/${item.foundItemId}`)}
            >
              <img
                  src={item.imageUrl ? item.imageUrl : '/images/default_Item_Thumbnail.png'}
                  alt="습득물 이미지"
                  width="150"
                  height="150"
              />
              <h3>{item.title}</h3>
              <p>{item.foundLocation}</p>
              <p>{new Date(item.foundDate).toLocaleDateString()}</p>
              <p>{item.status === 'FINDING' ? '찾는 중' : '찾기완료'}</p>
            </div>
        ))}
      </div>
  )
}

export default FoundItemBoard
