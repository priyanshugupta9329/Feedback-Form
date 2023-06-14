import React, { useEffect, useState } from 'react';
import "./FeedbackQuestion.css";
import { getQuestions, postRating } from '../../services/QuestionService';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';


function FeedbackQuestion(props) {

    const [data, setData] = useState([]);


    let navigate = useNavigate();

    // let data = [
    //     {
    //         no : 1,
    //         question : "How satisfied are you with our products ?"
    //     },
    //     {
    //         no : 2,
    //         question : "How fair are the prices compared to similar retailers?"
    //     },
    //     {
    //         no : 3,
    //         question : "How fair are you with the value for money of your purchase?"
    //     },
    //     {
    //         no : 4,
    //         question : "How fair are ?"
    //     },
    //     {
    //         no : 5,
    //         question : "How fair are rrrrrrrrrrrrrrrrrrr ttttttttttttttttt ttttttttttttttttttttt tttttttttt?"
    //     },
    // ]

    const [loader, setLoader] = useState(true);
    const [questionss, setQuestionss] = useState("");
    const [ len, setLen] = useState(0);
   

    useEffect(() => {
        getAllQuestions(); 

    }, []);

   

    const getAllQuestions = () =>{

        setLoader(false);
       
            getQuestions()
          .then((res) => {
            setData(res);
            
            console.log("rrr",res);
            setLen(res.length);
          
            // console.log("jjjlll",questionss)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(()=>{
            setLoader(true); 
          })
       
        
    }

    const [ratingfeedback, setRatingFeedback] = useState({
        question: "",
        rating : ""
    })


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);
    // console.log(currentPosts)

   


    const [disable_previous, setDisabled_previous] = useState(false);
    const [disable_next, setDisabled_next] = useState(false);
    const [disable_submit, setDisabled_submit] = useState(true);




    const previousClick = () =>{
        if(currentPage === 1){
            setDisabled_previous(true);
            setDisabled_next(false);
        }
        else{
            setCurrentPage(currentPage-1);
            setQuestionss(currentPosts[0].question);
            setSelectedButton(null);
        }
    }

    const nextClick = () =>{
        if(currentPage === len){
            setDisabled_next(true);
            setDisabled_previous(true);

            setDisabled_submit(false);

        }
        else{
            setCurrentPage(currentPage+1);
            setQuestionss(currentPosts[0].question);
            setSelectedButton(null);

            setRatingFeedback({...ratingfeedback, ["question"]: questionss});

            AddedRating(ratingfeedback);

            console.log("lll",ratingfeedback);
        }
    }

    const submitClick = () => {
        navigate("/thanku");  
    }


    const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    console.log("ppp", currentPosts[0].question)

   
    setRatingFeedback({...ratingfeedback, ["rating"]: buttonIndex});
    if(len === currentPage){
        setDisabled_next(true);
        setDisabled_previous(true);
        setDisabled_submit(false);
    }
  };


  useEffect(()=>{
    if(selectedButton === null){
        setDisabled_next(true);
        setDisabled_previous(true);
        setDisabled_submit(true);
    }
    else{
        setDisabled_next(false);
        setDisabled_previous(false);
        // setDisabled_submit(true);
    }
  }, [selectedButton])

  const AddedRating = (datad) => {

    setLoader(false);
    postRating(datad)
      .then((res) => {
       
        console.log("Added", datad);
       
      })
      .catch((err) => {
        console.log("erroor login", err);
      })
      .finally(()=>{
        setLoader(true);
      })

  };

  return (
    <div>
    {loader ? (
    <div>

            <h2 className='heading'>Customer Survey</h2>

            <div className='question_no'><p>{currentPage}/{len}</p></div>

            <div className='question'><p>Q). {questionss}</p></div>
            <div className='rating_no'>

                <button
                    className={`rating-button rating_button ${selectedButton === 1 ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(1)}
                >1</button>
                <button
                    className={`rating-button rating_button ${selectedButton === 2 ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(2)}
                >2</button>
                <button
                    className={`rating-button rating_button ${selectedButton === 3 ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(3)}
                >3</button>
                <button
                    className={`rating-button rating_button ${selectedButton === 4 ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(4)}
                >4</button>
                <button
                    className={`rating-button rating_button ${selectedButton === 5 ? 'selected' : ''}`}
                    onClick={() => handleButtonClick(5)}
                >5</button>
                    </div>


            <div className='button'>
                <button className='previous' 
                onClick={previousClick}
                disabled={disable_previous}
                >
                    Previous
                </button>

                <button className='next' 
                onClick={nextClick}
                disabled={disable_next}
                >
                    Next
                </button>
            </div>

            <div>
                <button className='submit_button'
                onClick={submitClick}
                disabled={disable_submit}
                >Submit</button>
            </div>
        
    </div>
    ) : (<Loader />
        )}
    </div>
  )
}


export default FeedbackQuestion
