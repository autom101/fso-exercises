import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    console.log("new anecdote: ", content);
    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={(e) => createNewAnecdote(e)}>
      <div>
        <input name="content"></input>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
