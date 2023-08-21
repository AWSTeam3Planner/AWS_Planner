import classes from './DeletePost.module.css';
import { useState } from 'react';


function DeletePost({onCancel,onDate, setId, setToken}) {
  const [responseMessage, setResponseMessage] = useState('');

  const [enteredId, setEnteredId] = useState("");
  const [enteredIndex, setEnteredIndex] = useState("");
  
  
  var Index;
  function idChangeHandler(event) {
    setEnteredId(event.target.value);
  }
  function indexChangeHandler(event) {
    setEnteredIndex(event.target.value);
  }

  function submitHandler(event){
    event.preventDefault();
    const postData = {
      ID:enteredId,
      Index:enteredIndex
    };
    console.log(postData);
    handleDeleteRequest();
    onCancel();
  }

  const handleDeleteRequest = async () => {
    try {
      const token = setToken;
      const payload = {
        "ID": setId,
        "Index": 1
      };
      const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
      const response = await fetch(lambdaEndpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 토큰을 "Bearer" 스타일로 전달
        },
        body: JSON.stringify({ 
        ID:setId,
        Index: enteredIndex
        }),
      });

      const responseData = await response.json();
      console.log('PUT response:', responseData);
      setResponseMessage(responseData.message);
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
    
  
    
    console.log({onDate});
    
  };
  return (
      
      <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">일정 삭제</label>
      </p>
      <p>
      <label htmlFor="id">ID: {setId}</label>
      </p>

      <p>
      <label htmlFor="index">index</label>
      <input type="text" id="index" required onChange={indexChangeHandler}/>
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" >Submit</button>
      </p>
      </form>
      
    
    
    
    
  );
}

export default DeletePost;