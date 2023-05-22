import "./App.css";
import axios from "axios";
import { useReducer, useEffect } from "react";
import Loading from "./components/loading";

const initialState = {
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

const reducer = (state, action) => {
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleData = (callBack) => {
    dispatch({ type: "updateLoading", loadingValue: true });
    axios
      .get("/data.json")
      .then((response) =>
        dispatch({
          type: "updateData",
          dataValue: callBack ? response.data.filter(callBack) : response.data,
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "updateError",
          errorValue:
            "Error Loading Page, Please check your internet connection",
        });
      })
      .finally(() => dispatch({ type: "updateLoading", loadingValue: false }));
  };

  const handleSearch = (e) => {
    dispatch({ type: "changedSearchInput", value: e.target.value });

    if (state.region !== "All Countries") {
      handleData((item) => {
        return (
          item.region === state.region && item.name.includes(e.target.value)
        );
      });
    } else {
      handleData((item) => {
        return item.name.includes(e.target.value);
      });
    }
  };

  const handleRegion = (e) => {
    dispatch({ type: "changedRegion", value: e.target.value });
    e.target.value !== "All Countries"
      ? handleData((item) => {
          return item.region === e.target.value;
        })
      : handleData();
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <main className="App">
      <header
        style={{
          backgroundColor: `${
            state.bodyColor === "hsl(0, 0%, 98%)"
              ? state.headerBackground
              : "hsl(207, 26%, 17%)"
          }`,
        }}
      >
        <h1
          style={{
            color: `${
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.textTheme
                : "hsl(0, 0%, 98%)"
            }`,
          }}
          className="title"
        >
          Where in the world?
        </h1>
        <p
          style={{
            color: `${
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.textTheme
                : "hsl(0, 0%, 98%)"
            }`,
          }}
          className="dark_mode"
          onClick={() => dispatch({ type: "toggleBackground" })}
        >
          <i
            style={{
              color: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.textTheme
                  : "hsl(0, 0%, 98%)"
              }`,
            }}
            className={
              state.bodyColor === "hsl(0, 0%, 98%)"
                ? state.themeIcon
                : "fa-regular fa-sun"
            }
            id="moon"
          ></i>
          {state.bodyColor === "hsl(0, 0%, 98%)" ? "Dark" : "Light"}
          Mode
        </p>
      </header>

      <section
        style={{
          backgroundColor: state.bodyColor,
        }}
        className="first_section"
      >
        <div className="row">
          <div
            style={{
              backgroundColor: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.headerBackground
                  : "hsl(207, 26%, 17%)"
              }`,
            }}
            className="search_box"
          >
            <i
              style={{
                color: `${
                  state.bodyColor === "hsl(0, 0%, 98%)"
                    ? state.textTheme
                    : "hsl(0, 0%, 98%)"
                }`,
              }}
              className="fa-solid fa-magnifying-glass search_icon"
            ></i>
            <input
              style={{
                backgroundColor: `${
                  state.bodyColor === "hsl(0, 0%, 98%)"
                    ? state.headerBackground
                    : "hsl(207, 26%, 17%)"
                }`,
                color: `${
                  state.bodyColor === "hsl(0, 0%, 98%)"
                    ? state.textTheme
                    : "hsl(0, 0%, 98%)"
                }`,
              }}
              type="search"
              name="country"
              className="search_input"
              placeholder="Search for a Country..."
              value={state.search}
              onChange={handleSearch}
            />
          </div>
          <select
            aria-label="Region"
            style={{
              backgroundColor: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.headerBackground
                  : "hsl(207, 26%, 17%)"
              }`,
              color: `${
                state.bodyColor === "hsl(0, 0%, 98%)"
                  ? state.textTheme
                  : "hsl(0, 0%, 98%)"
              }`,
            }}
            value={state.region}
            name="region"
            className="select"
            onChange={handleRegion}
          >
            <option value="All Countries">All Countries</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        {state.loading && <Loading />}
        <div className="countries">
          {state.data &&
            state.data.map((value) => {
              return (
                <div
                  className="countries-section"
                  key={value.name}
                  style={{
                    backgroundColor: state.headerBackground,
                    color: state.textTheme,
                  }}
                >
                  <img
                    className="countries-images"
                    src={value.flags.png}
                    alt=""
                  />
                  <p className="country_name">{value.name}</p>
                  <p className="text">
                    Population:
                    <span>{value.population}</span>
                  </p>
                  <p className="text">
                    Region:
                    <span>{value.region}</span>
                  </p>
                  <p className="text">
                    Capital:
                    <span>{value.capital}</span>
                  </p>
                </div>
              );
            })}
        </div>
        {state.data && state.data.length === 0 && (
          <div className="feedBack">
            <p
              style={{
                color: `${
                  state.bodyColor === "hsl(0, 0%, 98%)"
                    ? state.textTheme
                    : "hsl(0, 0%, 98%)"
                }`,
              }}
            >
              No Country Found
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
