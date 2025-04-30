// src/components/Item/ItemWrite.js
// 분실물, 습득물 공동 글쓰기 컴포넌트
// 글쓰기 폼 재활용을 위한 것

import React, {useState} from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../../assets/css/ItemWrite.css';

import { createLostItem } from '../../services/lostItem'
import { createFoundItem } from '../../services/foundItem'
import {useNavigate} from "react-router-dom";

const locationOptions = [
  '버스', '버스정류장', '미래백년관', '사범대학관', '제1공학관', '제2공학관',
  '학생회관', '대학본관', '월해관', '학술정보관', '인문사회과학대학관', '중앙교수연구동',
  '경영경제대학관', '가정관', '미술관', '체육관', '생활예술관', '학군단', '기타'
]


// type을 보고 등록 API를 다르게 호출함.
export default function ItemWrite({type}) {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('찾는 중') // 글머리 상태 관리, 기본 값은 찾는 중

  const handleSubmit = async(e) => {
    e.preventDefault();

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


    // 상태 한글 -> 영문 매핑
    // if문과 똑같은 효과 (객체리터럴. 키로 값 찾기)
    const statusMap = {
      '찾는 중' : 'FINDING',
      '찾기 완료' : 'FOUND'
    }

    const data = {
      title,
      date,
      content,
      location,
      status: statusMap[status], // 매핑! "status라는 값에 대응하는 결과를 객체에서 바로 찾아옴"
      file
    }

    {/* createLostItem, createFoundItem: API 함수. 각각 services/lostItem.js, service/foundItem.js*/}
    try {
      if (type === "lost") {
        await createLostItem(data)
      } else if (type === "found") {
        await createFoundItem(data)
      }

      alert("등록이 완료되었습니다.")
    } catch (error) {
      console.log(error)
      alert("등록에 실패하였습니다.")
    }

    navigate(-1)

  }
  return (
      <div className="itemWriteWrap">
        <h2>게시물 등록</h2>
        <form onSubmit={handleSubmit}>
          { /* 날짜 */}
          <input
            className="itemInput1"
            id="date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
            }}
          />

          {/* 글머리 (찾는중or찾기완료)*/}
          <select
            className="itemSelect"
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
            }}>

            <option value="찾는 중">찾는중</option>
            <option value="찾기 완료">찾기 완료</option>
          </select>

          {/* 제목 적는 칸 */}
          <input
            className ="itemInput2"
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
            // ReactQill은 일반 input이 아니라서 그냥 value로 넣음
          />

          {/* 위치 */}
          {/*드롭다운 메뉴 만들기*/}
          <select
            className="itemLocation"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">-- 위치 선택 --</option> {/* 기본 안내 문구*/}
            {/* loc: 배열 안의 아이템들, i: index */}
            {locationOptions.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
            ))}
          </select>



          {/*파일 첨부*/}
          <label htmlFor="file" className="fileLabel">파일 첨부</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}

          />

          <br />
          <button type="submit">글 등록</button>
        </form>
      </div>
  );
}
