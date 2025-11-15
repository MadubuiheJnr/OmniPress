import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/search")}>
      <Search className="text-neutral-600" size={23} />
    </button>
  );
};

export default SearchButton;
