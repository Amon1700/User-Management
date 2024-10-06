import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Userform from "./UserForm";
import { useState } from "react";
import DeleteUser from "./DeleteUser";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

interface UserProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
    website: string;
    company: {
      name: string;
    };
  };
}

const UserList = (props: UserProps) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const user = props.user;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${props.user.id}`);
  };

  const handleClickEdit = () => {
    if (openDelete) setOpenDelete(false);
    setOpen(true);
  };

  const handleClickDelete = () => {
    if (open) setOpen(false);

    setOpenDelete(true);
  };

  return (
    <div className="list-item">
      <div className="item-value">
        <p>{user.name}</p>
      </div>

      <div className="item-value">
        <p>{user.email}</p>
      </div>
      <div className="item-value control-btn">
        <BiSolidMessageSquareDetail onClick={handleClick} className="icon" />
        <MdEdit onClick={handleClickEdit} className="icon" />
        <MdDelete onClick={handleClickDelete} className="icon" />
      </div>
      <Modal open={open} close={() => setOpen(false)}>
        <Userform
          value={user}
          url={`https://jsonplaceholder.typicode.com/users/${user.id}`}
          close={() => setOpen(false)}
          method={"PUT"}
        />
      </Modal>
      <Modal open={openDelete} close={() => setOpenDelete(false)}>
        <DeleteUser id={user.id} close={() => setOpenDelete(false)} />
      </Modal>
    </div>
  );
};

export default UserList;
