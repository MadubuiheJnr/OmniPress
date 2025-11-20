import {
  BadgeQuestionMarkIcon,
  Fingerprint,
  Mail,
  Pen,
  User2,
} from "lucide-react";
import type { UserType } from "../../types";

const UserDetailsCard = ({
  user,
  openEdit,
  openEditPassword,
}: {
  user: UserType | null;
  openEdit: () => void;
  openEditPassword: () => void;
}) => {
  return (
    <>
      <p
        onClick={openEdit}
        className="flex items-center justify-end cursor-pointer"
      >
        <span className="bg-neutral-50/10 backdrop-blur-xl w-9 h-9 flex items-center justify-center rounded-full">
          <Pen className="inline text-neutral-100" size={19} />
        </span>
      </p>
      <p className="flex items-center flex-wrap gap-x-3">
        <User2 className="inline text-neutral-50" />
        <span className="font-semibold text-lg text-neutral-50">
          {user?.userName}
        </span>
      </p>
      <p className="flex items-center flex-wrap gap-x-3 mt-2">
        <Mail className="inline text-neutral-50" />
        <span className="text-neutral-50">{user?.email}</span>
      </p>
      <p className="mt-5 flex items-center flex-wrap gap-x-3">
        <BadgeQuestionMarkIcon />
        <span>{user?.bio ?? "No Bio"}</span>
      </p>

      <p
        onClick={openEditPassword}
        className="flex items-center flex-wrap gap-x-3 mt-2 cursor-pointer"
      >
        <Fingerprint className="text-neutral-400" />
        <span className="text-neutral-400 border-b"> Reset Password</span>
      </p>
    </>
  );
};

export default UserDetailsCard;
