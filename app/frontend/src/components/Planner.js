import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import moment from "moment";

import MainHeader from './MainHeader'
import NewPost from './NewPost';
import Modal from './Modal';

import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import './CustumCalendar.css';
import ReadPost from './ReadPost';
import Logout from './Logout';
import InfoModal from './InfoModal';
import { useLocation } from 'react-router-dom'; // useLocation 추가

function Planner() {

  const [lambdaData, setLambdaData] = useState(null);
  const [value, onChange] = useState(new Date());
  const [inputmodalIsVisible, setInputModalIsVisible] = useState(false);
  const [updatemodalIsVisible, setUpdateModalIsVisible] = useState(false);
  const [deletemodalIsVisible, setDeleteModalIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [infoData, setinfoData] = useState(false);
  
  let informationList;

  // 1. useLocation 훅 취득
  const location = useLocation();

  // 2. location.state 에서 파라미터 취득
  const userId = location.state.username;
  const setToken = location.state.token;


  function showinputModalHandler(){
    setInputModalIsVisible(true);
  }

  function hideinputModalHandler(){
    setInputModalIsVisible(false);
  }

  function showupdateModalHandler(){
    setUpdateModalIsVisible(true);
  }

  function hideupdateModalHandler(){
    setUpdateModalIsVisible(false);
  }

  function showdeleteModalHandler(){
    setDeleteModalIsVisible(true);
  }

  function hidedeleteModalHandler(){
    setDeleteModalIsVisible(false);
  }
  //모든일정조회 버튼핸들러
  function setClickHandler(){     
    informationList = data
                        .filter((item) => item.ID === userId)
                        .map(item => item); // 날짜만 추출하여 리스트로 저장



    // SuccessModal 띄우기
    setShowSuccessModal(true);

    setinfoData(informationList);
    console.log(infoData);
    
  }
  
  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        const token = setToken;
        const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
        const response = await fetch(lambdaEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰을 "Bearer" 스타일로 전달
          },
        }) 
        
        const jsonData = await response.json();
        // 받아온 JSON 데이터의 body 부분을 출력합니다.
        setLambdaData(jsonData.body);
        if (Array.isArray(jsonData.body)) {
          setData(jsonData.body);
        } else {
          console.error('Fetched data is not an array:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching Lambda data:', error);
      }
    };

    fetchLambdaData();
  }, []);
  
  //시작날짜 리스트
  const dateList = data
                    .filter(item => item.ID === userId) // 닉네임이 일치하는 항목만 필터링
                    .map(item => item.DATE); // 날짜만 추출하여 리스트로 저장
                    

  const date = moment(value).format("YYYY-MM-DD") ;
  
  return (
    <>
    <Logout setId={userId} setToken={setToken} />  {/*Logout 컴포넌트에 토큰 전달 */}
    <MainHeader onInputPost={showinputModalHandler} onUpdatePost={showupdateModalHandler} onDeletePost={showdeleteModalHandler}></MainHeader>
    
    
    
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정      
      
        tileContent={({ date, view }) => {

          let html = [];
          if (dateList.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div className="dot"></div>);
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  {html}
                </div>
              </>
          );
        }}
        
      /> 
    </div>
    {/* 모든일정조회 버튼 */}
    <div className="d-flex justify-content-start">
      <button onClick={setClickHandler} type="button" class="btn btn-secondary btn-lg ms-5">모든 일정 조회</button>
    </div>
    <InfoModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} infoData={infoData}></InfoModal>
    <div className="text-gray-500 mt-4">
    
    
    

   
    
   
    {
    inputmodalIsVisible ===true ? 
    <Modal onClose={hideinputModalHandler}>    
      <NewPost onCancel={hideinputModalHandler} onDate={date} setId={userId} setToken={setToken}></NewPost>
    </Modal>
    :null
    }

    {
    updatemodalIsVisible ===true ? 
    <Modal onClose={hideupdateModalHandler}>    
      <UpdatePost onCancel={hideupdateModalHandler} onDate={date} setId={userId} setToken={setToken}></UpdatePost>
    </Modal>
    :null
    }

    {
    deletemodalIsVisible ===true ? 
    <Modal onClose={hidedeleteModalHandler}>    
       <DeletePost onCancel={hidedeleteModalHandler} onDate={date} setId={userId} setToken={setToken}></DeletePost>
    </Modal>
    :null
    }
 
   
    
    <ReadPost onDate={date} setId={userId} setToken={setToken}></ReadPost>
    {/* {moment(value).format("YYYY년 MM월 DD일")}  */}
    
    </div>
    
  </>
  );
}

export default Planner;
