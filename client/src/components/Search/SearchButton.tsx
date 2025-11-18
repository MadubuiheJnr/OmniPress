import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/search")}>
      <Search className="text-neutral-500" size={25} />
    </button>
  );
};

export default SearchButton;
