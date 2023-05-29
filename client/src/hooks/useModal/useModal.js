import { useState } from "react";

// Custom hook for managing modal state
function useModal(){
    const [modalOpen, setModalOpen] = useState(false);

    // Function to open the modal
    function openModal() {
        setModalOpen(true);
      }
    
    // Function to close the modal
    function closeModal() {
      setModalOpen(false)
    }

    // Return the modal state and functions for opening and closing the modal
    return [modalOpen, openModal, closeModal]
}

export default useModal;