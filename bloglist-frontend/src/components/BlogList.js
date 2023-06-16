import Blog from "./Blog";

const BlogList = ({ blogs, modifyLikes, removeBlog, currentUser }) => {
  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };
  blogs.sort(sortByLikes);
  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog
              currentUser={currentUser}
              key={blog.id}
              blog={blog}
              remove={removeBlog}
              modifyLikes={modifyLikes}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
