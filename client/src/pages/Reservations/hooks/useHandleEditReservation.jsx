import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function useHandleEditReservation(openModalCallback) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRezervareId, setSelectedRezervareId] = useState(null);

  const handleEdit = (rezervareId) => {
    setIsEditing(true);
    setSelectedRezervareId(rezervareId);
    openModalCallback();
  };

  useEffect(() => {
    if (isEditing) {
      openModalCallback();
      setSelectedRezervareId(id);
    }
  }, [id]);

  const resetEdit = () => {
    setIsEditing(false);
    setSelectedRezervareId(null);
  };

  return {
    isEditing,
    selectedRezervareId,
    handleEdit,
    resetEdit,
  };
}
