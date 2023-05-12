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
  const [total, setTotal] = useState(0);

  const [average, setAverage] = useState(0);

  const buttonInfo = {
    goodButton: {
      text: "Good",
      handleClick: () => {
        const updatedGood = goodFeedback + 1;
        const updatedTotal = total + 1;
        const updatedAverage = (updatedGood - badFeedback) / updatedTotal;

        setGoodFeedback(updatedGood);
        setTotal(updatedTotal);
        setAverage(updatedAverage);
      },
    },
    badButton: {
      text: "Bad",
      handleClick: () => {
        const updatedBad = badFeedback + 1;
        const updatedTotal = total + 1;
        const updatedAverage = (goodFeedback - updatedBad) / updatedTotal;

        setBadFeedback(updatedBad);
        setTotal(updatedTotal);
        setAverage(updatedAverage);
      },
    },
    neutralButton: {
      text: "Neutral",
      handleClick: () => {
        const updatedNeutral = neutralFeedback + 1;
        const updatedTotal = total + 1;
        const updatedAverage = (goodFeedback - badFeedback) / updatedTotal;

        setNeutralFeedback(updatedNeutral);
        setTotal(updatedTotal);
        setAverage(updatedAverage);
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

      <p>
        <b>Total Reviews: </b>
        {total}
      </p>
      <p>
        <b>Current Average: </b>
        {average.toFixed(2)}
      </p>
      <p>
        <b>Current Positive: </b>
        {(goodFeedback / total).toFixed(4) * 100}%
      </p>
    </div>
  );
};

export default Unicafe;
