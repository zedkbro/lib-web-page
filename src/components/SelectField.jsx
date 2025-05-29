import React from 'react';

const SelectField = ({ label, value, onChange, options, error }) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block mb-1 font-semibold text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
      >
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && (
        <small className="text-red-600 mt-1 block text-sm font-medium">
          {error}
        </small>
      )}
    </div>
  );
};

export default SelectField;
