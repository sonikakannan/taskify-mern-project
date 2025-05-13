import React from "react";

const FormField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  rows,
  options,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          rows={rows}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          min={
            type === "date" ? new Date().toISOString().split("T")[0] : undefined
          } // Prevent past dates
        />
      )}
    </div>
  );
};

export default FormField;
