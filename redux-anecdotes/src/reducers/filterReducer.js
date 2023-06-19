function filterReducer(state = "", action) {
  switch (action.type) {
    case "ADD_FILTER": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export function changeFilter(filter) {
  return {
    type: "ADD_FILTER",
    payload: filter,
  };
}

export default filterReducer;
