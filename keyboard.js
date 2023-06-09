import React from 'react';
 const Keyboard = ({ handleKeyPress }) => {
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

  return (
    <div className="Keyboard">
      {keys.map((key) => (
        <button key={key} onClick={() => handleKeyPress(key)}>
          {key}
        </button>
      ))}
    </div>
  );
};
export default Keyboard;

