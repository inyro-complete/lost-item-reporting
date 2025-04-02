// src/services/mockData.js

// 얘네 어디서 썼더라...? 글쓰기?
export const mockPostFoundItem = {
  id: 1,
  title: '검정 지갑 잃어버렸어요',
  location: '상명대학교 중앙도서관',
  date: '2025-03-23',
  message: '등록 완료'
}

export const mockPostLostItem = {
  id: 2,
  title: '책 찾아요',
  location: '제1공학관',
  date: '2025-03-23',
  message: '등록 완료'
}


// 마이페이지 > 내가 쓴 글 보기에서 사용
export const mockMyPosts = [
  {
    id: 1,
    itemName: '검정 지갑',
    dateLost: '2025-03-22',
    lostLocation: '7016버스',
    status: '찾는 중'
  },
  {
    id: 2,
    itemName: '에어팟',
    dateLost: '2025-03-20',
    lostLocation: '도서관',
    status: '찾기 완료'
  }
]
