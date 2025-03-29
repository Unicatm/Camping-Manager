import Calendar from "../calendar/Calendar";

function Input({
  width,
  flex,
  label,
  id,
  error,
  onDataChange,
  register,
  selected,
  ...props
}) {
  return (
    <div className={`relative ${width} ${flex}`}>
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
          {...(register ? register(id) : {})}
          {...props}
        />
      )}
      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default Input;
