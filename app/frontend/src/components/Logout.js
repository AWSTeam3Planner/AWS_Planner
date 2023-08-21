import classes from './NewPost.module.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom'; // useLocation 추가
import AWS from 'aws-sdk';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
} from "mdb-react-ui-kit";
import { Button, Container, Row, Col } from 'react-bootstrap';
import SuccessModal from "./SuccessModal";

function Logout({setId,setToken}) {
    const [responseMessage, setResponseMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false); // 모달 상태 추가

    const location = useLocation(); // useLocation 훅 사용
    
    const navigate = useNavigate(); //라우팅 전환 객체

    function setLogoutHandler(event){
        event.preventDefault();
        handlePostRequest();
    }
 
    function setWithdrawalHandler(event){
        event.preventDefault();
        handleDeleteRequest();
        
    }
    

  const handlePostRequest = async (event) => {
      
      try {
        const token = setToken
        const payload = {
        "ID": setId,
        "Index": 1
        };
        const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner/user";
        const response = await fetch(lambdaEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
            },
        });

      if (response.ok) {
        // 로그아웃 성공 후 다른 페이지로 이동 값 전달
        console.log(response);
        navigate('/');
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    //   console.log(token);
      const responseData = await response.json();
      console.log('POST response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making Logout Post request:', error);
    }
    
    
    
   
    
  };

  const handleDeleteRequest = async (event) => {
      
    try {
      const token = setToken
      const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner/user";
      const response = await fetch(lambdaEndpoint, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
          },
      });

    if (response.ok) {
      
      console.log(response);
      setShowSuccessModal(true); // 성공하면 모달 열기
      // 회원탈퇴 성공 후 다른 페이지로 이동
      // 일정 시간 후에 라우팅 실행
      setTimeout(() => {
        navigate('/');
      }, 3000); // 3초 후에 라우팅 실행
    } else {
      console.error("API Error:", response.status, response.statusText);
    }
  //   console.log(token);
    const responseData = await response.json();
    console.log('DELETE response:', responseData);
    setResponseMessage(responseData.message);
  } catch (error) {
    console.error('Error making Logout DELETE request:', error);
  }
  
  
  
 
  
};
  useEffect(() => {
  // 3초 후에 모달 닫기
    const timer = setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);

  return () => {
      clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 클리어
  };
  }, [showSuccessModal]);

  return (
    
        <div>
            <Container>
            <Row>
                <Col md={230} className="d-flex justify-content-end">
                    <button class="btn btn-primary" onClick={setLogoutHandler} role="button">로그아웃</button>
                    <Button variant="danger" onClick={setWithdrawalHandler}>회원탈퇴</Button>
                </Col>
            </Row>
            </Container>
           {/* SuccessModal 띄우기 */}
           <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} setText="Membership withdrawal successful!" />
        </div>   


         
        
   
    
    
    
    
  );
}

export default Logout;