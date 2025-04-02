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
          </Routes>
        <Footer />
      </>
  );
}
