let lightTheme = {
  theme: {
    name: "light",
    background: "rgba(222, 178, 80, 0.92)",
    mate: "rgba(136, 135, 32, 0.93)",
    mateText: "purple"
  }
};
let darkTheme = {
  theme: {
    name: "dark",
    background: "rgb(108, 78, 0)",
    mate: "rgba(70, 70, 10, 0.93)",
    mateText: "rgb(91, 6, 54)"
  }
};
export const settingsAndDisplayReducer = (state = lightTheme, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      console.log(action);
      let newTheme =
        action.theme == "light"
          ? darkTheme
          : action.theme == "dark"
          ? lightTheme
          : state.theme;
      return newTheme;
      break;
    default:
      return state;
  }
};
