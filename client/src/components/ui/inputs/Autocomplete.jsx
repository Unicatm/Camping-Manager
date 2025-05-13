import { useEffect, useState } from "react";

export default function Autocomplete({
  data,
  width,
  flex,
  id,
  label,
  onSelect,
  error,
  defaultValue = null,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState(defaultValue?.nume || "");

  useEffect(() => {
    if (defaultValue?.nume) {
      setValue(defaultValue.nume);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const query = e.target.value;
    setValue("");
    setValue(query);

    if (query.length > 0) {
      const filteredSuggestions = data.filter((suggestion) =>
        suggestion.nume.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSuggestionsActive(true);
    } else if (query === "") {
      setSuggestions(data);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }

    if (onSelect) {
      onSelect(null);
    }
  };

  const handleFocus = () => {
    if (value === "") {
      setSuggestions(data);
      setSuggestionsActive(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestionsActive(false), 200);
  };

  const handleClick = (e) => {
    setValue(e.nume);
    setSuggestions([]);
    setSuggestionsActive(false);

    if (onSelect) onSelect(e);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && suggestionIndex > 0) {
      setSuggestionIndex(suggestionIndex - 1);
    } else if (e.keyCode === 40 && suggestionIndex < suggestions.length - 1) {
      setSuggestionIndex(suggestionIndex + 1);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      handleClick(suggestions[suggestionIndex]);
    }
  };

  return (
    <div className={`relative ${width} ${flex}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-blue-950 font-medium"
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="relative w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
      {suggestionsActive && (
        <ul className="absolute z-10 bg-white w-full h-40 overflow-y-scroll rounded-b-md border border-slate-200 py-2 transition duration-300 ease shadow-sm">
          {suggestions?.map((suggestion, index) => (
            <li
              key={index}
              className={`p-1 cursor-pointer px-3 ${
                index === suggestionIndex ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onMouseDown={() => handleClick(suggestion)}
            >
              <h2>{suggestion.nume}</h2>
              <p className="text-gray-500">{"ID: " + suggestion.cnp}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
