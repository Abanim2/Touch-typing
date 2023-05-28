import React, { useState, useEffect } from 'react';
import randomWords from 'random-words';
import TypingBox from './TypingBox';

const App = () => {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingCompleted, setTypingCompleted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [results, setResults] = useState({ accuracy: 0, wordCount: 0 });

  useEffect(() => {
    if (typingStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }

    if (timer === 0) {
      setTypingCompleted(true);
      calculateResults();
    }

    return undefined;
  }, [typingStarted, timer]);

  const startTyping = () => {
    setTypingStarted(true);
    setWords(generateWords());
  };

  const generateWords = () => {
    const validKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const generatedWords = [];

    while (generatedWords.length < 25) {
      const word = randomWords({ exactly: 1, maxLength: 10 })[0];
      const isWordValid = Array.from(word).every((char) => validKeys.includes(char));

      if (isWordValid) {
        generatedWords.push(word);
      }
    }

    return generatedWords;
  };

  const calculateResults = () => {
    const typedWords = inputValue.trim().split(' ');
    const correctWords = typedWords.filter((word, index) => word === words[index]);
    const accuracy = Math.floor((correctWords.length / typedWords.length) * 100);
    const wordCount = typedWords.length;

    setResults({ accuracy, wordCount });
  };

  const restartTyping = () => {
    setTypingStarted(false);
    setTypingCompleted(false);
    setTimer(30);
    setInputValue('');
    setResults({ accuracy: 0, wordCount: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white rounded-lg shadow p-6">
        {!typingStarted && !typingCompleted && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Touch Typing Practice</h1>
            <h2 className="text-xl font-bold mb-4">Mainly focus on the keys are a, s, d, f, j, k, l and ;</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={startTyping}
            >
              Start Typing
            </button>
          </div>
        )}

        {typingStarted && !typingCompleted && (
          <div className="my-8">
            <p className="text-xl font-bold mb-4">Remaining Time: {timer} seconds</p>
            <div className="my-4">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded mx-1 inline-block"
                >
                  {word}
                </span>
              ))}
            </div>
            <TypingBox inputValue={inputValue} setInputValue={setInputValue} />
          </div>
        )}

        {typingCompleted && (
          <div className="my-8">
            <p className="text-xl font-bold mb-4">Results:</p>
            <p className="mb-2">
              Accuracy: {results.accuracy}% ({results.wordCount} out of {words.length} words)
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={restartTyping}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
