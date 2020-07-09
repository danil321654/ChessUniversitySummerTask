let initialState = {
  themeColor: "rgba(222, 178, 80, 0.92)"
};

export const settingsAndDisplayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return state;
      break;
    default:
      return state;
  }
};
