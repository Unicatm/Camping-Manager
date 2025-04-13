import React, { useState, useCallback } from "react";

export default function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}
