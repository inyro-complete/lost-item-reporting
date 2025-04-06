// App.js
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Header from "./components/Header";
import Footer from "./components/Footer";
import MypagePage from "./pages/MypagePage";
import LoginPage from "./pages/LoginPage";
import FoundItemPage from "./pages/FoundItemPage";
import LostItemPage from "./pages/LostItemPage";
import ItemWritePage from "./pages/ItemWritePage";
import SignupPage from "./pages/SignupPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ItemDetail from "./components/Item/ItemDetail";
import ItemEdit from "./components/Item/ItemDetail";
import WithdrawPage from "./pages/WithDrawPage";

export default function App() {
  return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/found" element={<FoundItemPage />} />
          <Route path="/found/write" element={<ItemWritePage />} />
          <Route path="/lost" element={<LostItemPage />} />
          <Route path="/lost/write" element={<ItemWritePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/lost/:id" element={<ItemDetail type="lost" />} />
          <Route path="/found/:id" element={<ItemDetail type="found" />} />
          <Route path="/lost/edit/:id" element={<ItemEdit type="lost" />} />
          <Route path="/found/edit/:id" element={<ItemEdit type="found" />} />
          <Route path="/withdraw" element={<WithdrawPage />} />

        </Routes>
        <Footer />
      </>
  );
}
