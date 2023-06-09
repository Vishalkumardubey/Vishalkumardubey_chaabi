import React, { useState, useEffect, useRef } from 'react';
import Keyboard from './keyboard';

const TypingPractice = () => {
  const [typedText, setTypedText] = useState('');
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [keyCount, setKeyCount] = useState(0);
  const [correctKeyCount, setCorrectKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  const text = 'This is the text to be typed';
  const getNextCharacter = () => {
    if (currentCharacter < text.length) {
      return text[currentCharacter];
    } else {
      return '';
    }
  };

  const nextCharacter = getNextCharacter();

  const handleKeyPress = (key) => {
    if (key === nextCharacter) {
      setCurrentCharacter(currentCharacter + 1);
      setTypedText(typedText + key);
      setKeyCount(keyCount + 1);
      setCorrectKeyCount(correctKeyCount + 1);
    } else {
      setKeyCount(keyCount + 1);
    }
  };

  useEffect(() => {
    if (typedText.length > 0) {
      const accuracyPercentage = (correctKeyCount / typedText.length) * 100;
      setAccuracy(accuracyPercentage.toFixed(2));
    }
  }, [typedText, correctKeyCount]);

  const restartPractice = () => {
    setCurrentCharacter(0);
    setEndTime(null);
    setTypedText('');
    setKeyCount(0);
    setCorrectKeyCount(0);
    setAccuracy(100);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <h1>Typing Practice</h1>
      <p>{typedText}</p>
      <p>Next character: {nextCharacter}</p>
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        placeholder="Type here"
        autoFocus
        disabled={endTime !== null}
        aria-label="Type here"
      />
      <Keyboard handleKeyPress={handleKeyPress} />
      {endTime && (
        <div>
          <p>Accuracy: {accuracy}%</p>
          <p>Keys pressed: {keyCount}</p>
          <button onClick={restartPractice}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TypingPractice;
