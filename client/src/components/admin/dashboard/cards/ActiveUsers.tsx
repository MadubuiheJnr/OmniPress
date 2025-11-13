import { useEffect, useState } from "react";
import Axios from "../../../../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { UserType } from "../../../../types";
import { ArrowDownRight, ArrowUpRight, Users } from "lucide-react";

const ActiveUsers = () => {
  const [usersData, setUsersData] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await Axios("/api/users");
      setUsersData(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers = usersData.length;
  return (
    <div className="bg-white p-3 rounded-xl drop-shadow-xs border border-gray-200/50 transition-all ease-in-out duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-800 text-lg">Active Users</p>
          <p className="text-neutral-900 text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="w-15 h-15 bg-blue-100/50 flex items-center justify-center rounded-xl">
          <Users className="text-blue-600" size={25} />
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <span>
          {totalUsers > 50 ? (
            <ArrowUpRight className="text-emerald-600" size={20} />
          ) : (
            <ArrowDownRight className="text-red-600" size={20} />
          )}
        </span>
        <p className="text-lg font-semibold">
          {totalUsers > 50 ? (
            <span className="text-emerald-600">+</span>
          ) : (
            <span className="text-red-600">-</span>
          )}
          <span
            className={`${
              totalUsers > 50 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {totalUsers}%
          </span>
        </p>
      </div>

      <div className="w-full h-3 bg-neutral-100 rounded-full mt-5">
        <div
          className={`w-[20%] h-full bg-linear-to-r from-blue-400 to-blue-800 rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default ActiveUsers;
