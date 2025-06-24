// components/SearchBar.js
import { useState } from 'react'
import '../assets/css/SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('onSearch 타입:', typeof onSearch)
    onSearch(keyword)
  }


  return (
      <form onSubmit={handleSubmit} className="search-bar">
        <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
        />
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
  )
}
