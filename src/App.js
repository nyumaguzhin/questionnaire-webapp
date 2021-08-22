import Question from './components/Question'
import Result from './components/Result'
import { useState, useEffect } from 'react'

function App() {
  const backendUrl = "http://localhost:8080/"
  const header = "Are you an introvert?"

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(()=>{
    const getQuestions = async () => {
      const questionsFromServer = await fetchQuestions();
      setQuestions(questionsFromServer);
      let newAnswers = [];
      for (let i=0; i<questionsFromServer.length; i++) {
        newAnswers[i]={
          questionId: questionsFromServer[i].id,
          answerId: 0
        };
      }
      setAnswers(newAnswers);
      setCurrentQuestion(0);
    }
    getQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch(backendUrl + 'questions/');
    const data = await res.json();
    return data;
  };

  const onSubmit = async () => {
    const res = await fetch(backendUrl + 'result/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(answers),
    });
    
    const resultFromServer = await res.json();
    setResults(resultFromServer);
    setShowResults(true);
  }

  const getCurrentQuestion = () => {
    if (questions && questions.length) {
      return questions[currentQuestion];
    } else {
      return null;
    }
  };

  const getCurrentAnswer = () => {
    if (answers && answers.length) {
      return answers[currentQuestion];
    } else {
      return null;
    }
  };

  const onChangeAnswer = (answer) => {
    const newAnswers = answers.slice();
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    console.log(answers[currentQuestion]);
  }

  const onPrev = () => {
    if (currentQuestion>0) setCurrentQuestion(currentQuestion - 1);
  };

  const onNext = () => {
    if (questions && questions.length && currentQuestion<questions.length-1) setCurrentQuestion(currentQuestion + 1);
  };

  
    return (
      <div className="container">
        <h1 className="header">{header}</h1>
        {showResults?
          <>
            <Result results={results}/>
            <button onClick={()=>setShowResults(false)} className="button">Back</button>
          </>
        :
          <>
            <Question question={getCurrentQuestion()} answer={getCurrentAnswer()} onChangeAnswer={onChangeAnswer}/>
            <div align="center">
              <button onClick={onPrev} className="button">Prev</button>
              <button onClick={onNext} className="button">Next</button>
              <button onClick={onSubmit} className="button">Submit</button>
            </div>
          </>
        }
      </div>
    );
}

export default App;
