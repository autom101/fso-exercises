import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => {
      return b.votes - a.votes;
    })
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("In vote, the id is: ", id);
    return { type: "VOTE", payload: { id: id } };
  };

  const addAnecdote = (content) => {
    const newAnecdote = {
      content: content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0,
    };
    return { type: "NEW_ANECDOTE", payload: newAnecdote };
  };

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
      <form onSubmit={(e) => createNewAnecdote(e)}>
        <div>
          <input name="content"></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
