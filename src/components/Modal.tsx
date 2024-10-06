import ReactDOM from "react-dom";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  if (!props.open) return null;

  return ReactDOM.createPortal(
    <div id="modal-background">
      <div id="modal-content">
        <div className="cross">
          <IoCloseSharp onClick={() => props.close()} className="icon" />
        </div>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
