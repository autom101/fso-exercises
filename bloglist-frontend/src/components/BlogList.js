import Blog from "./Blog";

const BlogList = ({ blogs, modifyLikes }) => {
  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };
  console.log("Blogs before: ", blogs);
  blogs.sort(sortByLikes);
  console.log("Blogs after: ", blogs);

  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog key={blog.id} blog={blog} modifyLikes={modifyLikes} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
