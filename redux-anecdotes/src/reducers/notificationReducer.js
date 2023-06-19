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

export default notificationSlice.reducer;
