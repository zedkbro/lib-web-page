import React from 'react';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  min,
  step,
  error,
}) => {
  return (
    <div className="mb-4 w-full">
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
      />
      {error && (
        <small className="text-red-600 mt-1 block text-sm font-medium">
          {error}
        </small>
      )}
    </div>
  );
};

export default InputField;
