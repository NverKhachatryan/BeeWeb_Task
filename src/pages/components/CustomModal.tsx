import React, { useEffect } from "react";

interface MyComponentProps {
  isOpen: boolean;
  onClose: any;
  children: any;
  size: "small" | "medium" | "large"; // Add the size prop
}

const Modal = ({ isOpen, onClose, children, size }: MyComponentProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine the CSS classes based on the size prop
  let modalSizeClass = "";
  switch (size) {
    case "small":
      modalSizeClass = "max-w-sm";
      break;
    case "medium":
      modalSizeClass = "max-w-md";
      break;
    case "large":
      modalSizeClass = "max-w-screen-md	";
      break;
    default:
      modalSizeClass = "max-w-md";
      break;
  }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => onClose && onClose()}
      />

      <div className={`relative w-full ${modalSizeClass} max-h-full`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
