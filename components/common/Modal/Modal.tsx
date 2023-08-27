import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  containerClassName?: string;
  className?: string;
}

const Modal = ({ children, onClose, className, containerClassName }: Props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center",
        containerClassName
      )}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={modalRef}
        className={classNames(
          '"relative z-10 bg-white w-96 rounded-md shadow-lg p-4"',
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-container")
  );
};

export default Modal;
