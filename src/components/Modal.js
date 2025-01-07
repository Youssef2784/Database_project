import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  //i am deplotyinf

  return (
    <div 
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-800">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;