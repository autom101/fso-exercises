const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      const prevGood = state.good;
      return { ...state, good: prevGood + 1 };
    case "OK":
      const prevOk = state.ok;
      return { ...state, ok: prevOk + 1 };
    case "BAD":
      const prevBad = state.bad;
      return { ...state, bad: prevBad + 1 };
    case "ZERO":
      return { good: 0, ok: 0, bad: 0 };
    default:
      return state;
  }
};

export default counterReducer;
