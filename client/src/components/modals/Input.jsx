function Input({ width, label, id, error, ...props }) {
  return (
    <div class={`${width}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-blue-950 font-medium"
      >
        {label}
      </label>
      <input
        className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        id={id}
        {...props}
      />
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
}

export default Input;
