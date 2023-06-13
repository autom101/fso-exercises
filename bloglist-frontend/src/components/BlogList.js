import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
