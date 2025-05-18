import { useEffect } from "react";

const useClickOutside = (ref, callback, ignoreRef = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOnIgnoredElement =
        ignoreRef &&
        (ignoreRef.current === event.target ||
          ignoreRef.current.contains(event.target));

      const clickedOutside = ref.current && !ref.current.contains(event.target);

      if (clickedOutside && !clickedOnIgnoredElement) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, ignoreRef]);
};

export default useClickOutside;
