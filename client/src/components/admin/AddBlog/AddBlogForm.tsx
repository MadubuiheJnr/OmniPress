import {
  ChevronDown,
  ChevronUp,
  Globe,
  Sparkles,
  Star,
  ToggleLeft,
  ToggleRight,
  UploadCloud,
  X,
} from "lucide-react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { categoryData } from "./categoryData";
import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import toast from "react-hot-toast";
import Axios from "../../../config/axiosConfig";
import type { AxiosError } from "axios";

const AddBlogForm = () => {
  const error = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [contentValue, setContentValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");
  const [readingTime, setReadingTime] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const handleSelect = (option: string) => {
    setSelectedCategory(option);
    setOpen(false);
  };

  useEffect(() => {
    // initiate quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }

    quillRef.current?.on("text-change", () => {
      if (quillRef.current) {
        setContentValue(quillRef.current.root.innerHTML ?? "");
      } // Get HTML of editor
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagValue.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setTagValue("");
    }
  };

  const removeTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
  };

  const getAiTitle = async () => {
    try {
      const res = await Axios.post("/api/ai/generate/title", {
        prompt: selectedCategory,
      });

      if (res.status === 200) return setTitle(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    }
  };

  const getAiContent = async () => {
    try {
      const res = await Axios.post("/api/ai/generate/content", {
        prompt: title,
      });

      if (res.status === 200 && quillRef.current) {
        quillRef.current.root.innerHTML = res.data;
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    }
  };

  const getAiTags = async () => {
    try {
      const res = await Axios.post("/api/ai/generate/tags", {
        prompt: contentValue,
      });

      if (res.status === 200) {
        const aiContent = res.data; // e.g. "tag1, tag2, tag3"
        const tagArray = aiContent
          .split(",") // split by comma
          .map((tag: string) => tag.trim()) // remove extra spaces
          .filter((tag: string) => tag); // remove empty strings

        setTags(tagArray);
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError<{ message?: string }>;

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    }
  };

  const getAiReadTime = async () => {
    try {
      const res = await Axios.post("/api/ai/generate/readtime", {
        prompt: contentValue,
      });

      if (res.status === 200) return setReadingTime(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    }
  };

  const getAiSentiment = async () => {
    console.log(contentValue);

    try {
      const res = await Axios.post("/api/ai/generate/sentiment", {
        prompt: contentValue,
      });

      if (res.status === 200) return setSentiment(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(backendMessage);
    }
  };

  if (error) return toast.error(error);

  return (
    <Form method="POST" encType="multipart/form-data" className="mt-5 w-full">
      <label
        htmlFor="imageInput"
        className={` bg-gray-100 rounded-lg w-80 h-40 flex flex-col justify-center ${
          !image && "border-2 border-dotted border-gray-400"
        }`}
      >
        <img
          src={image ? URL.createObjectURL(image) : ""}
          alt=""
          className={`w-80 h-40  rounded-lg ${
            !image ? "hidden" : "inline-block"
          }`}
        />
        {!image && (
          <p className="text-center">
            <UploadCloud className="inline text-zinc-600" />
            <span className="ml-2 text-xs text-zinc-500 font-bold">
              Click to upload an image
            </span>
          </p>
        )}
        <input
          name="image"
          type="file"
          hidden
          id="imageInput"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
      </label>

      {/* Select category */}
      <label className="block mt-5">
        <p
          onClick={() => setOpen(!open)}
          className="w-60 p-3 border border-gray-300 rounded-xl flex items-center justify-between text-zinc-600 text-base"
        >
          {selectedCategory || "Select a category"}

          <span className="transition-all">
            {open ? (
              <ChevronUp className="inline text-zinc-500" />
            ) : (
              <ChevronDown className="inline text-zinc-500" />
            )}
          </span>
        </p>

        {open && (
          <ul className="p-3 flex flex-col gap-y-2 bg-gray-200/30 mt-2 rounded-xl w-60 text-zinc-600 text-sm">
            {categoryData.map((data) => (
              <li key={data} onClick={() => handleSelect(data)}>
                {data}
              </li>
            ))}
          </ul>
        )}
        <input type="hidden" name="category" value={selectedCategory} />
      </label>

      {/* Title */}
      <label className="w-full border border-gray-300 rounded-2xl flex items-end p-3 mt-5 relative">
        <span className="text-zinc-600 text-base absolute left-5 -top-2.5 bg-white px-1.5">
          Title
        </span>
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a headline that grabs attention..."
          className="w-90 min-h-25 text-sm text-zinc-600 outline-0 p-2 rounded-lg flex-1 resize-none"
        />
        <span
          onClick={getAiTitle}
          className={`text-xs font-bold text-zinc-50 px-2 py-1 rounded-full tracking-wider bg-black cursor-pointer group transition-all duration-300 ease-in-out`}
        >
          AI <span className="hidden group-hover:inline">Assist</span>{" "}
          <Sparkles className="inline" size={15} />
        </span>
      </label>

      {/* Content */}
      <div className="w-full border border-gray-400 rounded-2xl flex flex-col gap-y-5 p-3 mt-5 min-h-40 text-sm  text-zinc-600 relative">
        <span className="text-zinc-600 text-base absolute left-5 -top-2.5 bg-white px-1.5 ">
          Content
        </span>
        <div ref={editorRef}></div>

        {contentValue.length < 10 && (
          <span
            onClick={getAiContent}
            className={`self-end text-xs font-bold text-zinc-50 px-2 py-1 rounded-full tracking-wider bg-black cursor-pointer`}
          >
            AI Assist <Sparkles className="inline" size={15} />
          </span>
        )}
        <input name="content" type="hidden" value={contentValue} hidden />
      </div>

      {/* TAGS Input */}
      <div
        className={`w-full border border-gray-300 rounded-2xl flex flex-col gap-3 p-3 mt-5  text-sm  text-zinc-600 relative ${
          tags.length >= 3 ? "pb-5" : "pb-10"
        }`}
      >
        <span className="text-zinc-600 text-base absolute left-5 -top-3.5 bg-white px-1.5">
          Tags
        </span>

        <div className="flex flex-wrap items-center gap-2 cursor-pointer">
          {tags.map((tag) => (
            <p
              key={tag}
              className=" inline-flex items-center gap-x-5 py-1 pl-3 pr-2 rounded-lg bg-gray-200 text-zinc-700"
            >
              <span className="text-base capitalize">{tag}</span>
              <X
                onClick={() => removeTag(tag)}
                className="inline text-gray-600 hover:text-gray-950"
                size={20}
              />
            </p>
          ))}

          <input
            type="text"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="5 tags is required"
            className={`min-w-20 outline-0 ${
              tags.length === 5 ? "hidden" : "inline-block"
            }`}
          />
        </div>

        <span
          onClick={getAiTags}
          className={`text-xs font-bold text-zinc-50 px-2 py-1 rounded-full tracking-wider bg-black absolute bottom-3 right-3 cursor-pointer ${
            tags.length >= 3 || tags.length === 5 ? "hidden" : "inline-block"
          }`}
        >
          AI Assist <Sparkles className="inline" size={15} />
        </span>

        <input type="text" name="tags" value={JSON.stringify(tags)} hidden />
      </div>

      {/* Reading time */}
      <label className="w-50 border border-gray-300 rounded-xl flex flex-col p-3 mt-5 relative">
        <span className="text-zinc-600 text-base absolute left-5 -top-2.5 bg-white px-1.5">
          Read Time
        </span>
        <input
          name="readingTime"
          value={readingTime}
          onChange={(e) => setReadingTime(e.target.value)}
          className="w-full text-sm text-zinc-600 outline-0 focus:bg-transparent focus:shadow-none focus:[-webkit-box-shadow:none!]"
        />
        <span
          onClick={getAiReadTime}
          className={`self-end-safe text-xs font-bold text-zinc-50 px-2 py-1 rounded-full tracking-wider bg-black cursor-pointer`}
        >
          Ask AI <Sparkles className="inline" size={15} />
        </span>
      </label>

      {/* sentiment */}
      <label className="w-50 border border-gray-300 rounded-xl flex flex-col p-3 mt-5 relative">
        <span className="text-zinc-600 text-base absolute left-5 -top-2.5 bg-white px-1.5">
          Sentiment
        </span>
        <input
          name="sentiment"
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
          className="w-full text-sm text-zinc-600 outline-0 focus:bg-transparent focus:shadow-none focus:[-webkit-box-shadow:none!]"
        />
        <span
          onClick={getAiSentiment}
          className={`self-end-safe text-xs font-bold text-zinc-50 px-2 py-1 rounded-full tracking-wider bg-black cursor-pointer`}
        >
          Ask AI <Sparkles className="inline" size={15} />
        </span>
      </label>

      {/* Author's details inputs */}
      <div className="mt-10 text-base font-semibold text-zinc-700">
        <p>Author Details</p>
        <label className="relative mt-5 inline-block">
          <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
            Author's name
          </span>
          <input
            name="name"
            className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
          />
        </label>

        <div className="mt-4">
          <p className="text-zinc-700 font-medium text-sm">Social Links</p>

          <label className="relative mt-5 inline-block">
            <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
              Medium Link
            </span>
            <input
              name="medium"
              className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
            />
          </label>
          <label className="relative mt-5 inline-block">
            <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
              {`X (Twitter)`}
            </span>
            <input
              name="x"
              className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
            />
          </label>
          <label className="relative mt-5 inline-block">
            <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
              Facebook
            </span>
            <input
              name="fb"
              className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
            />
          </label>
          <label className="relative mt-5 inline-block">
            <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
              Instagram
            </span>
            <input
              name="ig"
              className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
            />
          </label>
          <label className="relative mt-5 inline-block">
            <span className="text-zinc-600 text-sm font-normal absolute left-5 -top-2.5 bg-white px-1.5">
              Youtube
            </span>
            <input
              name="yt"
              className="w-87 text-sm text-zinc-600 outline-0 border border-gray-300 p-2 pt-3 rounded-lg"
            />
          </label>
        </div>
      </div>

      {/* Toggle buttons (Published & Featured) */}
      <div className="mt-10 flex flex-col gap-y-3">
        <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-100">
          <div className="flex items-center gap-x-2">
            <span className="bg-white inline-block p-3 rounded-lg drop-shadow-xl">
              <Globe className="text-zinc-700" size={25} />
            </span>
            <p className="flex flex-col justify-center">
              <span className="text-base font-bold text-zinc-700">Publish</span>
              <span className="text-xs text-zinc-700 font-normal tracking-wider">
                Your post will be live for all readers
              </span>
            </p>
          </div>
          <span onClick={() => setIsPublished(!isPublished)}>
            {isPublished ? (
              <ToggleRight size={30} className="inline text-zinc-800" />
            ) : (
              <ToggleLeft size={30} className="inline text-zinc-400" />
            )}
          </span>
          <input
            type="text"
            hidden
            name="isPublished"
            value={isPublished ? "true" : "false"}
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-100">
          <div className="flex items-center gap-x-2">
            <span className="bg-white inline-block p-3 rounded-lg drop-shadow-xl">
              <Star className="text-zinc-700" size={25} />
            </span>
            <p className="flex flex-col justify-center">
              <span className="text-base font-bold text-zinc-700">
                Featured
              </span>
              <span className="text-xs text-zinc-700 font-normal tracking-wider">
                Mark as featured to give it extra visibility.
              </span>
            </p>
          </div>
          <span onClick={() => setIsFeatured(!isFeatured)}>
            {isFeatured ? (
              <ToggleRight size={30} className="inline text-zinc-800" />
            ) : (
              <ToggleLeft size={30} className="inline text-zinc-400" />
            )}
          </span>

          <input
            type="text"
            hidden
            name="isFeatured"
            value={isFeatured ? "true" : "false"}
          />
        </label>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-xl bg-zinc-200 text-zinc-800 font-semibold text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={navigation.state === "loading"}
          className="px-5 py-2 rounded-xl bg-zinc-900 text-zinc-100 font-semibold text-base"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default AddBlogForm;
