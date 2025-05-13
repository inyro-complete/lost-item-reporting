// src/components/Item/ItemEdit.js
// 분실물/습득물 글 수정 컴포넌트 (ItemWrite 스타일 통일)

import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../../assets/css/ItemWrite.css'

import { updateLostItem } from '../../services/lostItem'
import { updateFoundItem } from '../../services/foundItem'
import { useNavigate, useParams } from 'react-router-dom'

const locationOptions = [
  '버스', '버스정류장', '미래백년관', '사범대학관', '제1공학관', '제2공학관',
  '학생회관', '대학본관', '월해관', '학술정보관', '인문사회과학대학관', '중앙교수연구동',
  '경영경제대학관', '가정관', '미술관', '체육관', '생활예술관', '학군단', '기타'
]

// type(lost/found)에 따라 수정 API 다르게 호출
export default function ItemEdit({ type }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('FOUND') // 기본값 FOUND

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 필수 입력 유효성 검사
    let missingFields = []

    if (!title) missingFields.push('제목')
    if (!content) missingFields.push('내용')
    if (!date) missingFields.push('날짜')
    if (!location) missingFields.push('위치')
    if (!status) missingFields.push('상태')

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해주세요.`)
      return
    }

    // 상태 한글 → 영문 변환
    const statusMap = {
      '찾는 중': 'FINDING',
      '찾기 완료': 'FOUND',
      '습득': 'FOUND',
      '반환': 'RETURNED'
    }

    const data = {
      title,
      date,
      content,
      location,
      status: statusMap[status] || status, // 혹시 영어로 이미 들어온 값이면 그대로
      file
    }

    try {
      if (type === 'lost') {
        await updateLostItem(id, data)
      } else if (type === 'found') {
        await updateFoundItem(id, data)
      } else {
        throw new Error('잘못된 타입입니다.')
      }

      alert('수정이 완료되었습니다.')
      navigate('/mypage')
    } catch (error) {
      console.log(error)
      alert('수정에 실패하였습니다.')
    }
  }

  return (
      <div className="itemWriteWrap">
        <h2>게시물 수정</h2>
        <form onSubmit={handleSubmit}>
          {/* 날짜 */}
          <input
              className="itemInput1"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
          />

          {/* 글머리 (찾는 중, 찾기 완료) */}
          <select
              className="itemSelect"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
          >
            <option value="찾는 중">찾는 중</option>
            <option value="찾기 완료">찾기 완료</option>
            <option value="습득">습득</option>
            <option value="반환">반환</option>
          </select>

          {/* 제목 */}
          <input
              className="itemInput2"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
          />

          {/* 본문 */}
          <ReactQuill
              className="itemEditor"
              value={content}
              onChange={setContent}
          />

          {/* 위치 */}
          <select
              className="itemLocation"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- 위치 선택 --</option>
            {locationOptions.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
            ))}
          </select>

          {/* 파일 첨부 */}
          <label htmlFor="file" className="fileLabel">파일 첨부</label>
          <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
          />

          <br />
          <button type="submit">수정 완료</button>
        </form>
      </div>
  )
}
