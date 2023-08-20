import classes from './UpdatePost.module.css';
import { useState } from 'react';



function UpdatePost({onCancel,onDate,setId, setToken}) {
  
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredMemo, setEnteredMemo] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const [responseMessage, setResponseMessage] = useState('');
  
  
  var Title;
  var EndDate;
  var Memo;
  

  function memoChangeHandler(event) {
    setEnteredMemo(event.target.value);
  }

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function endDateChangeHandler(event) {
    setEnteredEndDate(event.target.value);
  }

  
  function submitHandler(event){
    event.preventDefault();
    const postData = {
      ID:setId,
      Title:enteredTitle,
      DATE: onDate,
      EndDate:enteredEndDate,
      Memo: enteredMemo
    };

    console.log(postData);
    handleUpdateRequest();
    onCancel();
    
  }

  const handleUpdateRequest = async () => {
    try {
      const token = setToken;
      const payload = {
      "ID": setId,
      "Index": 1
      };
    const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
    const response = await fetch(lambdaEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
    },
    body: JSON.stringify({ 
      ID: setId,
      Title:enteredTitle,
      DATE: onDate,
      EndDate:enteredEndDate,
      Memo: enteredMemo
      }),
    });
      
      const responseData = await response.json();
      console.log('PUT response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    
  };

  
  return (
      
      <form className={classes.form} onSubmit={submitHandler}>
    
      <p>
        <label htmlFor="title">일정 수정</label>
     </p>
      <p>
      <label htmlFor="id">ID: {setId} </label>
      </p>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" required onChange={titleChangeHandler}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <label>{onDate}</label>
      </p>
      <p>
        <label htmlFor="enddate">End Date</label>
        <input type="text" id="enddate" required onChange={endDateChangeHandler}/>
      </p>
      <label htmlFor="memo">Memo</label>
        <textarea  id="memo" required rows={3}  onChange={memoChangeHandler}/>
      <p>
        
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" >Submit</button>
      </p>
      </form>
      
    
    
    
    
  );
}

export default UpdatePost;