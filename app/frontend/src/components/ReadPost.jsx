import React, { useState, useEffect } from 'react';
//게이트웨이 내 aws계정과 연결됨 수정해야함
import Planner from './Planner';
function ReadPost({onDate}) {
  const [lambdaData, setLambdaData] = useState(null);
  const [data, setData] = useState([]);
  


  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        const token = "eyJraWQiOiJNOHhQNjlxVFJIZFBVZ3hmYnJYcU43YW5HSFMxYjNBWlBjYlp5dDNHbVV3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2I0MjhiNS05YWM3LTQ0MDctYTc4Mi0yY2FiNTQ4ZjQ0ZjUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfbnJpU0lYbHVIIiwiY2xpZW50X2lkIjoiMjMyYzkza2diNWtxNTA5cXU0NXY4NWEyM20iLCJvcmlnaW5fanRpIjoiMTExNTM3NjctZTRhYy00MmZhLWEwN2EtODU5ZWMwY2ExYjM0IiwiZXZlbnRfaWQiOiI1MmE4NTM0OC1hMDU3LTQ3YmYtOGZkMC0yZjk1YmZhYzFhYTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjkyMjQ5Njk2LCJleHAiOjE2OTIyNTMyOTYsImlhdCI6MTY5MjI0OTY5NiwianRpIjoiZTIwZTRmODQtYzhiMy00OTU4LTlhZmEtMTIyY2U4OWI0YTQxIiwidXNlcm5hbWUiOiJhbHN3bnMifQ.HkN5RcqJbZDVPqGAz1-chwLqI69_WspB-GzdjWq9zcxF8j5AgI-JFZcAByoNzTmuM1_4_5aslfV46vSbdQsnNSWSnOraCTORNoB7XcJQeSsr42j8yRE0-1RFvu6CK8oE2W6XRbeKhKyvqPzb4oK4RVmsAFvdN0S5Y8_000UN0G17GyEyujYuLg2B5yqlqSMo3UyNTwCIvTyHb4DVM6mt4cJG-PVxcCvl0hBOpefoGXH31wFw1dWbFUj_B_5H_9FDZArqi9Hu8BJCz0pfMz7_Sy8YaCiX6trYBKXQwP0z9BUahF7BvQAAWp66MYJXYxGxnv0K9bxHdiFhBNdJkMV_jw";
        const lambdaEndpoint = "https://zie1snhqwd.execute-api.ap-northeast-2.amazonaws.com/test";
        const response = await fetch(lambdaEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰을 "Bearer" 스타일로 전달
          },
        }) 
        // const response = await fetch('https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner',
        // {
        //   method: 'GET', // 필요한 HTTP 메서드 사용
        // });
        // const jsonData = await response.json();
        // // console.log('Lambda response:', data);
       
        
        
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

  function setClickHandler(){
    return console.log(JSON.stringify(lambdaData, null, 2));
  }
  const dateList = data.map(item => item.date); // 날짜만 추출하여 리스트로 저장
  // console.log("dataList: "+dateList);
  // console.log(typeof(dateList));
  // <Planner dateList={dateList}/>
  return (
    
    <div>
      <button onClick={setClickHandler}>모든 일정 조회</button>
      <h1>{onDate} 일정</h1>
      {/* {lambdaData && (
        <>
        <pre>{JSON.stringify(lambdaData, null, 2)}</pre>
        </>
      )} */}
      <ul>
        {data
          .filter(item => item.date === onDate) // 날짜가 일치하는 항목만 필터링
          .map((item, index) => (
          <li key={index}>
            Title:{item.Title} Index:{index} Date: {item.date} EndDate:{item.EndDate} Memo:{item.Memo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadPost;
