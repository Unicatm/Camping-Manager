import { useEffect, useState, useRef } from "react";

export default function useToggleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current?.contains(event.target)) {
        return;
      }

      if (toggleRef.current?.contains(event.target)) {
        return;
      }

      close();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return {
    isOpen,
    toggle,
    close,
    dropdownRef,
    toggleRef,
  };
}
