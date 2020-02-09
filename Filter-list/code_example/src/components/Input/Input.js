import React from 'react';
import './Input.css';

export const Input = ({ onChange, value, autoFocus, placeholder }) => (
  <input
    type="text"
    onChange={ onChange }
    value={ value }
    autoFocus={ autoFocus }
    placeholder={ placeholder }
  />
);