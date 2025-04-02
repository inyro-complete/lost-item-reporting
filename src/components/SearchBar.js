// components/SearchBar.js
import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
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
