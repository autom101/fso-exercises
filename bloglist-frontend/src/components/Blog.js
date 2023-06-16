import { useState } from "react";

const Blog = ({ blog, currentUser, modifyLikes, remove }) => {
  const [showAll, setShowAll] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes);

  const toggleVisibility = () => {
    setShowAll(!showAll);
  };

  const changeLikes = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    blog.likes = newCount;
    modifyLikes(blog);
  };

  const deleteSelf = () => {
    remove(blog);
  };

  const infoShown = () => {
    if (!showAll) {
      return (
        <>
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility}>Expand</button>
        </>
      );
    } else {
      const showDeleteButton = () => {
        if (blog.user.name === currentUser.name) {
          return <button onClick={deleteSelf}>Delete</button>;
        } else {
          return null;
        }
      };
      return (
        <>
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility}>Collapse</button>
          <p> {blog.url}</p>
          <p>
            {" "}
            likes: {likeCount}{" "}
            <button className="like-button" onClick={changeLikes}>
              like
            </button>
          </p>
          <p> {blog.user.name}</p>
          {showDeleteButton()}
        </>
      );
    }
  };

  return <div className="individual-blog">{infoShown()}</div>;
};

export default Blog;
