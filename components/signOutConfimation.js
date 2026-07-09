"use client";

import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";

export default function SignOutConfirmation({ signOut }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <li
        onClick={() => setOpenModal(true)}
        style={{ fontSize: "24px", whiteSpace: "nowrap" }}
        className="block font-bold cursor-pointer text-black"
      >
        <TbLogout />
      </li>

      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-orange-400 dark:text-orange-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 font-sans">
              Are you sure you want to sign out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="success"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpenModal(false);
                }}
              >
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
