"use client";
import React, { useState } from "react";
import Modal from "./modal";
import CustomForm from "./CustomForm";

interface props {
  className: string;
  name: string;
  children?: React.ReactNode;
}

const CallToAction = ({ className, name, children }: props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <button className={`${className}`} onClick={() => setOpenModal(true)}>
        {name}
      </button>
      {openModal && (
        <Modal isOpen={openModal} setIsOpen={setOpenModal}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default CallToAction;
