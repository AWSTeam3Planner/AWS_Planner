import React, { useState } from 'react';
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


function Planner({onResponse}) {
  
  const [value, onChange] = useState(new Date());
  const [inputmodalIsVisible, setInputModalIsVisible] = useState(false);
  const [updatemodalIsVisible, setUpdateModalIsVisible] = useState(false);
  const [deletemodalIsVisible, setDeleteModalIsVisible] = useState(false);
  
  
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
  
  const marks = [];
  
  const date = moment(value).format("YYYY-MM-DD") ;
  
  return (
    <>
    
    <MainHeader onInputPost={showinputModalHandler} onUpdatePost={showupdateModalHandler} onDeletePost={showdeleteModalHandler}></MainHeader>
    
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정      
      
        tileContent={({ date, view }) => {

          let html = [];
          if (marks.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
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
    
    {/* 일정 확인 창 */}
    <div className="text-gray-500 mt-4">
    
    
    

   
    
   
    {
    inputmodalIsVisible ===true ? 
    <Modal onClose={hideinputModalHandler}>    
      <NewPost onCancel={hideinputModalHandler} onDate={date}></NewPost>
    </Modal>
    :null
    }

    {
    updatemodalIsVisible ===true ? 
    <Modal onClose={hideupdateModalHandler}>    
      <UpdatePost onCancel={hideupdateModalHandler} onDate={date}></UpdatePost>
    </Modal>
    :null
    }

    {
    deletemodalIsVisible ===true ? 
    <Modal onClose={hidedeleteModalHandler}>    
       <DeletePost onCancel={hidedeleteModalHandler} onDate={date}></DeletePost>
    </Modal>
    :null
    }
     
   
    
    <ReadPost onResponse={onResponse} onDate={date}></ReadPost>
    {/* {moment(value).format("YYYY년 MM월 DD일")}  */}
    
    </div>
    
  </>
  );
}

export default Planner;
