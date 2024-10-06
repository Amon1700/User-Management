import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
import Userform from "./UserForm";
import DeleteUser from "./DeleteUser";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import LoadingScreen from "./LoadingScreen";

interface user {
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
}

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<user>();
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickModal = () => {
    setOpen(true);
  };
  const handleClickDelete = () => {
    if (open) setOpen(false);
    setOpenDelete(true);
  };

  const handleClickBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          navigate("/");
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        navigate("/");
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <LoadingScreen />;
  return (
    user && (
      <div className="detail">
        <div className="control-btn-detail">
          <IoMdHome onClick={handleClickBack} className="icon" />
          <MdEdit onClick={handleClickModal} className="icon" />
          <MdDelete onClick={handleClickDelete} className="icon" />
        </div>
        <div className="detail-value">
          <div className="detail-item">
            <div>Name</div>
            <div>{user.name}</div>
          </div>
          <div className="detail-item">
            <div>Email</div>
            <div>{user.email}</div>
          </div>
          <div className="detail-item">
            <div>Phone</div>
            <div>{user.phone}</div>
          </div>
          <div className="detail-item">
            <div>Username</div>
            <div>{user.username}</div>
          </div>
          <div className="detail-item">
            <div>Address</div>
            <div>
              {user.address.street}, {user.address.city}
            </div>
          </div>
          <div className="detail-item">
            <div>Company</div>
            <div>{user.company.name}</div>
          </div>
          <div className="detail-item">
            <div>Website</div>
            <div>{user.website}</div>
          </div>
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
          <DeleteUser
            id={user.id}
            close={() => setOpenDelete(false)}
            // notify={notify}
          />
        </Modal>
      </div>
    )
  );
};

export default Detail;
