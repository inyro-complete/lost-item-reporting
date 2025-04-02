// components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 navigate 사용
import { Link } from 'react-router-dom';
import '../assets/css/LoginPage.css';

export default function Login({ onLogin }) { // onLogin이라는 이름으로 handleLogin 함수를 받음(props)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate(); // useNavigate 호출

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // 로그인 요청 실행(loginApi 요청이 날라감)
  };

  const handleEmail = (e) => {
    setEmail(e.target.value); // 사용자가 입력한 email(=e.target.value)를 setEmail이라는 state 변경함수를 통해 email의 state를 변경함.

    // 이메일 값이 valid한지 체크하는 과정 -> 자바스크립트 정규 표현식 사용
    const regex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) { // valid 하다면
      setEmailValid(true); // emailValid의 state를 true로 설정
    } else { // valid 하지 못하면
      setEmailValid(false);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value); // 사용자가 입력한 비번을 password state에 저장함.
    const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 이메일과 비번의 state가 변경될 때마다 버튼 활성화 여부 체크
  useEffect(()=>{
    if(emailValid && pwValid){
      setNotAllow(false); // 활성화
    } else{
      setNotAllow(true); // 비활성화
    }
  }, [emailValid, pwValid])

  return (
      <div className="page">
        <div className="titleWrap">
          이메일과 비밀번호를
          <br/>
          입력해주세요
        </div>

        <div className="contentWrap">
          <div className="inputTitle">이메일 주소</div>
          <div className="inputWrap">
            <input
                type="text"
                className="input"
                placeholder="text@gmail.com"

                // 사용자가 입력한 값을 setEmail 함수를 통해 email 상태에 저장하는 과정
                value={email}
                onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {
                !emailValid && email.length > 0 && ( // emailValid의 상태가 false일 때 && 사용자가 이메일을 한 글자라도 입력했을 때 에러 메세지 출력
                    <div>올바른 이메일을 입력해주세요.</div>
                )
            }
          </div>

          <div className="inputTitle">비밀번호</div>
          <div className="inputWrap">
            <input
                type="password"
                className="input"
                placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                value={password}
                onChange={handlePassword}
            />
          </div>
          <div className="errorMessageWrap">
            {
                !pwValid && password.length > 0 && (
                    <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                )
            }
          </div>
        </div>

        <div>
          <button
              disabled={notAllow}
              className="bottomButton"
              onClick={handleSubmit}
          >
            로그인
          </button>
        </div>

        <div className="footerLinks">
          <p>
            <Link to='/signup'>회원이 아니신가요?</Link>
          </p>
        </div>
      </div>
  );
}
