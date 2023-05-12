import Header from "./Header";
import Content from "./Content.js";
import Total from "./Total.js";

const Course = ({ course }) => {
  const parts = course.parts;
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total
        sum={parts.reduce((previous, current) => {
          return previous + current.exercises;
        }, 0)}
      />
    </div>
  );
};

export default Course;
