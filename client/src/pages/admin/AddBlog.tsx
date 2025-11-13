import AddBlogForm from "../../components/admin/AddBlog/AddBlogForm";

const AddBlog = () => {
  return (
    <div className="p-5 w-full">
      <p className="text-lg font-semibold text-zinc-800">Add a new Blog post</p>
      <p className="mt-1 text-base font-light text-zinc-800">
        Share your latest ideas, insights, or stories with the world.
      </p>
      <AddBlogForm />
    </div>
  );
};

export default AddBlog;
