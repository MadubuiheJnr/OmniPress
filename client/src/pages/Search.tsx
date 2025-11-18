import { ArrowLeft, Search as SearchICON } from "lucide-react";
import { useEffect, useState } from "react";
import type { BlogType } from "../types/blogTypes";
import Axios from "../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import SearchKeywords from "../components/Search/SearchKeywords";
import SearchCard from "../components/Search/SearchCard";
import AiSummary from "../components/Search/AiSummary";
import { useNavigate } from "react-router-dom";
import SearchPageLoadingUI from "../components/common/SearchPageLoadingUI";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [aiSummary, setAiSummary] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const preFetchBlogs = async () => {
    const res = await Axios<BlogType[]>("/api/blogs");

    const allTags = res.data
      .flatMap((item) => item.tags) // combine tags arrays
      .filter((tag, index, arr) => arr.indexOf(tag) === index); // remove duplicates

    setTags(allTags);
  };
  useEffect(() => {
    preFetchBlogs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredTags([]);
      setBlogs([]);
      return;
    }

    // filter tags for suggestions
    const tagMatches = tags.filter((tag) =>
      tag.toLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredTags(tagMatches);

    // filter blogs for suggestions
    // const blogMatches = blogs.filter(blog =>
    //   blog.title.toLowerCase().includes(value.toLowerCase()) ||
    //   blog.content.toLowerCase().includes(value.toLowerCase()) ||
    //   blog.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
    // );
    // setBlogs(blogMatches);
  };

  const getAiSummary = async (prompt: string) => {
    try {
      const res = await Axios.post("/api/ai/generate/search/summary", {
        prompt,
      });

      if (res.status === 200) return setAiSummary(res.data);
    } catch (error) {
      return;
    }
  };

  const handleSearch = async (keyword?: string) => {
    const searchTerm = keyword ?? query;

    if (!searchTerm.trim()) return toast.error("Please enter a search term.");

    try {
      setLoading(true);
      await getAiSummary(searchTerm);
      const res = await Axios(`/api/blogs?search=${searchTerm}`);
      setBlogs(res.data);

      setQuery(""); // Optional — you can also remove this if you want query to remain visible
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    handleSearch(tag);
    setFilteredTags([]);
  };

  const handleClose = () => {
    setAiSummary("");
  };

  return (
    <div
      className="min-h-screen px-3 py-5
    lg:w-[80%] mx-auto"
    >
      <div>
        <div className="flex items-center">
          <span onClick={() => navigate(-1)}>
            <ArrowLeft className="text-neutral-500 inline" size={30} />
          </span>

          <div className="w-full p-2 ml-2 bg-white  border  border-neutral-300 flex items-center justify-between gap-x-1 rounded-2xl">
            <SearchICON className="inline text-neutral-400" size={25} />
            <input
              onKeyDown={handleKeyDown}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search blog posts..."
              className="w-full outline-none text-sm text-neutral-600 "
            />
          </div>
        </div>

        {!query && !loading && (
          <p className="mt-2 text-xs text-neutral-500 font-semibold px-3">
            Tip: Use clear keywords for better search results.
          </p>
        )}
      </div>

      {loading ? (
        <SearchPageLoadingUI />
      ) : (
        <>
          <div className="mt-5">
            {query.length > 0 && filteredTags.length > 0 && !loading && (
              <SearchKeywords
                tags={filteredTags}
                handleClick={handleTagClick}
              />
            )}
          </div>

          <div>
            {!query.length && aiSummary && aiSummary.length && (
              <AiSummary summary={aiSummary} handleClose={handleClose} />
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 mt-10">
            {blogs &&
              !query.length &&
              blogs.map((blog) => <SearchCard blog={blog} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
