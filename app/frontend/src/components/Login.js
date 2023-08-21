import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import { useNavigate } from "react-router-dom";
import Planner from "./Planner";
import NewPost from "./NewPost";
import Logout from "./Logout";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //라우팅 전환 객체
  const { authenticate } = useContext(AccountContext);
  const [accessToken, setAccessToken] = useState(""); // 토큰 상태 추가
  

  function usernameChangeHandler(event) {
    setUsername(event.target.value);
  }
  
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await authenticate(username, password);
      
      console.log("Logged in!", data);

      const accessToken = data.accessToken.jwtToken;
      
      // ID 토큰을 사용하여 API Gateway에 요청 보내기
      const apiBaseUrl =
        "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test";

      const response = await fetch(apiBaseUrl, {
        method: "GET", // 요청 메소드 설정 (GET, POST 등)
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 토큰 전달
        },
        mode: "cors",
      });
      setAccessToken(accessToken); // 토큰 설정
    
      
      if (response.ok) {
        const apiData = await response.json();
        console.log("API Response:", apiData);
        
        
        // 로그인 성공 후 다른 페이지로 이동 값 전달
        navigate('/planner', {
          state: {
            username: username,
            token: accessToken
          }
        });
        
      } else {
        console.error("API Error:", response.status, response.statusText);
        // navigate('/');
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <>
    
    
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <form onSubmit={onSubmit}>
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">
                  Annotation T3 Planner Login
                </h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  value={username}
                  onChange={usernameChangeHandler}
                  label="username"
                  id="formControlLg"
                  type="username"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />
                
                
                  <MDBBtn
                  type="submit"
                  outline
                  className="mx-2 px-5"
                  color="white"
                  size="lg"
                >
                  Login
                </MDBBtn>
                
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    </>
  );
};

export default Login;
