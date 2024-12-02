import React from 'react';

const Textarea = ({ placeholder, value, onChange, rows, className }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={className}
    />
  );
};

export default Textarea;