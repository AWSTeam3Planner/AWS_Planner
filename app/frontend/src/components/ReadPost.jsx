import React, { useState, useEffect } from 'react';
import Planner from './Planner';

function ReadPost({onDate,setId, setToken}) {
  const [lambdaData, setLambdaData] = useState(null);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchLambdaData = async () => {
      try {
        
        const lambdaEndpoint = "https://28ficn77c1.execute-api.ap-northeast-2.amazonaws.com/test/planner";
        
        const response = await fetch(lambdaEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${setToken}`, // 토큰을 "Bearer" 스타일로 전달
          },
        }) 
        
        const jsonData = await response.json();
            
        // 받아온 JSON 데이터의 body 부분을 출력합니다.
        setLambdaData(jsonData.body);
        console.table(typeof jsonData);
        
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

  
  const dateList = data.map(item => item.DATE); // 날짜만 추출하여 리스트로 저장
 
  return (
    
    <div>
      
      
      <h3 className="mb-4"> {/* 띄어쓰기 추가를 위해 mb-4 클래스를 사용 */}
      <span className="date ms-5">{onDate} 일정</span>
      </h3>
      
      
      
      
      <div className="container">
        <div className="row">
          {data
            .filter((item) => item.ID === setId)
            .filter((item) => item.DATE === onDate)
            .map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-4 border-primary">
                  <div className="card-body">
                    <h5 className="card-title">{item.Title}</h5>
                    <p className="card-text">
                      <strong>Date:</strong> {item.DATE} ~ {item.EndDate}
                    </p>
                    <p className="card-text">
                      <strong>Memo:</strong> {item.Memo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
}

export default ReadPost;
