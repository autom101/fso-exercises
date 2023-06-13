import { useState, forwardRef, useImperativeHandle } from "react";

const Blog = forwardRef(({ blog, modifyLikes }, refs) => {
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

  useImperativeHandle(refs, changeLikes);

  const infoShown = () => {
    if (!showAll) {
      return (
        <>
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility}>Expand</button>
        </>
      );
    } else {
      return (
        <>
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility}>Collapse</button>
          <p> {blog.url}</p>
          <p>
            {" "}
            likes: {likeCount} <button onClick={changeLikes}>like</button>
          </p>
          <p> {blog.user.name}</p>
        </>
      );
    }
  };

  return <div className="individual-blog">{infoShown()}</div>;
});

export default Blog;
