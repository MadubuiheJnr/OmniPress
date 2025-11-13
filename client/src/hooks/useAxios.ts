import { useEffect, useState } from "react";
import Axios from "../config/axiosConfig";
import type { BlogResponse } from "../types/blogTypes";

interface useFetchTypes {
  url: string;
  options?:
    | {
        method?: string;
        headers?: {
          [key: string]: string;
        };
        data?: {
          [key: string]: string;
        };
      }
    | Record<string, string>;
}

const useAxios = ({ url, options }: useFetchTypes) => {
  const [data, setData] = useState<BlogResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await Axios(`${url}`, {
        ...options,
      });
      setData(res.data);
    } catch (error) {
      setErrMsg(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, errMsg, isLoading, reFetch: fetchData };
};

export default useAxios;
