import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Statistics = ({ statistics }) => {
  const {
    statGood,
    statNeutral,
    statBad,
    statAverage,
    statTotal,
    getPositive,
  } = statistics;
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {statGood}</p>
      <p>Neutral: {statNeutral}</p>
      <p>Bad: {statBad}</p>

      <p>
        <b>Total Reviews: </b>
        {statTotal}
      </p>
      <p>
        <b>Current Average: </b>
        {statAverage.toFixed(2)}
      </p>
      <p>
        <b>Current Positive: </b>
        {getPositive().toFixed(2)}%
      </p>
    </div>
  );
};

const Unicafe = () => {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);
  const [total, setTotal] = useState(0);

  const [average, setAverage] = useState(0);

  const statisticsInfo = {
    statGood: goodFeedback,
    statNeutral: neutralFeedback,
    statBad: badFeedback,
    statTotal: total,
    statAverage: average,
    getPositive: () => {
      const positive = statisticsInfo.statGood / statisticsInfo.statTotal || 0;
      return positive * 100;
    },
  };

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
      <Statistics statistics={statisticsInfo} />
    </div>
  );
};

export default Unicafe;
