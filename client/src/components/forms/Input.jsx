import Calendar from "../ui/Calendar";

function Input({
  width,
  flex,
  label,
  id,
  error,
  onDataChange,
  selected,
  ...props
}) {
  return (
    <div className={`${width} ${flex}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-blue-950 font-medium"
      >
        {label}
      </label>
      {props.type == "date" ? (
        <Calendar
          id={id}
          name={id}
          onDateChange={onDataChange}
          selected={selected}
        />
      ) : (
        <input
          className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          id={id}
          {...props}
        />
      )}

      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}

export default Input;
