import { useSelector, useDispatch } from "react-redux";
import { saveVote } from "../reducers/anecdoteReducer";
import { addMessage, removeMessage } from "../reducers/notificationReducer";

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
    dispatch(addMessage(`You voted for "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(removeMessage());
      console.log("Has been 5 seconds now");
    }, 5000);
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
