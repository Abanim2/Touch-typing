import React from 'react';

const TypingBox = ({ inputValue, setInputValue }) => {
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <textarea
        className="border border-gray-300 rounded p-2"
        cols={150}
        rows={4}
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
      ></textarea>
    </div>
  );
};

export default TypingBox;
