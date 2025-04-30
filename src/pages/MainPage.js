// src/pages/MainPage.js
import { useNavigate } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import Main from '../components/Main';

export default function MainPage() {
  const navigate = useNavigate();

  return (
      <>
        {/* 통합 검색 */}
        <SearchBar />

        <Main
            onNavigate={navigate} // Main 안에서 페이지 이동 기능 쓰게 해주는 props 전달
        />
      </>
  );
}
