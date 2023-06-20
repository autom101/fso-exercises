import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    console.log("new anecdote: ", content);
    dispatch(createNewAnecdote(content));
    event.target.reset();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input name="content"></input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
