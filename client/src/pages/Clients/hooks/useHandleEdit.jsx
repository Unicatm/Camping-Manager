import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function useHandleEdit(openModalCallback) {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleEdit = (clientId) => {
    setIsEditing(true);
    setSelectedClientId(clientId);
    openModalCallback();
  };

  useEffect(() => {
    if (isEditing) {
      openModalCallback();
      setSelectedClientId(id);
    }
  }, [id]);

  const resetEdit = () => {
    setIsEditing(false);
    setSelectedClientId(null);
  };

  return {
    isEditing,
    selectedClientId,
    handleEdit,
    resetEdit,
  };
}
