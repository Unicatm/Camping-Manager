import { useState } from "react";

const Autocomplete = ({ data, width, flex, id, label }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const query = e.target.value;
    setValue(query);

    if (query.length > 0) {
      const filteredSuggestions = data.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setSuggestionsActive(true);
    } else if (query === "") {
      setSuggestions(data);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
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
    setValue(e.target.innerText);
    setSuggestions([]);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38 && suggestionIndex > 0) {
      setSuggestionIndex(suggestionIndex - 1);
    } else if (e.keyCode === 40 && suggestionIndex < suggestions.length - 1) {
      setSuggestionIndex(suggestionIndex + 1);
    } else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionsActive(false);
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
      {suggestionsActive && (
        <ul className="absolute z-10 bg-white w-full h-40 overflow-y-scroll rounded-b-md border border-slate-200 py-2 transition duration-300 ease shadow-sm">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-1 cursor-pointer px-3 ${
                index === suggestionIndex ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onMouseDown={handleClick}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
