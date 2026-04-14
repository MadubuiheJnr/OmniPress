import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      size={"sm"}
      className="h-5 px-0 py-0 space-x-3 hover:bg-transparent focus:bg-transparent"
    >
      <LogOutIcon />
      <span>Logout</span>
    </Button>
  );
};
