export default function Select({
  width,
  flex,
  label,
  name,
  id,
  error,
  value,
  data,
  setValue,
  register,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const isObjectArray = data?.length > 0 && typeof data[0] === "object";

  return (
    <div className={`relative ${width} ${flex}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-blue-950 font-medium"
        >
          {label}
        </label>
      )}
      <div className="bg-white pr-2 border border-slate-200 rounded-md focus:border-slate-400 hover:border-slate-300">
        <select
          className={`${width} bg-white rounded-md placeholder:text-slate-400 text-slate-700 text-sm px-3 py-2 transition duration-300 ease focus:outline-none`}
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          {...(register && name ? register(name) : {})}
        >
          {data?.map((opt, idx) => {
            const optionValue = isObjectArray ? opt._id : opt;
            const optionLabel = isObjectArray ? opt._id : opt;

            return (
              <option key={idx} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>

      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}
