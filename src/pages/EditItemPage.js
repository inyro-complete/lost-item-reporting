// src/pages/EditItemPage.js
// 글 수정 페이지
// TODO: 수정 싹다갈아엎어야할듯

import { useParams } from 'react-router-dom'
import ItemWrite from '../components/Item/ItemWrite'

export default function EditItemPage() {
  const { type, id } = useParams()

  return (
      <div>
        <h2>게시물 수정</h2>
        <ItemWrite type={type} mode="edit" itemId={id} />
      </div>
  )
}

