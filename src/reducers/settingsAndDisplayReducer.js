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
export const settingsAndDisplayReducer = (
  state = localStorage.getItem("SettingsState")
    ? JSON.parse(localStorage.getItem("SettingsState"))
    : lightTheme,
  action
) => {
  switch (action.type) {
    case "CHANGE_THEME":
      let newTheme =
        action.theme == "light"
          ? darkTheme
          : action.theme == "dark"
          ? lightTheme
          : state.theme;
      newTheme = {...state, ...newTheme};
      localStorage.setItem("SettingsState", JSON.stringify(newTheme));
      return newTheme;
      break;

    case "SAVE_GAME":
      let save = JSON.parse(localStorage.getItem("state"));
      localStorage.setItem("customSave", JSON.stringify(save));
      let savedState = {...state, saved: true};
      localStorage.setItem("SettingsState", JSON.stringify(savedState));
      return savedState;
      break;

    case "DELETE_SAVE":
      localStorage.removeItem("customSave");
      let unsavedState = {...state, saved: false};
      localStorage.setItem("SettingsState", JSON.stringify(unsavedState));
      return unsavedState;
      break;

    default:
      return state;
  }
};
