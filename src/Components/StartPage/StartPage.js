import React from 'react';
import "./StartPage.css";
import { useNavigate } from 'react-router-dom';

function StartPage(props) {
  let navigate = useNavigate();
  return (
    <div className='start'>

      <h1>Give Your feedback</h1>
      <button className='start_button'
      onClick={() => navigate("/question")}>
        Start
      </button>
    </div>
  )
}



export default StartPage;
