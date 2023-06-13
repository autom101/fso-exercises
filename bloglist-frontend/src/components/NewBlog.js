const NewBlog = ({ createBlog, setTitle, setAuthor, setUrl }) => {
  return (
    <section>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          <label forid="blog-title">Title: </label>
          <input
            id="blog-title"
            type="text"
            name="title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          ></input>
        </div>

        <div>
          <label forid="blog-author">Author: </label>
          <input
            id="blog-author"
            type="text"
            name="author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          ></input>
        </div>

        <div>
          <label forid="blog-url">Url: </label>
          <input
            id="blog-url"
            type="text"
            name="url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          ></input>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default NewBlog;