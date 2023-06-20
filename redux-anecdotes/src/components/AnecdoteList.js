import { useSelector, useDispatch } from "react-redux";
import { saveVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const newAnecdote = [...anecdotes];
    return newAnecdote
      .sort((a, b) => {
        return b.votes - a.votes;
      })
      .filter(({ content }) => {
        return content.includes(filter);
      });
  });

  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(saveVote(anecdote));
    dispatch(setNotification(`You voted for "${anecdote.content}"`, 10));
  };

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
                handleVote(anecdote);
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
