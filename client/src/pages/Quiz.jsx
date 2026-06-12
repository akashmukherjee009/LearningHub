import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';

function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      question: "What is the primary visual characteristic of Neumorphism?",
      options: [
        "High contrast borders and sharp edges",
        "Soft, extruded 3D appearance using light and dark shadows",
        "Flat, 2D design with vibrant gradients",
        "Photorealistic textures like wood and leather"
      ],
      correctAnswer: 1
    },
    {
      question: "Which background color strategy works best for Neumorphism?",
      options: [
        "Pure black background",
        "Pure white background",
        "Background color identical to the element color",
        "High contrast background colors"
      ],
      correctAnswer: 2
    }
  ];

  const handleSelect = (index) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="py-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link to={`/courses/${id}/content`} className="neu-btn neu-btn-secondary" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Lesson
        </Link>
        <span className="fw-bold text-muted">Module 2 Quiz</span>
      </div>

      <div className="neu-box mx-auto" style={{ maxWidth: '800px' }}>
        <div className="mb-5">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted fw-bold">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-warning fw-bold">{Math.round(progress)}%</span>
          </div>
          <div className="neu-progress">
            <div className="neu-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <h3 className="neu-title mb-4 pb-3 border-bottom" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          {currentQ.question}
        </h3>

        <div className="options-container mb-5">
          {currentQ.options.map((option, index) => {
            let itemClass = "neu-card quiz-option p-4 mb-3 d-flex align-items-center gap-3";
            let icon = null;

            if (selectedOption === index) {
              itemClass += " selected";
              // Apply inset shadow if selected but not submitted
              if (!isSubmitted) {
                itemClass += " shadow-inset"; 
              }
            }

            if (isSubmitted) {
              if (index === currentQ.correctAnswer) {
                itemClass += " correct-answer";
                icon = <CheckCircle color="#28a745" size={24} />;
              } else if (selectedOption === index) {
                itemClass += " wrong-answer";
                icon = <XCircle color="#dc3545" size={24} />;
              }
            }

            return (
              <div 
                key={index}
                className={itemClass}
                style={{ 
                  cursor: isSubmitted ? 'default' : 'pointer',
                  backgroundColor: selectedOption === index && !isSubmitted ? '#d8deeb' : 'transparent',
                  boxShadow: selectedOption === index && !isSubmitted ? 'inset 5px 5px 10px rgba(163,177,198,0.5), inset -5px -5px 10px rgba(255,255,255,0.7)' : undefined,
                  border: isSubmitted && index === currentQ.correctAnswer ? '2px solid #28a745' : isSubmitted && selectedOption === index ? '2px solid #dc3545' : 'none'
                }}
                onClick={() => handleSelect(index)}
              >
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '30px', height: '30px', 
                    boxShadow: selectedOption === index ? 'inset 2px 2px 5px rgba(0,0,0,0.2)' : '2px 2px 5px rgba(163,177,198,0.5), -2px -2px 5px rgba(255,255,255,0.7)',
                    backgroundColor: selectedOption === index ? '#ccac00' : '#e0e5ec',
                    color: selectedOption === index ? '#fff' : '#333'
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-grow-1 fs-5">{option}</div>
                {icon}
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-end pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
          {!isSubmitted ? (
            <button 
              className="neu-btn neu-btn-primary px-5 py-2 fs-5"
              onClick={handleSubmit}
              disabled={selectedOption === null}
              style={{ opacity: selectedOption === null ? 0.5 : 1 }}
            >
              Submit Answer
            </button>
          ) : currentQuestion < questions.length - 1 ? (
            <button className="neu-btn neu-btn-primary px-5 py-2 fs-5" onClick={handleNext}>
              Next Question
            </button>
          ) : (
            <div className="text-center w-100">
              <h3 className="text-success mb-3"><Award size={32} className="me-2"/>Quiz Completed!</h3>
              <Link to="/courses" className="neu-btn neu-btn-secondary px-4 py-2">
                Return to Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
