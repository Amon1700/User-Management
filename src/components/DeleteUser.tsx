import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ModalProps {
  id: number;
  close: () => void;
}

const DeleteUser = (props: ModalProps) => {
  const [isDeleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteUser = async () => {
    try {
      setDeleting(true); // Set deleting state to true
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${props.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast("User deleted successfully", { type: "success", theme: "colored" });
    } catch (error) {
      toast("Error while deleting user", { type: "error", theme: "colored" });
    } finally {
      setDeleting(false);
      navigate("/");
      props.close();
    }
  };

  return (
    <div className="delete-btn">
      <h3>Are you sure you want to delete this user</h3>
      <button onClick={deleteUser} disabled={isDeleting}>
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteUser;
