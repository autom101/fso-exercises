import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Unicafe = () => {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);

  const buttonInfo = {
    goodButton: {
      text: "Good",
      handleClick: () => {
        const updatedGood = goodFeedback + 1;
        setGoodFeedback(updatedGood);
      },
    },
    badButton: {
      text: "Bad",
      handleClick: () => {
        const updatedBad = badFeedback + 1;
        setBadFeedback(updatedBad);
      },
    },
    neutralButton: {
      text: "Neutral",
      handleClick: () => {
        const updatedNeutral = neutralFeedback + 1;
        setNeutralFeedback(updatedNeutral);
      },
    },
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button
        text={buttonInfo.goodButton.text}
        handleClick={buttonInfo.goodButton.handleClick}
      />
      <Button
        text={buttonInfo.neutralButton.text}
        handleClick={buttonInfo.neutralButton.handleClick}
      />
      <Button
        text={buttonInfo.badButton.text}
        handleClick={buttonInfo.badButton.handleClick}
      />
      <h2>Statistics</h2>
      <p>Good: {goodFeedback}</p>
      <p>Neutral: {neutralFeedback}</p>
      <p>Bad: {badFeedback}</p>
    </div>
  );
};

export default Unicafe;
