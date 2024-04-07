import { useState } from 'react';
import axios from 'axios';

const QuestionModal = ({ showModal, setShowModal, refreshData }) => {
  const [questionText, setQuestionText] = useState('');

  // submit question event handler
  const submitQuestion = async () => {
    try {
      await axios.post('/api/questions/add', { questionText });
      setQuestionText('');
      setShowModal(false);
      refreshData();
    } catch (error) {
      alert('Failed to add question');
    }
  };

  // hide modal
  if (!showModal) {
    return null;
  }

  // show modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5">
        <textarea
          className="border p-2"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white p-1"
            onClick={submitQuestion}
          >
            Submit Question
          </button>
          <button
            className="bg-gray-500 text-white p-1"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
