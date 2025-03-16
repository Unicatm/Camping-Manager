export default function Select({
  width,
  flex,
  label,
  id,
  error,
  value,
  data,
  setValue,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`relative ${width} ${flex}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-blue-950 font-medium"
      >
        {label}
      </label>
      <select
        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        onChange={handleChange}
        value={value}
      >
        {data.map((opt) => (
          <option
            className="p-1 hover:bg-gray-100 cursor-pointer px-3"
            value={opt}
          >
            {opt}
          </option>
        ))}
      </select>

      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}
