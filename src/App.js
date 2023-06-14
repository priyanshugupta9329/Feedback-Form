
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import FeedbackQuestion from './Components/FeedBackQuestion/FeedbackQuestion';
import StartPage from './Components/StartPage/StartPage';
import ThankYou from './Components/ThankYouPage/ThankYou';

function App() {
  return (
    <div className="App">
      {/* <StartPage /> */}

      {/* <FeedbackQuestion /> */}
      {/* <ThankYou /> */}

      <Router>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route exact path="/question" element={<FeedbackQuestion />} />
          <Route exact path="/thanku" element={<ThankYou />} />
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
