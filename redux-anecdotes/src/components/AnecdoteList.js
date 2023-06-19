import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .sort((a, b) => {
        return b.votes - a.votes;
      })
      .filter(({ content }) => {
        return content.includes(filter);
      });
  });

  const dispatch = useDispatch();
  return (
    <div>
      <h2>create new</h2>
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
    </div>
  );
};

export default AnecdoteList;
