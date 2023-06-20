import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addMessage(state, action) {
      const newMessage = action.payload;
      return newMessage;
    },
    removeMessage(state, action) {
      return "";
    },
  },
});

export const { addMessage, removeMessage } = notificationSlice.actions;

export const setNotification = (message, time = 5) => {
  return async (dispatch) => {
    dispatch(addMessage(message));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 1000 * time);
  };
};

export default notificationSlice.reducer;
