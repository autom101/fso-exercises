import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote.js";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const newAnecdote = action.payload;
      console.log("In here as: ", newAnecdote);
      return [...state, newAnecdote];
    },
    vote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const newState = state.map((anecdote) =>
        anecdote === anecdoteToChange
          ? {
              ...anecdote,
              votes: anecdote.votes + 1,
            }
          : anecdote
      );
      return newState;
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
