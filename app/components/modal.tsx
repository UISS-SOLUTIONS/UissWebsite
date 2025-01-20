"use client";
import React, { useState } from "react";
import { IModal } from "./types";

const Modal: React.FC<IModal> = ({ children, isOpen, setIsOpen  }) => {

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="modal-content bg-white p-6 rounded shadow-lg w-1/3 transform translate-y-4 transition-all duration-300 text-black">
        {children}
      </div>
    </div>
  );
};

export default Modal;
