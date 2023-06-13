import { useState, useEffect } from "react";
//services:
import blogService from "./services/blogs";
import loginService from "./services/login";
//components:
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import NewBlog from "./components/NewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [hideLogin, setHideLogin] = useState("");
  //User states:
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //New blog states:
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchData() {
      await blogService.getAll().then((blogs) => setBlogs(blogs));
    }
    fetchData();
  }, []);

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

  const createBlog = async (event) => {
    event.preventDefault();
    let notification = "";
    let isError = false;
    try {
      const blog = { author: author, title: title, url: url };
      console.log("Blog to be sent: ", blog);
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);

      setAuthor("");
      setTitle("");
      setUrl("");
      event.target.reset();
      notification = `Successfully created new blog ${newBlog.title}`;
    } catch (error) {
      notification = error.message;
      isError = true;
      console.log(error);
    } finally {
      showNotification(notification, isError);
    }
  };

  const showLogin = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        setPassword={setPassword}
        setUsername={setUsername}
      />
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
        <BlogList blogs={blogs} />
        <NewBlog
          setAuthor={setAuthor}
          setTitle={setTitle}
          setUrl={setUrl}
          createBlog={createBlog}
        />
      </section>
    );
  };

  return (
    <div>
      <Notification message={notiMessage} errorClass={errorClass} />
      {!user && showLogin()}
      {user && showBlogs()}
    </div>
  );
};

export default App;
