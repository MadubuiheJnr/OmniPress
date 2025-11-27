import type { UserType } from "../../../types";
import UserActions from "./UserActions";

const UserTableItems = ({
  user,
  index,
  selected,
  setSelected,
  closeSelected,
  refetchUsers,
}: {
  user: UserType;
  index: number;
  selected: string | null;
  setSelected: (e: string) => void;
  refetchUsers: () => void;
  closeSelected: () => void;
}) => {
  return (
    <tr className="text-xs border-b border-neutral-200 cursor-pointer">
      <td className="px-6 py-3">{index}</td>
      <td className="px-6 py-3">{user.userName}</td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">{user.role}</td>
      <td className="px-6 py-3">
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-3 ">
        <UserActions
          user={user}
          refetchUsers={refetchUsers}
          setSelected={setSelected}
          closeSelected={closeSelected}
          selected={selected}
        />
      </td>
    </tr>
  );
};

export default UserTableItems;
