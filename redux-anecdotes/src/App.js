import { useSelector, useDispatch } from "react-redux";
import { vote, addAnecdote } from "./reducers/anecdoteReducer";

import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => {
      return b.votes - a.votes;
    })
  );
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    console.log("new anecdote: ", content);
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote.id));
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
