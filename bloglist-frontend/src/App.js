import { useState, useEffect } from "react";
//services:
import blogService from "./services/blogs";
import loginService from "./services/login";
//components:
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");
  //User states:
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, isError) => {
    console.log("Message: ", message);
    console.log("Error: ", isError);
    if (isError) {
      setErrorClass("error-notification");
      setNotiMessage(message + "!");
      setTimeout(() => {
        setNotiMessage(null);
        setErrorClass("");
      }, 3000);
    } else {
      setErrorClass("success-notification");
      setNotiMessage(message + "!");
      setTimeout(() => {
        setNotiMessage(null);
      }, 3000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let isError = false;
    let notification = "";
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      notification = `Successfully logged in. Welcome ${user.name}`;
      isError = false;
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      notification = "Incorrect credentials";
      isError = true;
    } finally {
      showNotification(notification, isError);
    }
  };

  const createBlog = async (blog) => {
    let notification = "";
    let isError = false;
    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);
      notification = `Successfully created new blog ${newBlog.title}`;
    } catch (error) {
      notification = error.message;
      isError = true;
      console.log(error);
    } finally {
      showNotification(notification, isError);
    }
  };

  const modifyBlog = async (blogObj) => {
    let notification = "";
    let isError = false;

    try {
      const index = blogs.findIndex((blog) => blog.id === blogObj.id);
      const newBlog = await blogService.modify(blogObj);
      const newBlogList = [...blogs];
      newBlogList[index] = newBlog;
      setBlogs(newBlogList);
      notification = `Successfully modified blog ${blogObj.title}`;
    } catch (error) {
      notification = error.message;
      isError = true;
      console.log(error);
    } finally {
      showNotification(notification, isError);
    }
  };

  const removeBlog = async (blogObj) => {
    let notification = "";
    let isError = false;

    if (
      window.confirm(
        `Are you sure you want to remove ${blogObj.title} by ${blogObj.author}?`
      )
    ) {
      try {
        const index = blogs.findIndex((blog) => blog.id === blogObj.id);
        await blogService.remove(blogObj);
        const newBlogList = [...blogs];
        newBlogList.splice(index, 1);
        setBlogs(newBlogList);
        notification = `Successfully deleted blog ${blogObj.title}`;
      } catch (error) {
        notification = error.message;
        isError = true;
        console.log(error);
      } finally {
        showNotification(notification, isError);
      }
    }
  };

  const showLogin = () => {
    return (
      <Togglable buttonName={"Login"}>
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </Togglable>
    );
  };

  const showBlogs = () => {
    return user === null ? null : (
      <section className="blogs">
        <em>
          Logged in as <b>{user.name}</b>
          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
            }}
          >
            Logout
          </button>
        </em>
        <h2>Blogs</h2>
        <BlogList
          blogs={blogs}
          removeBlog={removeBlog}
          modifyLikes={modifyBlog}
        />
        <Togglable buttonName={"Create New Blog"}>
          <NewBlog addBlog={createBlog} />
        </Togglable>
      </section>
    );
  };

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={notiMessage} errorClass={errorClass} />
      {!user && showLogin()}
      {user && showBlogs()}
    </div>
  );
};

export default App;
