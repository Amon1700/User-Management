import { useEffect, useState } from "react";
import User from "./User";
import Modal from "./Modal";
import Userform from "./UserForm";
import Shimmer from "./Shimmer";

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

const Home = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const res = await data.json();

        console.log("oPP");

        setUsers(res);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Shimmer />;

  return (
    <div className="home">
      <div className="search-add">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div onClick={() => setOpen(true)}>Add User</div>
      </div>
      <div className="top-label">
        <div className="top-item">
          <h3>Name</h3>
        </div>
        <div className="top-item">
          <h3>Email</h3>
        </div>
        <div className="top-item">
          <h3>Control</h3>
        </div>
      </div>
      <div className="list-conatiner">
        <div className="list-items">
          {filteredUsers.map((user) => (
            <User user={user} key={user.id} />
          ))}
        </div>
      </div>
      <Modal open={open} close={() => setOpen(false)}>
        <Userform
          value={{}}
          url={"https://jsonplaceholder.typicode.com/users"}
          close={() => setOpen(false)}
          method={"POST"}
        />
      </Modal>
    </div>
  );
};

export default Home;
