import { useEffect, useState } from "react";

import type { BlogType } from "../../../../types/blogTypes";
import Axios from "../../../../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

const FeaturedBlogChart = () => {
  const [blogsData, setBlogsData] = useState<BlogType[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await Axios("/api/blogs/admin");
      setBlogsData(res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;

      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const featuredCount = blogsData.filter((data) => data.isFeatured).length;
  const unFeaturedCount = blogsData.filter((data) => !data.isFeatured).length;

  const publicationData = [
    {
      name: "Featured",
      value: featuredCount,
      color: "#10b981",
    },
    {
      name: "UnFeatured",
      value: unFeaturedCount,
      color: "#f87171",
    },
  ];

  if (!blogsData.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="w-full  bg-white p-3 rounded-b-xl drop-shadow-sm transition-all ease-in-out duration-300">
      <div>
        <p className="text-neutral-800 text-lg font-semibold">
          Featured Insights
        </p>
        <p className="text-sm text-neutral-800">
          Breakdown of featured and regular blogs
        </p>
      </div>

      <div className="h-48 transition-all ease-in-out duration-300">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={publicationData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              isAnimationActive={true}
            >
              {publicationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {publicationData.map((item, index) => (
          <div
            className="flex items-center justify-between break-keep"
            key={index}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.name}
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-zinc-50">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogChart;
