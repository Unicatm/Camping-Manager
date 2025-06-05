import { useState } from "react";
import { FiLock } from "react-icons/fi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

function PasswordInput({ id, label, register, error, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-blue-950 font-medium"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <FiLock className="w-4 h-4 text-blue-700" />
        </div>

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-lg px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 pl-10 pr-10`}
          {...(register ? register(id) : {})}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
          tabIndex={-1}
        >
          {showPassword ? (
            <VscEyeClosed className="w-4 h-4 text-slate-700 cursor-pointer" />
          ) : (
            <VscEye className="w-4 h-4 text-slate-700 cursor-pointer" />
          )}
        </button>
      </div>

      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}

export default PasswordInput;
