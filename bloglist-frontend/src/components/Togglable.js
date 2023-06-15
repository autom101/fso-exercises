import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>

      <div style={hideWhenVisible}>
        <button id={props.buttonName} onClick={toggleVisible}>
          {props.buttonName}
        </button>
      </div>
    </>
  );
};

export default Togglable;
