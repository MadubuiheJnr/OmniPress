import { AxiosError } from "axios";
import Axios from "../../config/axiosConfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import type { UserType } from "../../types";
import UserTableItems from "../../components/admin/Users/UserTableItems";
import SearchPageLoadingUI from "../../components/common/SearchPageLoadingUI";
import { Plus, Search } from "lucide-react";
import AddUser from "../../components/admin/Users/AddUser";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);

  const handleShowActions = (currentID: string) => {
    setSelected(currentID === selected ? null : currentID);
  };

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
    <div className="p-2 lg:w-[95%]">
      <div className=" text-neutral-800">
        <p className="font-semibold text-sm">Manage Users</p>
        <p className="font-light text-xs">
          View, edit and manage all registered users.
        </p>
      </div>

      <div className="mt-5">
        <div className="w-full h-9 border border-neutral-200 rounded-full flex items-center gap-2 pl-2 pr-3 py-1">
          <Search size={20} className="text-neutral-500" />
          <input
            type="text"
            className="flex-1 h-full outline-0 text-xs text-neutral-600"
            placeholder="search username"
          />
        </div>
        <button
          onClick={() => setOpenAddUser(true)}
          className="text-sm text-neutral-800 border border-neutral-200 rounded-sm px-3 py-1 font-semibold mt-3 flex items-center gap-x-2"
        >
          <Plus className="inline text-neutral-800" size={20} /> Create user
        </button>
      </div>

      <div className="w-full overflow-x-auto mt-5 border border-neutral-200 rounded-lg">
        <table className="min-w-max w-full">
          <thead className="text-left uppercase border-b border-neutral-200">
            <tr className="w-full text-xs text-neutral-500">
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="">
            {loading ? (
              <tr>
                <td>
                  <SearchPageLoadingUI open={loading} />
                </td>
              </tr>
            ) : (
              users &&
              users.map((user, index) => (
                <UserTableItems
                  user={user}
                  index={index + 1}
                  selected={selected}
                  setSelected={handleShowActions}
                  closeSelected={() => setSelected(null)}
                  refetchUsers={fetchAllUsers}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {openAddUser && (
        <div>
          <AddUser
            open={openAddUser}
            handleClose={() => setOpenAddUser(false)}
            fetchUsers={fetchAllUsers}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
