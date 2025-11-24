import { AxiosError } from "axios";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { UserType } from "../../types";
import UserCard from "../../components/admin/Users/UserCard";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await Axios("/api/users");
      setUsers(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data.message || "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="w-full p-3 h-screen overflow-y-auto pb-25">
      <div className="w-70 flex flex-col gap-y-3">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
