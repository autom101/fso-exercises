const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return (
    <>
      <h2>Login to the Application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        ></input>
        <br></br>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
