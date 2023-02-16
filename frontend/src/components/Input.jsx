// eslint-disable-next-line react/prop-types
export default function Input({
  label,
  name,
  placeholder,
  type = "number",
  require,
  handleChange,
}) {
  return (
    <>
      <label htmlFor="bras" className="block text-sm font-medium text-gray-700">
        {label} <span className="text-red-600">{require ? "*" : ""}</span>
      </label>
      <div className="mt-1">
        <input
          onChange={handleChange}
          type={type}
          step="0.1"
          name={name}
          id={name}
          placeholder={placeholder}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </>
  );
}
