import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import QuestionModal from '../components/QuestionModal';

// useSWR fetcher function
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Home() {
  const {
    data: questions,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/questions', fetcher, {
    refreshInterval: 2000,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // initial fetch to check if user is logged in
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get('api/account');
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Failed to fetch login status', error);
      }
    };

    fetchLoginStatus();
  }, []);

  // wrapper function to immediately force mutate/refresh 
  const refreshData = () => {
    mutate();
  };

  // logout event handler
  const logout = async () => {
    try {
      await axios.post('/api/account/logout');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      alert('Logout failed');
    }
  };

  // submit answer event handler
  const submitAnswer = async (questionId) => {
    try {
      await axios.post('/api/questions/answer', {
        _id: questionId,
        answer,
      });
      setAnswer('');
      setSelectedQuestion({ ...selectedQuestion, answer });
    } catch (error) {
      alert('Failed to submit answer');
    }
  };

  // error case
  if (error) {
    return <div>Failed to load questions</div>;
  }

  // is loading case
  if (isLoading){
    return <div>Loading...</div>;
  } 

  // loaded case
  return (
    <div className="container">
      <header className="p-4 text-3xl bg-purple-400 flex justify-between ">
        Ed Kinda
        {isLoggedIn && <span>Hi {username}!</span>}
        {isLoggedIn && (
          <button onClick={logout} className="text-blue-500">
            Log out
          </button>
        )}
      </header>
      <div className="flex bg-purple-100 min-h-screen">
        <div className="w-1/4 p-4 border-r">
          {isLoggedIn ? (
            <button
              onClick={() => setShowModal(true)}
              className=" p-2 text-white bg-blue-500"
            >
              Add new Question +
            </button>
          ) : (
            <Link
              to="/login"
              className="p-2 text-white bg-blue-500"
            >
              Log in to submit a question
            </Link>
          )}

          {questions.map((question) => (
            <div
              key={question._id}
              onClick={() => setSelectedQuestion(question)}
              className="p-2 border"
            >
              {question.questionText}
            </div>
          ))}
        </div>
        <div className="w-3/4 p-4">
          {selectedQuestion ? (
            <div className="border p-5">
              <h3 className="text-xl p-5">{selectedQuestion.questionText}</h3>
              <p className="p-5">Author: {selectedQuestion.author}</p>
              <p className="p-5">Answer: {selectedQuestion.answer}</p>
              {isLoggedIn && (
                <div className="p-5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitAnswer(selectedQuestion._id);
                    }}
                  >
                    <label>
                      Answer this question:
                      <textarea
                        className="w-full"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-500"
                    >
                      Submit Answer
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div>Select a question to see content!</div>
          )}
        </div>
        <QuestionModal
          showModal={showModal}
          setShowModal={setShowModal}
          refreshData={refreshData}
        />
      </div>
    </div>
  );
}

export default Home;
