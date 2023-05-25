export const initialState = {
  region: "All Countries",
  search: "",
  themeIcon: "fa-regular fa-moon",
  bodyColor: "hsl(0, 0%, 98%)",
  headerBackground: "hsl(0, 0%, 100%)",
  loading: false,
  data: null,
  error: null,
  textTheme: "hsl(207, 26%, 17%)",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "changedSearchInput":
      return {
        ...state,
        search: action.value,
      };
    case "changedRegion":
      return {
        ...state,
        region: action.value,
      };
    case "updateData":
      return { ...state, data: action.dataValue };
    case "updateLoading":
      return { ...state, loading: action.loadingValue };
    case "updateError":
      return { ...state, error: action.errorValue };
    case "toggleBackground":
      return {
        ...state,
        bodyColor: `${
          state.bodyColor === "hsl(0, 0%, 98%)"
            ? "hsl(209, 23%, 22%)"
            : "hsl(0, 0%, 98%)"
        }`,
      };
  }
};
